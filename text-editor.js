/* ================================================================
   text-editor.js — Tekst-naar-SVG creator voor Gang Sheet Builder
   Gebruikt opentype.js om tekst om te zetten naar SVG-paden.
   Elke tekst wordt een apart SVG-object op het canvas.
   v2.5.1 — fix Y-flip, WOFF2 error, font picker widget, kleurkeuze
   ================================================================ */
(function(){
'use strict';

/* ── Font database (Fontsource CDN ids) ── */
var FONTS = [
  // Sans-serif
  {n:'Roboto',id:'roboto'},
  {n:'Open Sans',id:'open-sans'},
  {n:'Montserrat',id:'montserrat'},
  {n:'Lato',id:'lato'},
  {n:'Poppins',id:'poppins'},
  {n:'Raleway',id:'raleway'},
  {n:'Inter',id:'inter'},
  {n:'Nunito',id:'nunito'},
  {n:'Barlow',id:'barlow'},
  {n:'Barlow Condensed',id:'barlow-condensed'},
  {n:'Oswald',id:'oswald'},
  {n:'Work Sans',id:'work-sans'},
  {n:'DM Sans',id:'dm-sans'},
  {n:'Quicksand',id:'quicksand'},
  {n:'Rubik',id:'rubik'},
  {n:'Fira Sans',id:'fira-sans'},
  {n:'Manrope',id:'manrope'},
  {n:'Source Sans 3',id:'source-sans-3'},
  // Display / impact
  {n:'Bebas Neue',id:'bebas-neue'},
  {n:'Anton',id:'anton'},
  {n:'Archivo Black',id:'archivo-black'},
  {n:'Russo One',id:'russo-one'},
  {n:'Teko',id:'teko'},
  {n:'Black Ops One',id:'black-ops-one'},
  {n:'Bungee',id:'bungee'},
  {n:'Orbitron',id:'orbitron'},
  {n:'Righteous',id:'righteous'},
  {n:'Passion One',id:'passion-one'},
  {n:'Permanent Marker',id:'permanent-marker'},
  {n:'Bangers',id:'bangers'},
  {n:'Alfa Slab One',id:'alfa-slab-one'},
  {n:'Fugaz One',id:'fugaz-one'},
  {n:'Abril Fatface',id:'abril-fatface'},
  {n:'Staatliches',id:'staatliches'},
  {n:'Ultra',id:'ultra'},
  {n:'Bowlby One SC',id:'bowlby-one-sc'},
  {n:'Bungee Shade',id:'bungee-shade'},
  // Serif
  {n:'Playfair Display',id:'playfair-display'},
  {n:'Merriweather',id:'merriweather'},
  {n:'Lora',id:'lora'},
  {n:'PT Serif',id:'pt-serif'},
  {n:'EB Garamond',id:'eb-garamond'},
  {n:'Libre Baskerville',id:'libre-baskerville'},
  {n:'Crimson Text',id:'crimson-text'},
  // Script / handwriting
  {n:'Dancing Script',id:'dancing-script'},
  {n:'Pacifico',id:'pacifico'},
  {n:'Lobster',id:'lobster'},
  {n:'Great Vibes',id:'great-vibes'},
  {n:'Sacramento',id:'sacramento'},
  {n:'Satisfy',id:'satisfy'},
  {n:'Caveat',id:'caveat'},
  {n:'Indie Flower',id:'indie-flower'},
  {n:'Shadows Into Light',id:'shadows-into-light'},
  {n:'Kalam',id:'kalam'},
  // Mono
  {n:'Roboto Mono',id:'roboto-mono'},
  {n:'Source Code Pro',id:'source-code-pro'},
];

var FONT_CDN = 'https://cdn.jsdelivr.net/fontsource/fonts/';

/* ── State ── */
var _currentFont  = null;   // opentype.Font instance
var _currentName  = '';
var _loadedFonts  = {};     // cache: name → Font
var _previewCssOk = false;

/* ════════════════ Modal open / close ════════════════ */
function open(){
  var m = document.getElementById('textEditorModal');
  if(!m) return;
  m.classList.add('open');
  if(!_previewCssOk) _loadPreviewCss();
  _renderFontList();
  setTimeout(function(){ var t = document.getElementById('teTextInput'); if(t) t.focus(); }, 120);
}
function close(){
  var m = document.getElementById('textEditorModal');
  if(m) m.classList.remove('open');
  _closePicker();
}

/* ════════════════ Google Fonts CSS for browser preview ════════════════ */
function _loadPreviewCss(){
  _previewCssOk = true;
  // batch families into link tags (max ~20 per tag to keep URL short)
  for(var i = 0; i < FONTS.length; i += 18){
    var batch = FONTS.slice(i, i + 18);
    var families = batch.map(function(f){ return 'family=' + encodeURIComponent(f.n); }).join('&');
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?' + families + '&display=swap';
    document.head.appendChild(link);
  }
}

/* ════════════════ Font picker widget ════════════════ */
function _togglePicker(){
  var p = document.getElementById('teFontPanel');
  if(!p) return;
  if(p.classList.contains('open')) _closePicker(); else _openPicker();
}
function _openPicker(){
  var p = document.getElementById('teFontPanel');
  if(p) p.classList.add('open');
  var s = document.getElementById('teFontSearch');
  if(s){ s.value = ''; s.focus(); }
  _renderFontList();
}
function _closePicker(){
  var p = document.getElementById('teFontPanel');
  if(p) p.classList.remove('open');
}
function _onSearch(){
  var s = document.getElementById('teFontSearch');
  _renderFontList(s ? s.value : '');
}
function _renderFontList(filter){
  var el = document.getElementById('teFontList');
  if(!el) return;
  var q = (filter || '').toLowerCase();
  var shown = q ? FONTS.filter(function(f){ return f.n.toLowerCase().indexOf(q) !== -1; }) : FONTS;

  // custom uploaded fonts first
  var customs = Object.keys(_loadedFonts).filter(function(n){ return !FONTS.some(function(f){ return f.n === n; }); });

  var h = '';
  customs.forEach(function(name){
    var act = name === _currentName ? ' te-fi-active' : '';
    h += '<div class="te-fi' + act + '" data-v="custom:' + name + '" onclick="gsbTextEditor.pickFont(this)">'
       + '<span style="font-family:sans-serif">✦ ' + _esc(name) + '</span></div>';
  });
  if(customs.length && shown.length) h += '<div class="te-fi-sep"></div>';

  shown.forEach(function(f){
    var act = f.n === _currentName ? ' te-fi-active' : '';
    h += '<div class="te-fi' + act + '" data-v="google:' + f.n + '" data-id="' + f.id + '" onclick="gsbTextEditor.pickFont(this)">'
       + '<span style="font-family:\'' + f.n + '\',sans-serif">' + _esc(f.n) + '</span></div>';
  });

  el.innerHTML = h || '<div style="padding:16px;color:#9ca3af;text-align:center;font-size:.82rem">Geen resultaten</div>';
}
function _esc(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); }

/* ════════════════ Pick / load font ════════════════ */
async function pickFont(el){
  var val = el && el.dataset.v;
  if(!val) return;
  var st = document.getElementById('teFontStatus');
  var lb = document.getElementById('teFontLabel');
  try{
    _setStatus('Lettertype laden…', '#6946c8');
    if(val.indexOf('google:') === 0){
      var name = val.replace('google:','');
      var fid  = el.dataset.id;
      _currentFont = await _loadFont(name, fid);
      _currentName = name;
    } else {
      var cname = val.replace('custom:','');
      _currentFont = _loadedFonts[cname];
      _currentName = cname;
    }
    if(lb){
      lb.textContent = _currentName;
      lb.style.fontFamily = "'" + _currentName + "', sans-serif";
    }
    _setStatus('','');
    _closePicker();
    _updatePreview();
    _renderFontList();
  } catch(e){
    console.error('[TextEditor]', e);
    _setStatus(e.message || 'Fout bij laden lettertype', '#ef4444');
    _currentFont = null;
  }
}

function _setStatus(msg, color){
  var el = document.getElementById('teFontStatus');
  if(!el) return;
  el.textContent = msg;
  el.style.color = color || '';
}

/* ── Load font for opentype.js (WOFF from Fontsource CDN) ── */
async function _loadFont(name, fid){
  if(_loadedFonts[name]) return _loadedFonts[name];

  // Strategy: try WOFF from Fontsource (opentype.js parses natively), then TTF
  var fmts = ['woff','ttf'];
  var lastErr = null;

  for(var i = 0; i < fmts.length; i++){
    try{
      var url = FONT_CDN + fid + '@latest/latin-400-normal.' + fmts[i];
      var resp = await fetch(url);
      if(!resp.ok) continue;
      var buf = await resp.arrayBuffer();
      // Detect WOFF2 (opentype.js can't decompress it)
      var sig = new Uint8Array(buf, 0, 4);
      if(sig[0]===0x77 && sig[1]===0x4F && sig[2]===0x46 && sig[3]===0x32) continue; // wOF2
      var font = opentype.parse(buf);
      _loadedFonts[name] = font;
      return font;
    } catch(e){ lastErr = e; }
  }

  // Fallback: Google Fonts CSS → extract non-woff2 URL
  try{
    var cssUrl = 'https://fonts.googleapis.com/css2?family=' + encodeURIComponent(name) + '&display=swap';
    var css = await fetch(cssUrl).then(function(r){ return r.text(); });
    // Prefer non-woff2 URLs
    var m = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff)\)/);
    if(!m) m = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.ttf)\)/);
    if(!m) m = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/);
    if(m){
      var buf2 = await fetch(m[1]).then(function(r){ return r.arrayBuffer(); });
      var sig2 = new Uint8Array(buf2, 0, 4);
      if(sig2[0]===0x77 && sig2[1]===0x4F && sig2[2]===0x46 && sig2[3]===0x32){
        throw new Error('Dit lettertype is alleen beschikbaar als WOFF2. Probeer het te downloaden als .ttf en upload het als eigen font.');
      }
      var font2 = opentype.parse(buf2);
      _loadedFonts[name] = font2;
      return font2;
    }
  } catch(e){ lastErr = e; }

  throw lastErr || new Error('Kan lettertype niet laden: ' + name);
}

/* ════════════════ Custom font upload ════════════════ */
async function onCustomFontUpload(){
  var inp = document.getElementById('teCustomFontInput');
  if(!inp || !inp.files || !inp.files[0]) return;
  var file = inp.files[0];
  try{
    _setStatus('Laden…', '#6946c8');
    var buf = await file.arrayBuffer();
    var font = opentype.parse(buf);
    var name = (font.names && font.names.fontFamily && font.names.fontFamily.en) || file.name.replace(/\.[^.]+$/, '');
    _loadedFonts[name] = font;
    _currentFont = font;
    _currentName = name;
    var lb = document.getElementById('teFontLabel');
    if(lb){ lb.textContent = name; lb.style.fontFamily = 'sans-serif'; }
    _setStatus('','');
    _updatePreview();
    _renderFontList();
  } catch(e){
    console.error('[TextEditor] custom font:', e);
    _setStatus(e.message || 'Kan lettertype niet laden', '#ef4444');
  }
  inp.value = '';
}

/* ════════════════ CSV import ════════════════ */
function onCsvImport(){
  var inp = document.getElementById('teCsvInput');
  if(!inp || !inp.files || !inp.files[0]) return;
  var file = inp.files[0];
  var reader = new FileReader();
  reader.onload = function(ev){
    var text = ev.target.result;
    var lines = text.split(/[\r\n]+/).map(function(l){ return l.trim(); }).filter(Boolean);
    var ta = document.getElementById('teTextInput');
    if(ta){
      var ex = ta.value.trim();
      ta.value = ex ? ex + '\n' + lines.join('\n') : lines.join('\n');
    }
    if(window.toast) window.toast(lines.length + ' namen geïmporteerd', 'success');
    _updatePreview();
  };
  reader.readAsText(file);
  inp.value = '';
}

/* ════════════════ Color hex label sync ════════════════ */
function _syncColorHex(){
  var ci = document.getElementById('teColor');
  var ch = document.getElementById('teColorHex');
  if(ci && ch) ch.textContent = ci.value.toUpperCase();
  _updatePreview();
}

/* ════════════════ Preview ════════════════ */
function _updatePreview(){
  var el = document.getElementById('tePreview');
  if(!el || !_currentFont){
    if(el && !_currentFont) el.innerHTML = '<span style="color:#9ca3af;font-size:.82rem">Kies een lettertype om preview te zien</span>';
    return;
  }
  var ta = document.getElementById('teTextInput');
  var text = ((ta ? ta.value : '') || '').split('\n')[0] || 'Voorbeeld';
  var ci = document.getElementById('teColor');
  var color = ci ? ci.value : '#000000';

  try{
    var fontSize = 60;
    // Place baseline at ascender height so all coords are positive
    var ascent = (_currentFont.ascender || 800) / (_currentFont.unitsPerEm || 1000) * fontSize;
    var path = _currentFont.getPath(text, 0, ascent, fontSize);
    var bb = path.getBoundingBox();
    var w = bb.x2 - bb.x1;
    var h = bb.y2 - bb.y1;
    if(w > 0 && h > 0){
      var dAttr = _extractPathData(path);
      el.innerHTML = '<svg viewBox="0 0 ' + (w+4).toFixed(1) + ' ' + (h+4).toFixed(1) + '"'
        + ' style="max-width:100%;max-height:90px;display:block;margin:0 auto"'
        + ' xmlns="http://www.w3.org/2000/svg">'
        + '<path d="' + dAttr + '" fill="' + color + '" transform="translate(' + (-bb.x1+2).toFixed(1) + ',' + (-bb.y1+2).toFixed(1) + ')"/>'
        + '</svg>';
    } else {
      el.innerHTML = '<span style="color:#9ca3af;font-size:.82rem">Geen preview beschikbaar</span>';
    }
  } catch(e){
    el.innerHTML = '<span style="color:#ef4444;font-size:.82rem">Preview fout</span>';
  }
}

/* ════════════════ Extract d-attribute from opentype path ════════════════ */
function _extractPathData(path){
  // Try toPathData first (opentype.js v1 & v2), fall back to parsing toSVG
  if(typeof path.toPathData === 'function'){
    try{ return path.toPathData(2); } catch(_){}
  }
  if(typeof path.toSVG === 'function'){
    var svg = path.toSVG(2);
    var m = svg.match(/d="([^"]*)"/);
    return m ? m[1] : '';
  }
  return '';
}

/* ════════════════ Generate SVG from text ════════════════ */
function _textToSvg(text, font, heightMm, color){
  var upm = font.unitsPerEm || 1000;

  // Render at upm to measure actual glyph height
  var testAscent = (font.ascender || 800) / upm * upm;
  var testPath = font.getPath(text, 0, testAscent, upm);
  var testBb = testPath.getBoundingBox();
  var testH = testBb.y2 - testBb.y1;
  if(testH <= 0) return null;

  // Scale so rendered height = target mm
  var fontSize = (heightMm / testH) * upm;

  // Re-render at correct size (baseline positioned at scaled ascent)
  var ascent = (font.ascender || 800) / upm * fontSize;
  var path = font.getPath(text, 0, ascent, fontSize);
  var bb = path.getBoundingBox();
  var w = bb.x2 - bb.x1;
  var h = bb.y2 - bb.y1;
  if(w <= 0 || h <= 0) return null;

  var dAttr = _extractPathData(path);
  // viewBox 0 0 w h + translate path → all coords positive, no negative viewBox
  var svg = '<svg xmlns="http://www.w3.org/2000/svg"'
    + ' width="' + w.toFixed(2) + 'mm" height="' + h.toFixed(2) + 'mm"'
    + ' viewBox="0 0 ' + w.toFixed(2) + ' ' + h.toFixed(2) + '">'
    + '<path d="' + dAttr + '" fill="' + (color || '#000000') + '"'
    + ' transform="translate(' + (-bb.x1).toFixed(2) + ',' + (-bb.y1).toFixed(2) + ')"/>'
    + '</svg>';

  return { svg: svg, mmW: w, mmH: h };
}

/* ════════════════ Add texts to canvas ════════════════ */
function addTexts(){
  if(!_currentFont){
    if(window.toast) window.toast('Kies eerst een lettertype', 'warn');
    return;
  }
  var ta = document.getElementById('teTextInput');
  var raw = (ta ? ta.value : '').trim();
  if(!raw){
    if(window.toast) window.toast('Voer tekst in', 'warn');
    return;
  }

  var si = document.getElementById('teSizeMm');
  var su = document.getElementById('teSizeUnit');
  var sizeMm = parseFloat(si ? si.value : 30) || 30;
  if((su ? su.value : 'mm') === 'cm') sizeMm *= 10;

  var ci = document.getElementById('teColor');
  var color = ci ? ci.value : '#000000';

  var lines = raw.split('\n').map(function(l){ return l.trim(); }).filter(Boolean);
  if(!lines.length) return;

  var added = 0;
  lines.forEach(function(line){
    var result = _textToSvg(line, _currentFont, sizeMm, color);
    if(!result) return;
    if(window.loadSvg){
      window.loadSvg(result.svg, line);
      added++;
    }
  });

  if(added > 0){
    if(window.toast) window.toast(added + ' tekst' + (added > 1 ? 'en' : '') + ' toegevoegd', 'success');
    close();
  }
}

/* ════════════════ Public API ════════════════ */
window.gsbTextEditor = {
  open: open,
  close: close,
  pickFont: pickFont,
  togglePicker: _togglePicker,
  onSearch: _onSearch,
  onCustomFontUpload: onCustomFontUpload,
  onCsvImport: onCsvImport,
  syncColor: _syncColorHex,
  addTexts: addTexts,
  updatePreview: _updatePreview,
};

})();
