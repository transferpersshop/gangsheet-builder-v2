/* ================================================================
   text-editor.js — Tekst-naar-SVG creator voor Gang Sheet Builder
   Gebruikt opentype.js om tekst om te zetten naar SVG-paden.
   Elke tekst wordt een apart SVG-object op het canvas.
   ================================================================ */
(function(){
'use strict';

/* ── State ── */
let _currentFont = null;       // opentype.Font instance
let _currentFontName = '';
let _loadedFonts = {};         // cache: name → Font
let _googleFontsLoaded = false;

/* ── Popular Google Fonts for DTF/sign work ── */
const GOOGLE_FONTS = [
  'Roboto','Open Sans','Montserrat','Oswald','Poppins',
  'Lato','Raleway','Bebas Neue','Anton','Archivo Black',
  'Permanent Marker','Bangers','Russo One','Teko','Barlow Condensed',
  'Righteous','Passion One','Black Ops One','Bungee','Orbitron',
  'Dancing Script','Pacifico','Lobster','Great Vibes','Sacramento'
];

/* ── Open / Close modal ── */
function open(){
  const modal = document.getElementById('textEditorModal');
  if(!modal) return;
  modal.classList.add('open');
  // Load Google Fonts list if not done
  if(!_googleFontsLoaded) _populateGoogleFonts();
  // Focus text input
  setTimeout(()=>{
    const inp = document.getElementById('teTextInput');
    if(inp) inp.focus();
  }, 100);
}

function close(){
  const modal = document.getElementById('textEditorModal');
  if(modal) modal.classList.remove('open');
}

/* ── Populate Google Fonts dropdown ── */
function _populateGoogleFonts(){
  _googleFontsLoaded = true;
  const sel = document.getElementById('teFontSelect');
  if(!sel) return;
  // Clear existing options except first (placeholder)
  while(sel.options.length > 1) sel.remove(1);
  // Add Google Fonts group
  const grp = document.createElement('optgroup');
  grp.label = 'Google Fonts';
  GOOGLE_FONTS.forEach(name => {
    const opt = document.createElement('option');
    opt.value = 'google:' + name;
    opt.textContent = name;
    grp.appendChild(opt);
  });
  sel.appendChild(grp);
}

/* ── Load a Google Font via opentype.js ── */
async function _loadGoogleFont(name){
  if(_loadedFonts[name]) return _loadedFonts[name];
  // Google Fonts CSS API — request woff2 (modern browsers) then fallback to ttf
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(name)}&display=swap`;
  // Fetch CSS to extract the actual font URL
  const css = await fetch(url).then(r => r.text());
  // Try woff2 first (returned for modern User-Agent), then any font URL
  let match = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/);
  if(!match) match = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/);
  if(!match) throw new Error('Font URL niet gevonden voor ' + name);
  const fontUrl = match[1];
  // Fetch font as ArrayBuffer and parse — more reliable than opentype.load with CORS
  const buf = await fetch(fontUrl).then(r => r.arrayBuffer());
  const font = opentype.parse(buf);
  _loadedFonts[name] = font;
  return font;
}

/* ── Load a custom font file ── */
async function _loadCustomFont(file){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const font = opentype.parse(ev.target.result);
        const name = font.names.fontFamily?.en || file.name.replace(/\.[^.]+$/, '');
        _loadedFonts[name] = font;
        resolve({ font, name });
      } catch(e){
        reject(new Error('Kan lettertype niet laden: ' + e.message));
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

/* ── Handle font selection change ── */
async function onFontChange(){
  const sel = document.getElementById('teFontSelect');
  const val = sel?.value;
  if(!val) return;
  const statusEl = document.getElementById('teFontStatus');
  try {
    if(statusEl) statusEl.textContent = 'Laden…';
    if(val.startsWith('google:')){
      const name = val.replace('google:', '');
      _currentFont = await _loadGoogleFont(name);
      _currentFontName = name;
    } else if(val.startsWith('custom:')){
      const name = val.replace('custom:', '');
      _currentFont = _loadedFonts[name];
      _currentFontName = name;
    }
    if(statusEl) statusEl.textContent = '';
    _updatePreview();
  } catch(e){
    console.error('[TextEditor] Font load error:', e);
    if(statusEl) statusEl.textContent = 'Fout: ' + e.message;
    _currentFont = null;
  }
}

/* ── Handle custom font upload ── */
async function onCustomFontUpload(){
  const inp = document.getElementById('teCustomFontInput');
  if(!inp?.files?.[0]) return;
  const file = inp.files[0];
  const statusEl = document.getElementById('teFontStatus');
  try {
    if(statusEl) statusEl.textContent = 'Laden…';
    const { font, name } = await _loadCustomFont(file);
    _currentFont = font;
    _currentFontName = name;
    // Add to dropdown
    const sel = document.getElementById('teFontSelect');
    if(sel){
      const opt = document.createElement('option');
      opt.value = 'custom:' + name;
      opt.textContent = '✦ ' + name;
      // Insert at top or in custom group
      let customGrp = sel.querySelector('optgroup[label="Eigen fonts"]');
      if(!customGrp){
        customGrp = document.createElement('optgroup');
        customGrp.label = 'Eigen fonts';
        sel.insertBefore(customGrp, sel.firstChild);
      }
      customGrp.appendChild(opt);
      sel.value = 'custom:' + name;
    }
    if(statusEl) statusEl.textContent = '';
    _updatePreview();
  } catch(e){
    console.error('[TextEditor] Custom font error:', e);
    if(statusEl) statusEl.textContent = e.message;
  }
  inp.value = '';
}

/* ── Handle CSV import ── */
function onCsvImport(){
  const inp = document.getElementById('teCsvInput');
  if(!inp?.files?.[0]) return;
  const file = inp.files[0];
  const reader = new FileReader();
  reader.onload = ev => {
    const text = ev.target.result;
    const lines = text.split(/[\r\n]+/).map(l => l.trim()).filter(Boolean);
    const textarea = document.getElementById('teTextInput');
    if(textarea){
      // Append to existing content
      const existing = textarea.value.trim();
      textarea.value = existing ? existing + '\n' + lines.join('\n') : lines.join('\n');
    }
    if(window.toast) window.toast(`${lines.length} namen geïmporteerd`, 'success');
  };
  reader.readAsText(file);
  inp.value = '';
}

/* ── Preview ── */
function _updatePreview(){
  const previewEl = document.getElementById('tePreview');
  if(!previewEl || !_currentFont) return;
  const textarea = document.getElementById('teTextInput');
  const text = (textarea?.value || '').split('\n')[0] || 'Voorbeeld';
  const sizeInput = document.getElementById('teSizeMm');
  const sizeMm = parseFloat(sizeInput?.value) || 30;
  try {
    // Render at a reasonable preview size
    const fontSize = 48; // px for preview
    const path = _currentFont.getPath(text, 0, fontSize, fontSize);
    const svgPath = path.toSVG();
    const bb = path.getBoundingBox();
    const w = bb.x2 - bb.x1;
    const h = bb.y2 - bb.y1;
    if(w > 0 && h > 0){
      previewEl.innerHTML = `<svg viewBox="${bb.x1-2} ${bb.y1-2} ${w+4} ${h+4}"
        style="max-width:100%;max-height:80px;display:block;margin:0 auto"
        xmlns="http://www.w3.org/2000/svg">${svgPath}</svg>`;
    } else {
      previewEl.innerHTML = '<span style="color:#9ca3af">Geen preview beschikbaar</span>';
    }
  } catch(e){
    previewEl.innerHTML = '<span style="color:#ef4444">Preview fout</span>';
  }
}

/* ── Generate SVG string from text ── */
function _textToSvg(text, font, heightMm){
  // We want the text to be exactly heightMm tall.
  // opentype.js uses font units; we calculate the right fontSize.
  const unitsPerEm = font.unitsPerEm || 1000;

  // First, render at unitsPerEm to measure actual height
  const testPath = font.getPath(text, 0, 0, unitsPerEm);
  const testBb = testPath.getBoundingBox();
  const testH = testBb.y2 - testBb.y1;
  if(testH <= 0) return null;

  // Scale fontSize so actual rendered height = target in mm
  // We'll use 1mm = 1 SVG user unit for physical sizing
  const fontSize = (heightMm / testH) * unitsPerEm;

  // Re-render at correct scale
  const path = font.getPath(text, 0, 0, fontSize);
  const bb = path.getBoundingBox();
  const w = bb.x2 - bb.x1;
  const h = bb.y2 - bb.y1;
  if(w <= 0 || h <= 0) return null;

  const svgPathData = path.toSVG();
  // Offset so the path starts at (0,0)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg"
    width="${w.toFixed(2)}mm" height="${h.toFixed(2)}mm"
    viewBox="${bb.x1.toFixed(2)} ${bb.y1.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)}">${svgPathData}</svg>`;

  return { svg, mmW: w, mmH: h };
}

/* ── Add texts to canvas ── */
function addTexts(){
  if(!_currentFont){
    if(window.toast) window.toast('Kies eerst een lettertype', 'warn');
    return;
  }
  const textarea = document.getElementById('teTextInput');
  const rawText = (textarea?.value || '').trim();
  if(!rawText){
    if(window.toast) window.toast('Voer tekst in', 'warn');
    return;
  }
  const sizeInput = document.getElementById('teSizeMm');
  const unitSel = document.getElementById('teSizeUnit');
  let sizeMm = parseFloat(sizeInput?.value) || 30;
  const unit = unitSel?.value || 'mm';
  if(unit === 'cm') sizeMm *= 10;

  // Split into lines — each line = one text object
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  if(lines.length === 0) return;

  let added = 0;
  lines.forEach(line => {
    const result = _textToSvg(line, _currentFont, sizeMm);
    if(!result) return;
    // Load as SVG into the canvas via the existing loadSvg function
    if(window.loadSvg){
      window.loadSvg(result.svg, line);
      added++;
    }
  });

  if(added > 0){
    if(window.toast) window.toast(`${added} tekst${added > 1 ? 'en' : ''} toegevoegd`, 'success');
    close();
  }
}

/* ── Expose API ── */
window.gsbTextEditor = {
  open, close,
  onFontChange,
  onCustomFontUpload,
  onCsvImport,
  addTexts,
  updatePreview: _updatePreview,
};

})();
