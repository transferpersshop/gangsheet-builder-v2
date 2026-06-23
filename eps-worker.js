/* ================================================================
   eps-worker.js — Web Worker for EPS → PDF conversion
   Uses Ghostscript compiled to WebAssembly (@jspawn/ghostscript-wasm)
   Runs 100% client-side — no server, no upload, no external API.
   The 16 MB WASM binary is loaded once from CDN and cached by the browser.
   ================================================================ */
'use strict';

const GS_CDN = 'https://cdn.jsdelivr.net/npm/@jspawn/ghostscript-wasm@0.0.2/';
let _factory = null;   // Ghostscript module factory (loaded once)

/* ── Load the Emscripten-generated module factory ── */
function _loadFactory(){
  if(_factory) return;

  // Shim CommonJS exports so the Emscripten UMD wrapper attaches here
  if(typeof module === 'undefined') self.module = { exports:{} };
  if(typeof exports === 'undefined') self.exports = self.module.exports;

  importScripts(GS_CDN + 'gs.js');

  // Detect where the factory function ended up
  _factory = self.module.exports;
  if(typeof _factory !== 'function'){
    // Fallback: Emscripten sometimes sets a global with the project name
    const candidates = ['createGS','gs','Module','createModule'];
    for(const name of candidates){
      if(typeof self[name] === 'function'){ _factory = self[name]; break; }
    }
  }
  if(typeof _factory !== 'function'){
    throw new Error('EPS-conversie kon niet gestart worden');
  }
}

/* ── Convert EPS → PDF ── */
async function convertEpsToPdf(epsBytes){
  _loadFactory();

  // Fresh instance per conversion = clean virtual filesystem
  const M = await _factory({
    locateFile: function(path){ return GS_CDN + path; },
    print:    function(){},                         // suppress stdout
    printErr: function(t){ console.warn('[GS]',t); }
  });

  // Write EPS into Emscripten's in-memory filesystem
  M.FS.writeFile('/input.eps', epsBytes);

  // Run Ghostscript: interpret the EPS and write a PDF
  //   -dEPSCrop  = crop page to the EPS bounding box (no whitespace)
  //   -dSAFER    = sandbox file access
  const exit = await M.callMain([
    '-sDEVICE=pdfwrite',
    '-dNOPAUSE','-dBATCH','-dSAFER',
    '-dEPSCrop',
    '-sOutputFile=/output.pdf',
    '/input.eps'
  ]);
  if(exit !== 0) throw new Error('EPS-conversie mislukt (code '+exit+')');

  // Read the resulting PDF
  const pdf = M.FS.readFile('/output.pdf');

  // Cleanup (optional, instance is GC'd anyway)
  try{ M.FS.unlink('/input.eps');  }catch(_){}
  try{ M.FS.unlink('/output.pdf'); }catch(_){}

  return pdf;
}

/* ── Message handler ── */
self.onmessage = async function(e){
  var id = e.data.id;
  try{
    self.postMessage({ id:id, type:'status', msg:'EPS voorbereiden…' });
    var pdf = await convertEpsToPdf(new Uint8Array(e.data.epsData));
    // Transfer the ArrayBuffer for zero-copy performance
    self.postMessage({ id:id, type:'done', pdf:pdf.buffer }, [pdf.buffer]);
  }catch(err){
    self.postMessage({ id:id, type:'error', msg:err.message||'EPS conversie mislukt' });
  }
};
