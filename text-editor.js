/* ================================================================
   text-editor.js — Tekst-naar-SVG creator voor Gang Sheet Builder
   v2.7.0 — font picker (80+ fonts incl. sport/college), styling, outside stroke + offset
   ================================================================ */
(function(){
'use strict';

/* ── Font database ── */
var FONTS = [
  {n:'Roboto',id:'roboto'},{n:'Open Sans',id:'open-sans'},{n:'Montserrat',id:'montserrat'},
  {n:'Lato',id:'lato'},{n:'Poppins',id:'poppins'},{n:'Raleway',id:'raleway'},
  {n:'Inter',id:'inter'},{n:'Nunito',id:'nunito'},{n:'Barlow',id:'barlow'},
  {n:'Barlow Condensed',id:'barlow-condensed'},{n:'Oswald',id:'oswald'},
  {n:'Work Sans',id:'work-sans'},{n:'DM Sans',id:'dm-sans'},{n:'Quicksand',id:'quicksand'},
  {n:'Rubik',id:'rubik'},{n:'Fira Sans',id:'fira-sans'},{n:'Manrope',id:'manrope'},
  {n:'Source Sans 3',id:'source-sans-3'},
  {n:'Bebas Neue',id:'bebas-neue'},{n:'Anton',id:'anton'},{n:'Archivo Black',id:'archivo-black'},
  {n:'Russo One',id:'russo-one'},{n:'Teko',id:'teko'},{n:'Black Ops One',id:'black-ops-one'},
  {n:'Bungee',id:'bungee'},{n:'Orbitron',id:'orbitron'},{n:'Righteous',id:'righteous'},
  {n:'Passion One',id:'passion-one'},{n:'Permanent Marker',id:'permanent-marker'},
  {n:'Bangers',id:'bangers'},{n:'Alfa Slab One',id:'alfa-slab-one'},
  {n:'Fugaz One',id:'fugaz-one'},{n:'Abril Fatface',id:'abril-fatface'},
  {n:'Staatliches',id:'staatliches'},{n:'Ultra',id:'ultra'},
  {n:'Bowlby One SC',id:'bowlby-one-sc'},{n:'Bungee Shade',id:'bungee-shade'},
  {n:'Playfair Display',id:'playfair-display'},{n:'Merriweather',id:'merriweather'},
  {n:'Lora',id:'lora'},{n:'PT Serif',id:'pt-serif'},{n:'EB Garamond',id:'eb-garamond'},
  {n:'Libre Baskerville',id:'libre-baskerville'},{n:'Crimson Text',id:'crimson-text'},
  {n:'Dancing Script',id:'dancing-script'},{n:'Pacifico',id:'pacifico'},
  {n:'Lobster',id:'lobster'},{n:'Great Vibes',id:'great-vibes'},
  {n:'Sacramento',id:'sacramento'},{n:'Satisfy',id:'satisfy'},{n:'Caveat',id:'caveat'},
  {n:'Indie Flower',id:'indie-flower'},{n:'Shadows Into Light',id:'shadows-into-light'},
  {n:'Kalam',id:'kalam'},{n:'Roboto Mono',id:'roboto-mono'},{n:'Source Code Pro',id:'source-code-pro'},
  // ── Sport / Jersey ──
  {n:'Saira Stencil One',id:'saira-stencil-one'},{n:'Saira Condensed',id:'saira-condensed'},
  {n:'Saira Extra Condensed',id:'saira-extra-condensed'},{n:'Racing Sans One',id:'racing-sans-one'},
  {n:'Ceviche One',id:'ceviche-one'},{n:'Faster One',id:'faster-one'},
  // ── College / University ──
  {n:'Graduate',id:'graduate'},{n:'Holtwood One SC',id:'holtwood-one-sc'},
  {n:'Aldrich',id:'aldrich'},{n:'Squada One',id:'squada-one'},
  // ── Athletic / Bold Display ──
  {n:'Big Shoulders Display',id:'big-shoulders-display'},{n:'Big Shoulders Stencil Display',id:'big-shoulders-stencil-display'},
  {n:'Fjalla One',id:'fjalla-one'},{n:'Hammersmith One',id:'hammersmith-one'},
  {n:'Jockey One',id:'jockey-one'},{n:'Secular One',id:'secular-one'},
  {n:'Sigmar One',id:'sigmar-one'},{n:'Exo 2',id:'exo-2'},
  {n:'Kanit',id:'kanit'},{n:'Chakra Petch',id:'chakra-petch'},{n:'Tourney',id:'tourney'},
  // ── Stencil / Military ──
  {n:'Quantico',id:'quantico'},{n:'Michroma',id:'michroma'},
  {n:'Audiowide',id:'audiowide'},{n:'Contrail One',id:'contrail-one'},
];
var FONT_CDN = 'https://cdn.jsdelivr.net/fontsource/fonts/';

/* ── State ── */
var _currentFont  = null;
var _currentName  = '';
var _currentId    = '';
var _loadedFonts  = {};     // key → opentype.Font
var _previewCssOk = false;
// Styling
var _bold = false, _italic = false, _underline = false, _allCaps = false;
var _spacing = 0;           // extra spacing in % of fontSize (0 = normal)
var _strokeColor = 'none';
var _strokeWidth = 0;
var _strokeOffset = 0;  // gap between text and stroke (outside)

/* ══════════ Modal ══════════ */
function open(){
  var m = document.getElementById('textEditorModal');
  if(!m) return;
  m.classList.add('open');
  if(!_previewCssOk) _loadPreviewCss();
  _renderFontList();
  _showUsedFonts();
  setTimeout(function(){ var t = document.getElementById('teTextInput'); if(t) t.focus(); }, 120);
}
function close(){
  var m = document.getElementById('textEditorModal');
  if(m) m.classList.remove('open');
  _closePicker();
}

/* ══════════ Google Fonts CSS for preview rendering ══════════ */
function _loadPreviewCss(){
  _previewCssOk = true;
  for(var i = 0; i < FONTS.length; i += 18){
    var batch = FONTS.slice(i, i + 18);
    var fams = batch.map(function(f){ return 'family=' + encodeURIComponent(f.n) + ':ital,wght@0,400;0,700;1,400'; }).join('&');
    var lnk = document.createElement('link');
    lnk.rel = 'stylesheet';
    lnk.href = 'https://fonts.googleapis.com/css2?' + fams + '&display=swap';
    document.head.appendChild(lnk);
  }
}

/* ══════════ Font picker widget ══════════ */
function _togglePicker(){
  var p = document.getElementById('teFontPanel');
  if(!p) return;
  p.classList.contains('open') ? _closePicker() : _openPicker();
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
  var customs = Object.keys(_loadedFonts).filter(function(n){ return n.indexOf('__') === -1 && !FONTS.some(function(f){ return f.n === n; }); });
  var h = '';
  customs.forEach(function(name){
    var act = name === _currentName ? ' te-fi-active' : '';
    h += '<div class="te-fi'+act+'" data-v="custom:'+_esc(name)+'" onclick="gsbTextEditor.pickFont(this)"><span>✦ '+_esc(name)+'</span></div>';
  });
  if(customs.length && shown.length) h += '<div class="te-fi-sep"></div>';
  shown.forEach(function(f){
    var act = f.n === _currentName ? ' te-fi-active' : '';
    h += '<div class="te-fi'+act+'" data-v="google:'+f.n+'" data-id="'+f.id+'" onclick="gsbTextEditor.pickFont(this)">'
       + '<span style="font-family:\''+f.n+'\',sans-serif">'+_esc(f.n)+'</span></div>';
  });
  el.innerHTML = h || '<div style="padding:16px;color:#9ca3af;text-align:center;font-size:.82rem">Geen resultaten</div>';
}
function _esc(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); }

/* ══════════ Pick + load font ══════════ */
async function pickFont(el){
  var val = el && el.dataset.v;
  if(!val) return;
  try{
    _setStatus('Lettertype laden…','#6946c8');
    if(val.indexOf('google:') === 0){
      var name = val.replace('google:','');
      var fid  = el.dataset.id;
      _currentFont = await _loadFont(name, fid, '400', 'normal');
      _currentName = name;
      _currentId = fid;
    } else {
      var cname = val.replace('custom:','');
      _currentFont = _loadedFonts[cname];
      _currentName = cname;
      _currentId = '';
    }
    var lb = document.getElementById('teFontLabel');
    if(lb){ lb.textContent = _currentName; lb.style.fontFamily = "'"+_currentName+"',sans-serif"; }
    _setStatus('','');
    _closePicker();
    _refreshPreview();
    _renderFontList();
  } catch(e){
    console.error('[TE]',e);
    _setStatus(e.message||'Fout bij laden lettertype','#ef4444');
    _currentFont = null;
  }
}

function _setStatus(msg,col){
  var el = document.getElementById('teFontStatus');
  if(!el) return;
  el.textContent = msg; el.style.color = col||'';
}

/* ── Load font from Fontsource CDN (WOFF) ── */
async function _loadFont(name, fid, weight, style){
  var key = name + '__' + weight + '_' + style;
  if(weight === '400' && style === 'normal' && _loadedFonts[name]) return _loadedFonts[name];
  if(_loadedFonts[key]) return _loadedFonts[key];

  var fmts = ['woff','ttf'];
  var lastErr = null;
  for(var i = 0; i < fmts.length; i++){
    try{
      var url = FONT_CDN + fid + '@latest/latin-' + weight + '-' + style + '.' + fmts[i];
      var resp = await fetch(url);
      if(!resp.ok) continue;
      var buf = await resp.arrayBuffer();
      var sig = new Uint8Array(buf,0,4);
      if(sig[0]===0x77&&sig[1]===0x4F&&sig[2]===0x46&&sig[3]===0x32) continue; // skip WOFF2
      var font = opentype.parse(buf);
      _loadedFonts[key] = font;
      if(weight==='400' && style==='normal') _loadedFonts[name] = font;
      return font;
    } catch(e){ lastErr = e; }
  }
  // Fallback: Google Fonts CSS
  try{
    var cssUrl = 'https://fonts.googleapis.com/css2?family='+encodeURIComponent(name)+':ital,wght@'+(style==='italic'?'1':'0')+','+weight+'&display=swap';
    var css = await fetch(cssUrl).then(function(r){ return r.text(); });
    var m = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff)\)/);
    if(!m) m = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.ttf)\)/);
    if(!m) m = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/);
    if(m){
      var buf2 = await fetch(m[1]).then(function(r){ return r.arrayBuffer(); });
      var sig2 = new Uint8Array(buf2,0,4);
      if(sig2[0]===0x77&&sig2[1]===0x4F&&sig2[2]===0x46&&sig2[3]===0x32)
        throw new Error('Font alleen als WOFF2 beschikbaar. Upload het als .ttf via "Upload eigen font".');
      var f2 = opentype.parse(buf2);
      _loadedFonts[key] = f2;
      if(weight==='400' && style==='normal') _loadedFonts[name] = f2;
      return f2;
    }
  } catch(e){ lastErr = e; }
  throw lastErr || new Error('Kan lettertype niet laden: '+name);
}

/* ── Get styled font (bold/italic variants) ── */
async function _getStyledFont(){
  if(!_currentFont) return null;
  var weight = _bold ? '700' : '400';
  var style  = _italic ? 'italic' : 'normal';
  if(weight==='400' && style==='normal') return _currentFont;
  if(!_currentId) return _currentFont; // custom font, no variants
  try{
    return await _loadFont(_currentName, _currentId, weight, style);
  } catch(e){
    return _currentFont; // simulate in SVG
  }
}
function _needsSimBold(){ return _bold && !_loadedFonts[_currentName+'__700_'+(_italic?'italic':'normal')]; }
function _needsSimItalic(){ return _italic && !_loadedFonts[_currentName+'__'+(_bold?'700':'400')+'_italic']; }

/* ══════════ Custom font upload ══════════ */
async function onCustomFontUpload(){
  var inp = document.getElementById('teCustomFontInput');
  if(!inp||!inp.files||!inp.files[0]) return;
  var file = inp.files[0];
  try{
    _setStatus('Laden…','#6946c8');
    var buf = await file.arrayBuffer();
    var font = opentype.parse(buf);
    var name = (font.names&&font.names.fontFamily&&font.names.fontFamily.en)||file.name.replace(/\.[^.]+$/,'');
    _loadedFonts[name] = font;
    _currentFont = font; _currentName = name; _currentId = '';
    var lb = document.getElementById('teFontLabel');
    if(lb){ lb.textContent = name; lb.style.fontFamily = 'sans-serif'; }
    _setStatus('','');
    _refreshPreview(); _renderFontList();
  } catch(e){
    _setStatus(e.message||'Kan lettertype niet laden','#ef4444');
  }
  inp.value = '';
}

/* ══════════ CSV import ══════════ */
function onCsvImport(){
  var inp = document.getElementById('teCsvInput');
  if(!inp||!inp.files||!inp.files[0]) return;
  var reader = new FileReader();
  reader.onload = function(ev){
    var lines = ev.target.result.split(/[\r\n]+/).map(function(l){ return l.trim(); }).filter(Boolean);
    var ta = document.getElementById('teTextInput');
    if(ta){ var ex = ta.value.trim(); ta.value = ex ? ex+'\n'+lines.join('\n') : lines.join('\n'); }
    if(window.toast) window.toast(lines.length+' namen geïmporteerd','success');
    _refreshPreview();
  };
  reader.readAsText(inp.files[0]);
  inp.value = '';
}

/* ══════════ Styling toggles ══════════ */
function toggleBold(){
  _bold = !_bold;
  _syncToggleUI(); _refreshPreview();
}
function toggleItalic(){
  _italic = !_italic;
  _syncToggleUI(); _refreshPreview();
}
function toggleUnderline(){
  _underline = !_underline;
  _syncToggleUI(); _refreshPreview();
}
function toggleAllCaps(){
  _allCaps = !_allCaps;
  _syncToggleUI(); _refreshPreview();
}
function onSpacingChange(){
  var sl = document.getElementById('teSpacing');
  var lbl = document.getElementById('teSpacingVal');
  _spacing = parseFloat(sl?sl.value:0)||0;
  if(lbl) lbl.textContent = _spacing > 0 ? '+'+_spacing : _spacing;
  _refreshPreview();
}
function _syncToggleUI(){
  _tog('teBtnBold',_bold); _tog('teBtnItalic',_italic);
  _tog('teBtnUnderline',_underline); _tog('teBtnCaps',_allCaps);
}
function _tog(id,on){
  var el = document.getElementById(id);
  if(el) el.classList.toggle('te-tog-on', on);
}
function syncColor(){
  var ci = document.getElementById('teColor');
  var ch = document.getElementById('teColorHex');
  if(ci&&ch) ch.textContent = ci.value.toUpperCase();
  _refreshPreview();
}
function syncStroke(){
  var si = document.getElementById('teStrokeColor');
  var sw = document.getElementById('teStrokeWidth');
  var so = document.getElementById('teStrokeOffset');
  _strokeColor = si?si.value:'none';
  _strokeWidth = parseFloat(sw?sw.value:0)||0;
  _strokeOffset = parseFloat(so?so.value:0)||0;
  _refreshPreview();
}

/* ══════════ Path data extraction (robust triple fallback) ══════════ */
function _pd(path){
  // 1. toPathData
  try{ if(typeof path.toPathData==='function'){
    var d = path.toPathData(2);
    if(typeof d==='string' && d.length>1) return d;
    d = path.toPathData({decimalPlaces:2});
    if(typeof d==='string' && d.length>1) return d;
  }}catch(_){}
  // 2. parse toSVG
  try{ if(typeof path.toSVG==='function'){
    var svg = path.toSVG(2); if(typeof svg!=='string') svg = path.toSVG();
    if(typeof svg==='string'){ var m=svg.match(/d="([^"]*)"/); if(m&&m[1].length>1) return m[1]; }
  }}catch(_){}
  // 3. manual from commands
  try{ if(path.commands&&path.commands.length){
    var s='';
    path.commands.forEach(function(c){
      switch(c.type){
        case 'M': s+='M'+_r(c.x)+' '+_r(c.y); break;
        case 'L': s+='L'+_r(c.x)+' '+_r(c.y); break;
        case 'C': s+='C'+_r(c.x1)+' '+_r(c.y1)+' '+_r(c.x2)+' '+_r(c.y2)+' '+_r(c.x)+' '+_r(c.y); break;
        case 'Q': s+='Q'+_r(c.x1)+' '+_r(c.y1)+' '+_r(c.x)+' '+_r(c.y); break;
        case 'Z': s+='Z'; break;
      }
    });
    if(s.length>1) return s;
  }}catch(_){}
  return '';
}
function _r(n){ return Math.round(n*100)/100; }

/* ══════════ Glyph-by-glyph rendering (for letter spacing) ══════════ */
function _renderGlyphs(font, text, baseline, fontSize, extraSp){
  var glyphs;
  try{ glyphs = font.stringToGlyphs(text); }catch(_){ return null; }
  if(!glyphs||!glyphs.length) return null;
  var scale = fontSize / (font.unitsPerEm||1000);
  var x = 0, allD = '';
  var mnX=1e9, mnY=1e9, mxX=-1e9, mxY=-1e9;
  for(var i=0;i<glyphs.length;i++){
    var g = glyphs[i];
    try{
      var p = g.getPath(x, baseline, fontSize);
      var bb = p.getBoundingBox();
      if(bb.x1<mnX) mnX=bb.x1; if(bb.y1<mnY) mnY=bb.y1;
      if(bb.x2>mxX) mxX=bb.x2; if(bb.y2>mxY) mxY=bb.y2;
      var d = _pd(p);
      if(d) allD += d;
    }catch(_){}
    var adv = (g.advanceWidth||0)*scale;
    if(i<glyphs.length-1){
      try{ adv += font.getKerningValue(g,glyphs[i+1])*scale; }catch(_){}
    }
    x += adv + extraSp;
  }
  if(!allD) return null;
  return { d:allD, bb:{ x1:isFinite(mnX)?mnX:0, y1:isFinite(mnY)?mnY:0, x2:isFinite(mxX)?mxX:x, y2:isFinite(mxY)?mxY:fontSize } };
}

/* ══════════ Core: text → SVG ══════════ */
function _textToSvg(text, font, heightMm, color, opts){
  if(opts.allCaps) text = text.toUpperCase();
  if(!text.trim()) return null;
  var upm = font.unitsPerEm||1000;

  // ── Measure x-height (lowercase body) for sizing ──
  var refPath, refBb, refH;
  try{ refPath = font.getPath('xon', 0, 0, upm); refBb = refPath.getBoundingBox(); refH = refBb.y2 - refBb.y1; }
  catch(_){ refH = 0; }
  if(refH <= 0) refH = upm * 0.5; // fallback

  var fontSize = (heightMm / refH) * upm;
  var extraSp = opts.spacing * fontSize / 100;

  // ── Render path data ──
  var dAttr, bb;
  try{
    if(Math.abs(extraSp) > 0.01){
      var result = _renderGlyphs(font, text, 0, fontSize, extraSp);
      if(!result) return null;
      dAttr = result.d; bb = result.bb;
    } else {
      var path = font.getPath(text, 0, 0, fontSize);
      bb = path.getBoundingBox();
      dAttr = _pd(path);
    }
  } catch(pathErr){
    console.warn('[TE] Font path error (possibly unsupported GSUB table):', pathErr.message);
    // Fallback: try without substitution by rendering glyph-by-glyph
    try{
      var fbResult = _renderGlyphs(font, text, 0, fontSize, extraSp);
      if(!fbResult) return null;
      dAttr = fbResult.d; bb = fbResult.bb;
    } catch(_){ return null; }
  }
  if(!dAttr || dAttr.length < 2) return null;
  var w = bb.x2 - bb.x1;
  var h = bb.y2 - bb.y1;
  if(w <= 0 || h <= 0) return null;

  // ── Shift to origin ──
  var tx = (-bb.x1), ty = (-bb.y1);

  // ── Italic simulation: skew transform ──
  var transforms = 'translate('+_r(tx)+','+_r(ty)+')';
  if(opts.simulateItalic){
    transforms += ' skewX(-12)';
    var skewExtra = h * Math.tan(12 * Math.PI/180);
    w += skewExtra;
    tx += skewExtra * 0.5;
    transforms = 'translate('+_r(tx)+','+_r(ty)+') skewX(-12)';
  }

  // ── Build SVG paths: outside stroke first (behind), then fill on top ──
  var svgInner = '';
  var hasStroke = opts.strokeColor && opts.strokeColor !== 'none' && opts.strokeWidth > 0;
  var strokeOffset = opts.strokeOffset || 0;

  if(hasStroke){
    // Expand viewBox first to make room for stroke on all sides
    var expand = opts.strokeWidth + strokeOffset;
    tx += expand; ty += expand;
    w += expand * 2; h += expand * 2;
    // Rebuild transforms with expanded offset
    transforms = 'translate('+_r(tx)+','+_r(ty)+')';
    if(opts.simulateItalic) transforms += ' skewX(-12)';
    // Outside stroke layer: doubled width (SVG strokes are centered, fill covers inner half)
    var outerSW = (opts.strokeWidth + strokeOffset) * 2;
    svgInner += '<path d="'+dAttr+'" fill="'+opts.strokeColor+'" stroke="'+opts.strokeColor+'" stroke-width="'+_r(outerSW)+'" stroke-linejoin="round" transform="'+transforms+'"/>';
  }

  // Fill path (on top, same transform)
  var fillStrokeAttr = '';
  if(opts.simulateBold) fillStrokeAttr = ' stroke="'+color+'" stroke-width="'+(fontSize*0.022).toFixed(1)+'" stroke-linejoin="round"';
  svgInner += '<path d="'+dAttr+'" fill="'+color+'"'+fillStrokeAttr+' transform="'+transforms+'"/>';

  // ── Underline ──
  if(opts.underline){
    var lineY = _r(ty + fontSize * 0.08);
    var lineW = _r(w);
    var lw = _r(fontSize * 0.04);
    svgInner += '<line x1="0" y1="'+lineY+'" x2="'+lineW+'" y2="'+lineY+'" stroke="'+color+'" stroke-width="'+lw+'"/>';
    h = Math.max(h, (ty + fontSize * 0.08 + fontSize * 0.04));
  }

  var svg = '<svg xmlns="http://www.w3.org/2000/svg"'
    +' width="'+_r(w)+'mm" height="'+_r(h)+'mm"'
    +' viewBox="0 0 '+_r(w)+' '+_r(h)+'"'
    +' data-gsb-font="'+_esc(_currentName)+'">'
    +svgInner+'</svg>';

  return { svg:svg, mmW:w, mmH:h };
}

/* ══════════ Light color detection ══════════ */
function _isLightColor(hex){
  hex = (hex||'').replace('#','');
  if(hex.length===3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  var r = parseInt(hex.substring(0,2),16)/255;
  var g = parseInt(hex.substring(2,4),16)/255;
  var b = parseInt(hex.substring(4,6),16)/255;
  // Relative luminance (sRGB)
  var lum = 0.2126*r + 0.7152*g + 0.0722*b;
  return lum > 0.65;
}

/* ══════════ Preview ══════════ */
function _refreshPreview(){
  var el = document.getElementById('tePreview');
  if(!el) return;
  if(!_currentFont){ el.innerHTML = '<span style="color:#9ca3af;font-size:.82rem">Kies een lettertype om preview te zien</span>'; return; }
  var ta = document.getElementById('teTextInput');
  var text = ((ta?ta.value:'')||'').split('\n')[0] || 'Voorbeeld';
  var ci = document.getElementById('teColor');
  var color = ci?ci.value:'#000000';
  try{
    var font = _currentFont;
    // For preview, use the styled font if available (try synchronously from cache)
    var wt = _bold?'700':'400';
    var st = _italic?'italic':'normal';
    var key = _currentName+'__'+wt+'_'+st;
    if(_loadedFonts[key]) font = _loadedFonts[key];

    if(_allCaps) text = text.toUpperCase();
    var upm = font.unitsPerEm||1000;
    var refH;
    try{ var refPath = font.getPath('xon',0,0,upm); var refBb = refPath.getBoundingBox(); refH = refBb.y2 - refBb.y1; }
    catch(_){ refH = 0; }
    if(refH<=0) refH = upm*0.5;
    var fontSize = (40/refH)*upm; // 40 "units" for preview
    var extraSp = _spacing * fontSize / 100;

    var dAttr, bb;
    try{
      if(Math.abs(extraSp) > 0.01){
        var result = _renderGlyphs(font, text, 0, fontSize, extraSp);
        if(!result){ el.innerHTML='<span style="color:#9ca3af">Geen preview</span>'; return; }
        dAttr = result.d; bb = result.bb;
      } else {
        var path = font.getPath(text, 0, 0, fontSize);
        bb = path.getBoundingBox();
        dAttr = _pd(path);
      }
    } catch(gsubErr){
      // Fallback for fonts with unsupported GSUB tables (e.g. substFormat 2)
      try{
        var fbR = _renderGlyphs(font, text, 0, fontSize, extraSp);
        if(!fbR){ el.innerHTML='<span style="color:#9ca3af">Geen preview</span>'; return; }
        dAttr = fbR.d; bb = fbR.bb;
      } catch(_){ el.innerHTML='<span style="color:#9ca3af">Geen preview</span>'; return; }
    }
    if(!dAttr||dAttr.length<2){ el.innerHTML='<span style="color:#9ca3af">Geen preview</span>'; return; }
    var w = bb.x2-bb.x1, h = bb.y2-bb.y1;
    if(w<=0||h<=0){ el.innerHTML='<span style="color:#9ca3af">Geen preview</span>'; return; }
    var tx = -bb.x1+2, ty = -bb.y1+2;
    var vw = w+4, vh = h+4;
    var transforms = 'translate('+_r(tx)+','+_r(ty)+')';
    var simItalic = _italic && !_loadedFonts[_currentName+'__'+wt+'_italic'];
    if(simItalic){
      var se = h*Math.tan(12*Math.PI/180);
      vw += se; tx += se*0.5;
      transforms = 'translate('+_r(tx)+','+_r(ty)+') skewX(-12)';
    }
    var simBold = _bold && !_loadedFonts[_currentName+'__700_'+(_italic?'italic':'normal')];
    var hasStroke = _strokeColor&&_strokeColor!=='none'&&_strokeWidth>0;

    // Expand viewBox for outside stroke
    if(hasStroke){
      var expand = _strokeWidth + _strokeOffset;
      tx += expand; ty += expand; vw += expand*2; vh += expand*2;
      transforms = 'translate('+_r(tx)+','+_r(ty)+')';
      if(simItalic) transforms += ' skewX(-12)';
    }

    // Auto dark background for light text colors
    var bgStyle = '';
    if(_isLightColor(color)){
      bgStyle = 'background:#1a1a1a;border-radius:6px;padding:4px';
    }
    el.style.cssText = bgStyle ? bgStyle : '';

    var svgH = '<svg viewBox="0 0 '+_r(vw)+' '+_r(vh)+'" style="max-width:100%;max-height:90px;display:block;margin:0 auto" xmlns="http://www.w3.org/2000/svg">';
    // Outside stroke layer (behind)
    if(hasStroke){
      var outerSW = (_strokeWidth + _strokeOffset) * 2;
      svgH += '<path d="'+dAttr+'" fill="'+_strokeColor+'" stroke="'+_strokeColor+'" stroke-width="'+_r(outerSW)+'" stroke-linejoin="round" transform="'+transforms+'"/>';
    }
    // Fill layer (on top)
    var simBoldA = simBold ? ' stroke="'+color+'" stroke-width="'+(fontSize*0.022).toFixed(1)+'" stroke-linejoin="round"' : '';
    svgH += '<path d="'+dAttr+'" fill="'+color+'"'+simBoldA+' transform="'+transforms+'"/>';
    if(_underline){
      var ly = _r(ty + fontSize*0.08);
      svgH += '<line x1="2" y1="'+ly+'" x2="'+_r(vw-2)+'" y2="'+ly+'" stroke="'+color+'" stroke-width="'+_r(fontSize*0.04)+'"/>';
    }
    svgH += '</svg>';
    el.innerHTML = svgH;
  } catch(e){
    el.innerHTML = '<span style="color:#ef4444;font-size:.82rem">Preview fout: '+_esc(e.message||'')+'</span>';
  }
}

/* ══════════ Add texts to canvas ══════════ */
async function addTexts(){
  if(!_currentFont){ if(window.toast) window.toast('Kies eerst een lettertype','warn'); return; }
  var ta = document.getElementById('teTextInput');
  var raw = (ta?ta.value:'').trim();
  if(!raw){ if(window.toast) window.toast('Voer tekst in','warn'); return; }

  var si = document.getElementById('teSizeMm');
  var su = document.getElementById('teSizeUnit');
  var sizeMm = parseFloat(si?si.value:30)||30;
  if((su?su.value:'mm')==='cm') sizeMm *= 10;
  var ci = document.getElementById('teColor');
  var color = ci?ci.value:'#000000';

  // Load styled font variant if needed
  var font;
  try{ font = await _getStyledFont(); }catch(_){ font = _currentFont; }
  if(!font) font = _currentFont;

  var simBold = _needsSimBold();
  var simItalic = _needsSimItalic();

  var lines = raw.split('\n').map(function(l){ return l.trim(); }).filter(Boolean);
  if(!lines.length) return;
  var added = 0;
  lines.forEach(function(line){
    var result = _textToSvg(line, font, sizeMm, color, {
      bold:_bold, italic:_italic, underline:_underline, allCaps:_allCaps,
      spacing:_spacing, simulateBold:simBold, simulateItalic:simItalic,
      strokeColor:_strokeColor, strokeWidth:_strokeWidth, strokeOffset:_strokeOffset,
    });
    if(!result){ console.warn('[TE] Empty SVG for:',line); return; }
    if(window.loadSvg){ window.loadSvg(result.svg, line); added++; }
  });
  if(added > 0){
    if(window.toast) window.toast(added+' tekst'+(added>1?'en':'')+' toegevoegd','success');
    close();
  } else {
    if(window.toast) window.toast('Geen tekst kon worden omgezet — controleer het lettertype','warn');
  }
}

/* ══════════ Used fonts in project ══════════ */
function _showUsedFonts(){
  var el = document.getElementById('teUsedFonts');
  if(!el) return;
  var fonts = _getUsedFontsFromCanvas();
  if(!fonts.length){ el.innerHTML = '<span style="color:#9ca3af;font-size:.78rem">Nog geen teksten op het vel</span>'; return; }
  el.innerHTML = fonts.map(function(f){
    return '<span class="te-used-tag" style="font-family:\''+f+'\',sans-serif">'+_esc(f)+'</span>';
  }).join('');
}
function _getUsedFontsFromCanvas(){
  var set = {};
  try{
    var data = window.gsbGetProjectData && window.gsbGetProjectData();
    if(data && data.canvasJson && data.canvasJson.objects){
      data.canvasJson.objects.forEach(function(obj){
        var src = obj._svgSource || '';
        var m = src.match(/data-gsb-font="([^"]*)"/);
        if(m && m[1]) set[m[1]] = true;
      });
    }
  }catch(_){}
  return Object.keys(set);
}

/* ══════════ Public API ══════════ */
window.gsbTextEditor = {
  open:open, close:close,
  pickFont:pickFont,
  togglePicker:_togglePicker,
  onSearch:_onSearch,
  onCustomFontUpload:onCustomFontUpload,
  onCsvImport:onCsvImport,
  toggleBold:toggleBold, toggleItalic:toggleItalic,
  toggleUnderline:toggleUnderline, toggleAllCaps:toggleAllCaps,
  onSpacingChange:onSpacingChange,
  syncColor:syncColor, syncStroke:syncStroke,
  addTexts:addTexts,
  updatePreview:_refreshPreview,
};

})();
