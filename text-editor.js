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

  // ── Build SVG path with outside-aligned stroke via paint-order ──
  var svgInner = '';
  var hasStroke = opts.strokeColor && opts.strokeColor !== 'none' && opts.strokeWidth > 0;
  var strokeOffset = opts.strokeOffset || 0;

  if(hasStroke){
    // Expand viewBox to make room for outward stroke on all sides
    var expand = opts.strokeWidth + strokeOffset;
    tx += expand; ty += expand;
    w += expand * 2; h += expand * 2;
    transforms = 'translate('+_r(tx)+','+_r(ty)+')';
    if(opts.simulateItalic) transforms += ' skewX(-12)';
    // paint-order:stroke fill → stroke drawn first (behind), then fill covers inner half
    // SVG stroke-width doubled because only outer half is visible
    var outerSW = (opts.strokeWidth + strokeOffset) * 2;
    svgInner += '<path d="'+dAttr+'" fill="'+color+'" stroke="'+opts.strokeColor+'" stroke-width="'+_r(outerSW)+'" stroke-linejoin="round" paint-order="stroke fill" transform="'+transforms+'"/>';
  } else {
    // No stroke — simple fill path
    var fillStrokeAttr = '';
    if(opts.simulateBold) fillStrokeAttr = ' stroke="'+color+'" stroke-width="'+(fontSize*0.022).toFixed(1)+'" stroke-linejoin="round"';
    svgInner += '<path d="'+dAttr+'" fill="'+color+'"'+fillStrokeAttr+' transform="'+transforms+'"/>';
  }

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
    if(hasStroke){
      // Single path with paint-order: stroke painted first (behind), fill covers inner half
      var outerSW = (_strokeWidth + _strokeOffset) * 2;
      svgH += '<path d="'+dAttr+'" fill="'+color+'" stroke="'+_strokeColor+'" stroke-width="'+_r(outerSW)+'" stroke-linejoin="round" paint-order="stroke fill" transform="'+transforms+'"/>';
    } else {
      var simBoldA = simBold ? ' stroke="'+color+'" stroke-width="'+(fontSize*0.022).toFixed(1)+'" stroke-linejoin="round"' : '';
      svgH += '<path d="'+dAttr+'" fill="'+color+'"'+simBoldA+' transform="'+transforms+'"/>';
    }
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

/* ══════════════════════════════════════════════════════════════════════════
   RUGNUMMERS TAB — Jersey name + number generator
   ══════════════════════════════════════════════════════════════════════════ */

/* ── Tab switching ── */
function switchTab(tab){
  var tabs = document.querySelectorAll('.te-tab');
  var panes = document.querySelectorAll('.te-pane');
  tabs.forEach(function(t){ t.classList.toggle('te-tab-on', t.dataset.tab === tab); });
  panes.forEach(function(p){ p.classList.toggle('te-pane-on', p.id === 'tePane_'+tab); });
}

/* ── Jersey defaults ── */
var JD = {
  nameH: 30, numH: 80, gap: 5, // mm
  curved: false,
  strokeName: true, strokeNum: true,
};

function jToggleDefault(field){
  var cb = document.getElementById('jDef_'+field);
  var inp = document.getElementById('jVal_'+field);
  if(!cb || !inp) return;
  if(cb.checked){
    inp.value = field==='nameH'?30:field==='numH'?80:5;
    inp.disabled = true;
  } else {
    inp.disabled = false;
  }
  _jRefreshPreview();
}

function jToggleCurved(){
  JD.curved = !JD.curved;
  var btn = document.getElementById('jBtnCurved');
  if(btn) btn.classList.toggle('te-tog-on', JD.curved);
  _jRefreshPreview();
}

function jToggleStrokeName(){
  JD.strokeName = !JD.strokeName;
  var btn = document.getElementById('jBtnStrokeName');
  if(btn) btn.classList.toggle('te-tog-on', JD.strokeName);
  _jRefreshPreview();
}

function jToggleStrokeNum(){
  JD.strokeNum = !JD.strokeNum;
  var btn = document.getElementById('jBtnStrokeNum');
  if(btn) btn.classList.toggle('te-tog-on', JD.strokeNum);
  _jRefreshPreview();
}

/* ── Auto increment ── */
function jAutoNumber(){
  var nameEl = document.getElementById('jName');
  var numEl = document.getElementById('jNum');
  if(!numEl) return;
  var num = parseInt(numEl.value)||1;
  // If there's only one name, fill is simple
  var names = (nameEl?nameEl.value:'').split('\n').map(function(l){return l.trim();}).filter(Boolean);
  if(names.length <= 1){
    if(window.toast) window.toast('Voeg meerdere namen toe (één per regel) om door te nummeren','warn');
    return;
  }
  var nums = [];
  for(var i=0;i<names.length;i++) nums.push(String(num+i));
  numEl.value = nums.join('\n');
  if(window.toast) window.toast('Rugnummers '+num+' t/m '+(num+names.length-1)+' ingevuld','success');
  _jRefreshPreview();
}

/* ── Excel template download ── */
function jDownloadTemplate(){
  // Simple CSV template (Excel-compatible)
  var csv = 'NAAM,RUGNUMMER\nJansen,1\nDe Vries,2\nBakker,3\n';
  var blob = new Blob(['﻿'+csv], {type:'text/csv;charset=utf-8'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url; a.download = 'rugnummers-template.csv'; a.click();
  URL.revokeObjectURL(url);
}

/* ── Excel/CSV import for jersey ── */
function jImportExcel(){
  var inp = document.getElementById('jCsvInput');
  if(!inp||!inp.files||!inp.files[0]) return;
  var reader = new FileReader();
  reader.onload = function(ev){
    var lines = ev.target.result.split(/[\r\n]+/).map(function(l){return l.trim();}).filter(Boolean);
    var names = [], nums = [];
    // Skip header if it contains NAAM/RUGNUMMER
    var start = 0;
    if(lines.length && /naam|name|rugnummer|number/i.test(lines[0])) start = 1;
    for(var i=start;i<lines.length;i++){
      var parts = lines[i].split(/[,;\t]/);
      if(parts.length >= 2){
        names.push(parts[0].trim());
        nums.push(parts[1].trim());
      } else if(parts.length === 1){
        names.push(parts[0].trim());
      }
    }
    var ne = document.getElementById('jName');
    var nu = document.getElementById('jNum');
    if(ne) ne.value = names.join('\n');
    if(nu) nu.value = nums.join('\n');
    if(window.toast) window.toast(names.length+' spelers geïmporteerd','success');
    _jRefreshPreview();
  };
  reader.readAsText(inp.files[0]);
  inp.value = '';
}

/* ── Curved text: render name along an arc ── */
function _curvedTextSvg(text, font, heightMm, color, arcWidthMm, opts){
  // Render each glyph along a circular arc
  text = text.toUpperCase();
  if(!text.trim()) return null;
  var upm = font.unitsPerEm||1000;
  var refH;
  try{ var rp = font.getPath('xon',0,0,upm); var rb = rp.getBoundingBox(); refH = rb.y2-rb.y1; }catch(_){ refH=0; }
  if(refH<=0) refH=upm*0.5;
  var fontSize = (heightMm/refH)*upm;
  var scale = fontSize/(font.unitsPerEm||1000);
  var glyphs;
  try{ glyphs = font.stringToGlyphs(text); }catch(_){ return null; }
  if(!glyphs||!glyphs.length) return null;

  // Calculate total text width
  var totalAdv = 0;
  for(var i=0;i<glyphs.length;i++){
    totalAdv += (glyphs[i].advanceWidth||0)*scale;
    if(i<glyphs.length-1) try{ totalAdv += font.getKerningValue(glyphs[i],glyphs[i+1])*scale; }catch(_){}
  }
  totalAdv += (opts.spacing||0) * fontSize / 100 * (glyphs.length-1);

  // Arc parameters: chord = arcWidthMm (or text width * 1.2 if wider)
  var chord = Math.max(arcWidthMm||totalAdv*1.3, totalAdv*1.1);
  // Radius to create a gentle arc — larger = flatter
  var arcAngle = Math.min(totalAdv / chord * 2.5, Math.PI * 0.6); // max ~108 degrees
  var radius = chord / (2 * Math.sin(arcAngle/2));
  if(radius < chord * 0.6) radius = chord * 0.6;

  // Place each glyph along the arc
  var cx = chord/2;
  var cy = radius + heightMm;
  var startAngle = -Math.PI/2 - arcAngle/2;
  var currentArc = 0;
  var totalArcLen = radius * arcAngle;
  // Center text on arc
  var arcOffset = (totalArcLen - totalAdv) / 2;
  currentArc = arcOffset;

  var svgParts = '';
  var extraSp = (opts.spacing||0) * fontSize / 100;

  for(var gi=0;gi<glyphs.length;gi++){
    var g = glyphs[gi];
    var adv = (g.advanceWidth||0)*scale;
    var angle = startAngle + (currentArc + adv/2) / radius;
    var gx = cx + radius * Math.cos(angle);
    var gy = cy + radius * Math.sin(angle);
    var rotDeg = (angle + Math.PI/2) * 180/Math.PI;

    try{
      var p = g.getPath(0, 0, fontSize);
      var d = _pd(p);
      if(d){
        var gb = p.getBoundingBox();
        var gtx = -(gb.x1+gb.x2)/2;
        var gty = -gb.y1;
        svgParts += '<path d="'+d+'" fill="'+color+'"';
        if(opts.hasStroke && opts.strokeColor && opts.strokeColor!=='none' && opts.strokeWidth>0){
          var sw = (opts.strokeWidth + (opts.strokeOffset||0)) * 2;
          svgParts += ' stroke="'+opts.strokeColor+'" stroke-width="'+_r(sw)+'" stroke-linejoin="round" paint-order="stroke fill"';
        }
        svgParts += ' transform="translate('+_r(gx)+','+_r(gy)+') rotate('+_r(rotDeg)+') translate('+_r(gtx)+','+_r(gty)+')"/>';
      }
    }catch(_){}

    currentArc += adv + extraSp;
    if(gi<glyphs.length-1) try{ currentArc += font.getKerningValue(g,glyphs[gi+1])*scale; }catch(_){}
  }

  if(!svgParts) return null;
  var svgH = cy - radius + heightMm*0.2;
  var expand = (opts.hasStroke && opts.strokeWidth>0) ? opts.strokeWidth+(opts.strokeOffset||0) : 0;
  var vw = chord + expand*2;
  var vh = svgH + expand*2;
  return { svg:svgParts, w:vw, h:vh, offsetX:expand, offsetY:expand, chord:chord };
}

/* ── Jersey preview ── */
function _jRefreshPreview(){
  var el = document.getElementById('jPreview');
  if(!el) return;
  if(!_currentFont){ el.innerHTML='<span style="color:#9ca3af;font-size:.82rem">Kies een lettertype</span>'; return; }

  var nameEl = document.getElementById('jName');
  var numEl = document.getElementById('jNum');
  var name = ((nameEl?nameEl.value:'')||'').split('\n')[0] || 'JANSEN';
  var num = ((numEl?numEl.value:'')||'').split('\n')[0] || '10';
  name = name.toUpperCase();

  var ci = document.getElementById('teColor');
  var color = ci?ci.value:'#000000';

  var nameH = parseFloat(document.getElementById('jVal_nameH')?.value)||30;
  var numH = parseFloat(document.getElementById('jVal_numH')?.value)||80;
  var gap = parseFloat(document.getElementById('jVal_gap')?.value)||5;

  try{
    var font = _currentFont;
    var wt = _bold?'700':'400', st = _italic?'italic':'normal';
    var k = _currentName+'__'+wt+'_'+st;
    if(_loadedFonts[k]) font = _loadedFonts[k];

    // Scale for preview (fit in ~100px height)
    var totalH = nameH + gap + numH;
    var previewScale = 80 / totalH;
    var pNameH = nameH * previewScale;
    var pNumH = numH * previewScale;
    var pGap = gap * previewScale;

    // Render number
    var numResult = _previewPath(font, num, pNumH);
    if(!numResult){ el.innerHTML='<span style="color:#9ca3af">Geen preview</span>'; return; }

    var svgContent = '';
    var svgW = numResult.w + 10;
    var yOffset = 4;

    // Render name (curved or straight)
    if(JD.curved){
      var curved = _curvedTextSvg(name, font, pNameH, color, numResult.w, {
        spacing:_spacing, hasStroke:JD.strokeName, strokeColor:_strokeColor, strokeWidth:_strokeWidth*previewScale, strokeOffset:_strokeOffset*previewScale,
      });
      if(curved){
        var nameX = (svgW - curved.w)/2;
        svgContent += '<g transform="translate('+_r(nameX)+','+_r(yOffset)+')">' + curved.svg + '</g>';
        yOffset += curved.h + pGap;
        svgW = Math.max(svgW, curved.w + 10);
      }
    } else {
      var nameResult = _previewPath(font, name, pNameH);
      if(nameResult){
        var nameStroke = '';
        if(JD.strokeName && _strokeColor && _strokeColor!=='none' && _strokeWidth>0){
          var nsw = (_strokeWidth + _strokeOffset) * previewScale * 2;
          nameStroke = ' stroke="'+_strokeColor+'" stroke-width="'+_r(nsw)+'" stroke-linejoin="round" paint-order="stroke fill"';
        }
        var nameX2 = (svgW - nameResult.w)/2;
        svgContent += '<path d="'+nameResult.d+'" fill="'+color+'"'+nameStroke+' transform="translate('+_r(nameX2+(-nameResult.bb.x1))+','+_r(yOffset+(-nameResult.bb.y1))+')"/>';
        yOffset += nameResult.h + pGap;
        svgW = Math.max(svgW, nameResult.w + 10);
      }
    }

    // Number
    var numStroke = '';
    if(JD.strokeNum && _strokeColor && _strokeColor!=='none' && _strokeWidth>0){
      var nsw2 = (_strokeWidth + _strokeOffset) * previewScale * 2;
      numStroke = ' stroke="'+_strokeColor+'" stroke-width="'+_r(nsw2)+'" stroke-linejoin="round" paint-order="stroke fill"';
    }
    var numX = (svgW - numResult.w)/2;
    svgContent += '<path d="'+numResult.d+'" fill="'+color+'"'+numStroke+' transform="translate('+_r(numX+(-numResult.bb.x1))+','+_r(yOffset+(-numResult.bb.y1))+')"/>';
    yOffset += numResult.h + 4;

    // Auto dark background
    if(_isLightColor(color)) el.style.cssText = 'background:#1a1a1a;border-radius:6px;padding:4px';
    else el.style.cssText = '';

    el.innerHTML = '<svg viewBox="0 0 '+_r(svgW)+' '+_r(yOffset)+'" style="max-width:100%;max-height:120px;display:block;margin:0 auto" xmlns="http://www.w3.org/2000/svg">'+svgContent+'</svg>';
  }catch(e){
    el.innerHTML = '<span style="color:#ef4444;font-size:.82rem">Preview fout: '+_esc(e.message||'')+'</span>';
  }
}

function _previewPath(font, text, h){
  var upm = font.unitsPerEm||1000;
  var refH; try{ var rp=font.getPath('xon',0,0,upm);var rb=rp.getBoundingBox();refH=rb.y2-rb.y1;}catch(_){refH=0;}
  if(refH<=0)refH=upm*0.5;
  var fontSize=(h/refH)*upm;
  var extraSp = _spacing*fontSize/100;
  var dAttr,bb;
  try{
    if(Math.abs(extraSp)>0.01){ var r=_renderGlyphs(font,text,0,fontSize,extraSp); if(!r)return null; dAttr=r.d;bb=r.bb; }
    else{ var p=font.getPath(text,0,0,fontSize);bb=p.getBoundingBox();dAttr=_pd(p); }
  }catch(_){
    try{var r2=_renderGlyphs(font,text,0,fontSize,extraSp);if(!r2)return null;dAttr=r2.d;bb=r2.bb;}catch(_2){return null;}
  }
  if(!dAttr||dAttr.length<2)return null;
  var w=bb.x2-bb.x1,hh=bb.y2-bb.y1;
  if(w<=0||hh<=0)return null;
  return {d:dAttr,bb:bb,w:w,h:hh,fontSize:fontSize};
}

/* ── Add jerseys to canvas ── */
async function addJerseys(){
  if(!_currentFont){ if(window.toast) window.toast('Kies eerst een lettertype','warn'); return; }
  var nameEl = document.getElementById('jName');
  var numEl = document.getElementById('jNum');
  var namesRaw = (nameEl?nameEl.value:'').trim();
  var numsRaw = (numEl?numEl.value:'').trim();
  if(!namesRaw && !numsRaw){ if(window.toast) window.toast('Voer namen of nummers in','warn'); return; }

  var names = namesRaw.split('\n').map(function(l){return l.trim();});
  var nums = numsRaw.split('\n').map(function(l){return l.trim();});
  var count = Math.max(names.length, nums.length);

  var ci = document.getElementById('teColor');
  var color = ci?ci.value:'#000000';
  var nameH = parseFloat(document.getElementById('jVal_nameH')?.value)||30;
  var numH = parseFloat(document.getElementById('jVal_numH')?.value)||80;
  var gap = parseFloat(document.getElementById('jVal_gap')?.value)||5;

  var font;
  try{font=await _getStyledFont();}catch(_){font=_currentFont;}
  if(!font) font=_currentFont;
  var simBold=_needsSimBold(), simItalic=_needsSimItalic();

  var added = 0;
  for(var i=0;i<count;i++){
    var name = (names[i]||'').toUpperCase();
    var num = nums[i]||'';
    if(!name && !num) continue;

    // Build combined SVG: name on top, number below
    var parts = [];
    var totalW = 0, totalH = 0;

    // Number SVG (rendered first to know width for curved name)
    var numSvg = null;
    if(num){
      numSvg = _textToSvg(num, font, numH, color, {
        bold:_bold, italic:_italic, underline:false, allCaps:false,
        spacing:_spacing, simulateBold:simBold, simulateItalic:simItalic,
        strokeColor: JD.strokeNum?_strokeColor:'none', strokeWidth:JD.strokeNum?_strokeWidth:0, strokeOffset:JD.strokeNum?_strokeOffset:0,
      });
      if(numSvg) totalW = Math.max(totalW, numSvg.mmW);
    }

    // Name SVG
    var nameSvgData = null;
    if(name){
      if(JD.curved && numSvg){
        // Curved name above number
        nameSvgData = _curvedTextSvg(name, font, nameH, color, numSvg.mmW, {
          spacing:_spacing, hasStroke:JD.strokeName, strokeColor:_strokeColor, strokeWidth:_strokeWidth, strokeOffset:_strokeOffset,
        });
        if(nameSvgData){
          totalW = Math.max(totalW, nameSvgData.w);
          totalH += nameSvgData.h + gap;
        }
      } else {
        nameSvgData = _textToSvg(name, font, nameH, color, {
          bold:_bold, italic:_italic, underline:false, allCaps:true,
          spacing:_spacing, simulateBold:simBold, simulateItalic:simItalic,
          strokeColor: JD.strokeName?_strokeColor:'none', strokeWidth:JD.strokeName?_strokeWidth:0, strokeOffset:JD.strokeName?_strokeOffset:0,
        });
        if(nameSvgData){
          totalW = Math.max(totalW, nameSvgData.mmW);
          totalH += nameSvgData.mmH + gap;
        }
      }
    }
    if(numSvg) totalH += numSvg.mmH;

    // Combine into single SVG
    var combinedParts = '';
    var yOff = 0;
    if(name && nameSvgData){
      if(JD.curved && nameSvgData.svg){
        // Curved: raw SVG parts, center horizontally
        var cx = (totalW - nameSvgData.w)/2 + nameSvgData.offsetX;
        combinedParts += '<g transform="translate('+_r(cx)+','+_r(yOff + nameSvgData.offsetY)+')">' + nameSvgData.svg + '</g>';
        yOff += nameSvgData.h + gap;
      } else if(nameSvgData.svg){
        // Straight: embed as sub-SVG
        var nx = (totalW - nameSvgData.mmW)/2;
        combinedParts += '<svg x="'+_r(nx)+'" y="'+_r(yOff)+'" width="'+_r(nameSvgData.mmW)+'" height="'+_r(nameSvgData.mmH)+'" viewBox="0 0 '+_r(nameSvgData.mmW)+' '+_r(nameSvgData.mmH)+'">';
        // Extract inner SVG content
        var innerMatch = nameSvgData.svg.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
        if(innerMatch) combinedParts += innerMatch[1];
        combinedParts += '</svg>';
        yOff += nameSvgData.mmH + gap;
      }
    }
    if(numSvg){
      var numX = (totalW - numSvg.mmW)/2;
      combinedParts += '<svg x="'+_r(numX)+'" y="'+_r(yOff)+'" width="'+_r(numSvg.mmW)+'" height="'+_r(numSvg.mmH)+'" viewBox="0 0 '+_r(numSvg.mmW)+' '+_r(numSvg.mmH)+'">';
      var innerNum = numSvg.svg.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
      if(innerNum) combinedParts += innerNum[1];
      combinedParts += '</svg>';
    }

    if(!combinedParts) continue;
    var finalSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="'+_r(totalW)+'mm" height="'+_r(totalH)+'mm" viewBox="0 0 '+_r(totalW)+' '+_r(totalH)+'" data-gsb-font="'+_esc(_currentName)+'">' + combinedParts + '</svg>';
    var label = (name && num) ? name+' #'+num : name||'#'+num;
    if(window.loadSvg){ window.loadSvg(finalSvg, label); added++; }
  }

  if(added > 0){
    if(window.toast) window.toast(added+' rugnummer'+(added>1?'s':'')+' toegevoegd','success');
    close();
  } else {
    if(window.toast) window.toast('Geen rugnummers gegenereerd — controleer invoer','warn');
  }
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
  // Tabs
  switchTab:switchTab,
  // Jersey
  jToggleDefault:jToggleDefault,
  jToggleCurved:jToggleCurved,
  jToggleStrokeName:jToggleStrokeName,
  jToggleStrokeNum:jToggleStrokeNum,
  jAutoNumber:jAutoNumber,
  jDownloadTemplate:jDownloadTemplate,
  jImportExcel:jImportExcel,
  addJerseys:addJerseys,
  jPreview:_jRefreshPreview,
};

})();
