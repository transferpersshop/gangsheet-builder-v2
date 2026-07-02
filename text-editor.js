/* ================================================================
   text-editor.js — Tekst-naar-SVG creator voor Gang Sheet Builder
   v2.10.0 — transparent gap mask, curved spacing, XLSX, checkbox options
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
// Jersey rows
var _jerseyRows = [{name:'', num:''}];

/* ══════════ Modal ══════════ */
function open(){
  var m = document.getElementById('textEditorModal');
  if(!m) return;
  m.classList.add('open');
  if(!_previewCssOk) _loadPreviewCss();
  _renderFontList();
  _showUsedFonts();
  _jRenderRows();
  // Ensure correct preview is visible for current tab
  var activeTab = 'tekst';
  var activeBtn = document.querySelector('.te-tab.te-tab-on');
  if(activeBtn && activeBtn.dataset.tab) activeTab = activeBtn.dataset.tab;
  _togglePreviewPane(activeTab);
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
    _refreshAll();
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
    _refreshAll(); _renderFontList();
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
function _refreshAll(){
  _refreshPreview();
  _jRefreshPreview();
}
function toggleBold(){
  _bold = !_bold;
  _syncToggleUI(); _refreshAll();
}
function toggleItalic(){
  _italic = !_italic;
  _syncToggleUI(); _refreshAll();
}
function toggleUnderline(){
  _underline = !_underline;
  _syncToggleUI(); _refreshAll();
}
function toggleAllCaps(){
  _allCaps = !_allCaps;
  _syncToggleUI(); _refreshAll();
}
function onSpacingChange(){
  var sl = document.getElementById('teSpacing');
  var lbl = document.getElementById('teSpacingVal');
  _spacing = parseFloat(sl?sl.value:0)||0;
  if(lbl) lbl.textContent = _spacing > 0 ? '+'+_spacing : _spacing;
  _refreshAll();
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
  _refreshAll();
}
function syncStroke(){
  var si = document.getElementById('teStrokeColor');
  var sw = document.getElementById('teStrokeWidth');
  var so = document.getElementById('teStrokeOffset');
  _strokeColor = si?si.value:'none';
  _strokeWidth = parseFloat(sw?sw.value:0)||0;
  _strokeOffset = parseFloat(so?so.value:0)||0;
  _refreshAll();
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

/* ══════════ 3-layer stroke helper ══════════ */
/* Layer 1: full stroke ring in strokeColor (extends sw+offset outward)
   Layer 2: white gap ring (covers inner offset zone with white — correct for DTF white film)
   Layer 3: fill on top
   Result: fill → white gap → stroke ring */
function _strokeSvg(dAttr, fillColor, strokeColor, sw, offset, transforms, simBoldAttr){
  var out = '';
  if(offset > 0){
    var totalSW = (sw + offset) * 2;
    // Layer 1: full stroke ring
    out += '<path d="'+dAttr+'" fill="none" stroke="'+strokeColor+'" stroke-width="'+_r(totalSW)+'" stroke-linejoin="round" stroke-linecap="round" transform="'+transforms+'"/>';
    // Layer 2: white gap ring (covers inner offset area)
    out += '<path d="'+dAttr+'" fill="none" stroke="white" stroke-width="'+_r(offset*2)+'" stroke-linejoin="round" stroke-linecap="round" transform="'+transforms+'"/>';
  } else {
    // No gap — simple stroke ring
    out += '<path d="'+dAttr+'" fill="none" stroke="'+strokeColor+'" stroke-width="'+_r(sw*2)+'" stroke-linejoin="round" stroke-linecap="round" transform="'+transforms+'"/>';
  }
  // Layer 3: fill on top
  out += '<path d="'+dAttr+'" fill="'+fillColor+'"'+(simBoldAttr||'')+' stroke="none" transform="'+transforms+'"/>';
  return out;
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

  // ── Build SVG paths ──
  var svgInner = '';
  var hasStroke = opts.strokeColor && opts.strokeColor !== 'none' && opts.strokeWidth > 0;
  var strokeOffset = opts.strokeOffset || 0;

  if(hasStroke){
    // Expand viewBox for outward stroke + offset + safety margin
    var expand = opts.strokeWidth + strokeOffset + 8;
    tx += expand; ty += expand;
    w += expand * 2; h += expand * 2;
    transforms = 'translate('+_r(tx)+','+_r(ty)+')';
    if(opts.simulateItalic) transforms += ' skewX(-12)';
    // 3-layer stroke: no paint-order needed
    svgInner += _strokeSvg(dAttr, color, opts.strokeColor, opts.strokeWidth, strokeOffset, transforms, '');
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
  var lum = 0.2126*r + 0.7152*g + 0.0722*b;
  return lum > 0.65;
}

/* ══════════ Preview (Tekst tab) ══════════ */
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
    var fontSize = (40/refH)*upm;
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

    // For preview: keep viewBox at text size, use overflow:visible for stroke
    // This prevents the preview from shrinking when stroke gets bigger
    if(hasStroke){
      var expand = _strokeWidth + _strokeOffset + 8;
      tx += expand; ty += expand;
      // Add expand to viewBox but only enough for padding, not full stroke
      vw += expand*2; vh += expand*2;
      transforms = 'translate('+_r(tx)+','+_r(ty)+')';
      if(simItalic) transforms += ' skewX(-12)';
    }

    // Auto dark background for light text colors
    var bgStyle = '';
    if(_isLightColor(color)){
      bgStyle = 'background:#1a1a1a;border-radius:6px;padding:4px';
    }
    el.style.cssText = bgStyle ? bgStyle : '';

    var svgH = '<svg viewBox="0 0 '+_r(vw)+' '+_r(vh)+'" style="max-width:100%;max-height:180px;display:block;margin:0 auto;overflow:visible" xmlns="http://www.w3.org/2000/svg">';
    if(hasStroke){
      svgH += _strokeSvg(dAttr, color, _strokeColor, _strokeWidth, _strokeOffset, transforms, '');
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
  _togglePreviewPane(tab);
}
function _togglePreviewPane(tab){
  var tePrev = document.getElementById('tePreviewWrap');
  var jPrev = document.getElementById('jPreviewWrap');
  if(tePrev) tePrev.style.display = tab==='tekst' ? '' : 'none';
  if(jPrev) jPrev.style.display = tab==='rugnummers' ? '' : 'none';
}

/* ── Jersey defaults ── */
var JD = {
  nameH: 50, numH: 230, gap: 50, // mm — KNVB industry standard
  curved: false,
  strokeName: true, strokeNum: true,
};

function jToggleDefault(field){
  var cb = document.getElementById('jDef_'+field);
  var inp = document.getElementById('jVal_'+field);
  if(!cb || !inp) return;
  if(cb.checked){
    inp.value = field==='nameH'?50:field==='numH'?230:50;
    inp.disabled = true;
  } else {
    inp.disabled = false;
  }
  _jRefreshPreview();
}

function jToggleCurved(){
  var chk = document.getElementById('jChkCurved');
  JD.curved = chk ? chk.checked : !JD.curved;
  _jRefreshPreview();
}

function jToggleStrokeName(){
  var chk = document.getElementById('jChkStrokeName');
  JD.strokeName = chk ? chk.checked : !JD.strokeName;
  _jRefreshPreview();
}

function jToggleStrokeNum(){
  var chk = document.getElementById('jChkStrokeNum');
  JD.strokeNum = chk ? chk.checked : !JD.strokeNum;
  _jRefreshPreview();
}

/* ══════════ Jersey row management ══════════ */
function _jRenderRows(){
  var el = document.getElementById('jRowsContainer');
  if(!el) return;
  var h = '';
  for(var i = 0; i < _jerseyRows.length; i++){
    var row = _jerseyRows[i];
    h += '<div class="j-row">'
       + '<input type="text" class="te-input" placeholder="Naam" value="'+_esc(row.name)+'" oninput="gsbTextEditor.jOnRowInput('+i+',\'name\',this.value)">'
       + '<input type="text" class="te-input j-row-num" placeholder="Nr." value="'+_esc(row.num)+'" oninput="gsbTextEditor.jOnRowInput('+i+',\'num\',this.value)">'
       + '<button class="j-row-del" onclick="gsbTextEditor.jRemoveRow('+i+')" title="Verwijder">'
       + '<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
       + '</button>'
       + '</div>';
  }
  el.innerHTML = h;
}

function jAddRow(){
  _jerseyRows.push({name:'', num:''});
  _jRenderRows();
  // Focus the new name input
  var el = document.getElementById('jRowsContainer');
  if(el){
    var inputs = el.querySelectorAll('.j-row:last-child input');
    if(inputs.length) inputs[0].focus();
  }
}

function jRemoveRow(idx){
  if(_jerseyRows.length <= 1){
    // Keep at least one row, just clear it
    _jerseyRows[0] = {name:'', num:''};
  } else {
    _jerseyRows.splice(idx, 1);
  }
  _jRenderRows();
  _jRefreshPreview();
}

function jOnRowInput(idx, field, value){
  if(idx >= 0 && idx < _jerseyRows.length){
    _jerseyRows[idx][field] = value;
  }
  _jRefreshPreview();
}

/* ── Auto increment ── */
function jAutoNumber(){
  var filledRows = _jerseyRows.filter(function(r){ return r.name.trim(); });
  if(filledRows.length <= 1){
    if(window.toast) window.toast('Voeg meerdere namen toe om door te nummeren','warn');
    return;
  }
  // Find starting number from first filled row that has a number, or default to 1
  var startNum = 1;
  for(var i = 0; i < _jerseyRows.length; i++){
    if(_jerseyRows[i].num.trim()){
      var parsed = parseInt(_jerseyRows[i].num);
      if(!isNaN(parsed)){ startNum = parsed; break; }
    }
  }
  var counter = startNum;
  for(var j = 0; j < _jerseyRows.length; j++){
    if(_jerseyRows[j].name.trim()){
      _jerseyRows[j].num = String(counter);
      counter++;
    }
  }
  _jRenderRows();
  if(window.toast) window.toast('Rugnummers '+startNum+' t/m '+(counter-1)+' ingevuld','success');
  _jRefreshPreview();
}

/* ── Excel template download (XLSX) ── */
function jDownloadTemplate(){
  if(typeof XLSX !== 'undefined'){
    var data = [['NAAM','RUGNUMMER'],['Jansen','1'],['De Vries','2'],['Bakker','3']];
    var ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [{wch:20},{wch:14}];
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Rugnummers');
    XLSX.writeFile(wb, 'rugnummers-template.xlsx');
  } else {
    // Fallback to CSV if SheetJS not loaded
    var csv = 'NAAM,RUGNUMMER\nJansen,1\nDe Vries,2\nBakker,3\n';
    var blob = new Blob(['﻿'+csv], {type:'text/csv;charset=utf-8'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = 'rugnummers-template.csv'; a.click();
    URL.revokeObjectURL(url);
  }
}

/* ── Excel/CSV import for jersey ── */
function jImportExcel(){
  var inp = document.getElementById('jCsvInput');
  if(!inp||!inp.files||!inp.files[0]) return;
  var file = inp.files[0];
  var isExcel = /\.xlsx?$/i.test(file.name);

  if(isExcel && typeof XLSX !== 'undefined'){
    // Parse XLSX with SheetJS
    var reader = new FileReader();
    reader.onload = function(ev){
      try{
        var wb = XLSX.read(ev.target.result, {type:'array'});
        var ws = wb.Sheets[wb.SheetNames[0]];
        var rows = XLSX.utils.sheet_to_json(ws, {header:1, defval:''});
        var start = 0;
        if(rows.length && /naam|name|rugnummer|number/i.test(String(rows[0][0]||'')+String(rows[0][1]||''))) start = 1;
        var newRows = [];
        for(var i=start;i<rows.length;i++){
          var r = rows[i];
          if(!r || (!String(r[0]||'').trim() && !String(r[1]||'').trim())) continue;
          newRows.push({name:String(r[0]||'').trim(), num:String(r[1]||'').trim()});
        }
        if(newRows.length){
          _jerseyRows = newRows;
          _jRenderRows();
          if(window.toast) window.toast(newRows.length+' spelers geïmporteerd','success');
          _jRefreshPreview();
        } else {
          if(window.toast) window.toast('Geen spelers gevonden in bestand','warn');
        }
      }catch(e){
        console.error('[TE] XLSX parse error:', e);
        if(window.toast) window.toast('Fout bij lezen Excel bestand','error');
      }
    };
    reader.readAsArrayBuffer(file);
  } else {
    // CSV/TXT fallback
    var reader2 = new FileReader();
    reader2.onload = function(ev){
      var lines = ev.target.result.split(/[\r\n]+/).map(function(l){return l.trim();}).filter(Boolean);
      var start = 0;
      if(lines.length && /naam|name|rugnummer|number/i.test(lines[0])) start = 1;
      var newRows = [];
      for(var i=start;i<lines.length;i++){
        var parts = lines[i].split(/[,;\t]/);
        if(parts.length >= 2){
          newRows.push({name:parts[0].trim(), num:parts[1].trim()});
        } else if(parts.length === 1){
          newRows.push({name:parts[0].trim(), num:''});
        }
      }
      if(newRows.length){
        _jerseyRows = newRows;
        _jRenderRows();
        if(window.toast) window.toast(newRows.length+' spelers geïmporteerd','success');
        _jRefreshPreview();
      }
    };
    reader2.readAsText(file);
  }
  inp.value = '';
}

/* ── Curved text: render name along an arc ── */
function _curvedTextSvg(text, font, heightMm, color, arcWidthMm, opts){
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

  // Total text advance width
  var totalAdv = 0;
  for(var i=0;i<glyphs.length;i++){
    totalAdv += (glyphs[i].advanceWidth||0)*scale;
    if(i<glyphs.length-1) try{ totalAdv += font.getKerningValue(glyphs[i],glyphs[i+1])*scale; }catch(_){}
  }
  var extraSp = (opts.spacing||0) * fontSize / 100;
  totalAdv += extraSp * (glyphs.length-1);

  // Arc: gentle curve — chord matches target width, radius gives subtle bend
  var chord = Math.max(arcWidthMm||totalAdv*1.4, totalAdv*1.05);
  var arcAngle = 0.7; // radians, ~40 degrees
  var radius = chord / (2 * Math.sin(arcAngle/2));

  var margin = heightMm * 0.3;
  var arcRise = radius - radius * Math.cos(arcAngle/2);
  var cx = chord/2 + margin;
  var cy = margin + arcRise + heightMm + radius;
  var startAngle = -Math.PI/2 - arcAngle/2;
  var totalArcLen = radius * arcAngle;
  var arcOff = (totalArcLen - totalAdv) / 2;
  var curArc = arcOff;

  var svgParts = '';
  var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  var cHasStroke = opts.hasStroke && opts.strokeColor && opts.strokeColor!=='none' && opts.strokeWidth>0;
  var cOffset = opts.strokeOffset||0;

  for(var gi=0;gi<glyphs.length;gi++){
    var g = glyphs[gi];
    var adv = (g.advanceWidth||0)*scale;
    var angle = startAngle + (curArc + adv/2) / radius;
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
        var gTransform = 'translate('+_r(gx)+','+_r(gy)+') rotate('+_r(rotDeg)+') translate('+_r(gtx)+','+_r(gty)+')';
        if(cHasStroke){
          // 3-layer stroke per glyph
          svgParts += _strokeSvg(d, color, opts.strokeColor, opts.strokeWidth, cOffset, gTransform, '');
        } else {
          svgParts += '<path d="'+d+'" fill="'+color+'" transform="'+gTransform+'"/>';
        }
        // Approximate bounds
        minX = Math.min(minX, gx - heightMm); maxX = Math.max(maxX, gx + heightMm);
        minY = Math.min(minY, gy - heightMm*1.2); maxY = Math.max(maxY, gy + heightMm*0.3);
      }
    }catch(_){}

    curArc += adv + extraSp;
    if(gi<glyphs.length-1) try{ curArc += font.getKerningValue(g,glyphs[gi+1])*scale; }catch(_){}
  }

  if(!svgParts) return null;
  var expand = cHasStroke ? opts.strokeWidth+cOffset+8 : 2;
  minX -= expand; minY -= expand; maxX += expand; maxY += expand;
  var vw = maxX - minX;
  var vh = maxY - minY;
  var shifted = '<g transform="translate('+_r(-minX)+','+_r(-minY)+')">' + svgParts + '</g>';
  return { svg:shifted, w:vw, h:vh, offsetX:0, offsetY:0, chord:chord };
}

/* ── Jersey preview (Rugnummers tab) ── */
function _jRefreshPreview(){
  var el = document.getElementById('jPreview');
  if(!el) return;
  if(!_currentFont){ el.innerHTML='<span style="color:#9ca3af;font-size:.82rem">Kies een lettertype</span>'; return; }

  // Read from rows
  var name = (_jerseyRows[0] && _jerseyRows[0].name) || '';
  var num = (_jerseyRows[0] && _jerseyRows[0].num) || '';
  if(!name) name = 'JANSEN';
  if(!num) num = '10';
  name = name.toUpperCase();

  var ci = document.getElementById('teColor');
  var color = ci?ci.value:'#000000';
  var nameH = parseFloat(document.getElementById('jVal_nameH')?.value)||30;
  var numH = parseFloat(document.getElementById('jVal_numH')?.value)||80;
  var gap = parseFloat(document.getElementById('jVal_gap')?.value)||5;

  // When curved: the arc rises above baseline, reducing visual gap to number.
  // Auto-increase gap to compensate for arc rise (~60% of nameH).
  if(JD.curved) gap += nameH * 0.6;

  try{
    var font = _currentFont;
    var wt = _bold?'700':'400', st = _italic?'italic':'normal';
    var k = _currentName+'__'+wt+'_'+st;
    if(_loadedFonts[k]) font = _loadedFonts[k];

    // Scale for preview (fit in ~140px rendered height)
    var totalH = nameH + gap + numH;
    var previewScale = 120 / totalH;
    var pNameH = nameH * previewScale;
    var pNumH = numH * previewScale;
    var pGap = gap * previewScale;

    var numResult = _previewPath(font, num, pNumH);
    if(!numResult){ el.innerHTML='<span style="color:#9ca3af">Geen preview</span>'; return; }
    var nameResult = !JD.curved ? _previewPath(font, name, pNameH) : null;

    var strokeExpand = (_strokeColor && _strokeColor!=='none' && _strokeWidth>0) ? (_strokeWidth + _strokeOffset)*previewScale + 4 : 0;
    var svgW = numResult.w + (JD.strokeNum?strokeExpand*2:0) + 10;
    if(nameResult) svgW = Math.max(svgW, nameResult.w + (JD.strokeName?strokeExpand*2:0) + 10);

    // Pre-compute curved text so we know final svgW before positioning
    var curved = null;
    if(JD.curved){
      curved = _curvedTextSvg(name, font, pNameH, color, numResult.w, {
        spacing:_spacing, hasStroke:JD.strokeName, strokeColor:_strokeColor, strokeWidth:_strokeWidth*previewScale, strokeOffset:_strokeOffset*previewScale,
      });
      if(curved) svgW = Math.max(svgW, curved.w + 10);
    }

    var svgContent = '';
    var yOffset = 4;

    // Render name (curved or straight)
    if(JD.curved){
      if(curved){
        var nameX = (svgW - curved.w)/2;
        svgContent += '<g transform="translate('+_r(nameX)+','+_r(yOffset)+')">' + curved.svg + '</g>';
        yOffset += curved.h + pGap;
      }
    } else {
      if(nameResult){
        var nameHasStroke = JD.strokeName && _strokeColor && _strokeColor!=='none' && _strokeWidth>0;
        var nameExpand = nameHasStroke ? (_strokeWidth + _strokeOffset) * previewScale + 4 : 0;
        var nameX2 = (svgW - nameResult.w)/2;
        var nTx = nameX2+(-nameResult.bb.x1) + nameExpand;
        var nTy = yOffset+(-nameResult.bb.y1) + nameExpand;
        var nTransform = 'translate('+_r(nTx)+','+_r(nTy)+')';
        if(nameHasStroke){
          svgContent += _strokeSvg(nameResult.d, color, _strokeColor, _strokeWidth*previewScale, _strokeOffset*previewScale, nTransform, '');
        } else {
          svgContent += '<path d="'+nameResult.d+'" fill="'+color+'" transform="'+nTransform+'"/>';
        }
        yOffset += nameResult.h + nameExpand*2 + pGap;
        svgW = Math.max(svgW, nameResult.w + nameExpand*2 + 10);
      }
    }

    // Number
    var numHasStroke = JD.strokeNum && _strokeColor && _strokeColor!=='none' && _strokeWidth>0;
    var numExpand = numHasStroke ? (_strokeWidth + _strokeOffset) * previewScale + 4 : 0;
    var numX = (svgW - numResult.w)/2;
    var nuTx = numX+(-numResult.bb.x1) + numExpand;
    var nuTy = yOffset+(-numResult.bb.y1) + numExpand;
    var nuTransform = 'translate('+_r(nuTx)+','+_r(nuTy)+')';
    if(numHasStroke){
      svgContent += _strokeSvg(numResult.d, color, _strokeColor, _strokeWidth*previewScale, _strokeOffset*previewScale, nuTransform, '');
    } else {
      svgContent += '<path d="'+numResult.d+'" fill="'+color+'" transform="'+nuTransform+'"/>';
    }
    yOffset += numResult.h + numExpand*2 + 4;

    // Auto dark background
    if(_isLightColor(color)) el.style.cssText = 'background:#1a1a1a;border-radius:6px;padding:4px';
    else el.style.cssText = '';

    el.innerHTML = '<svg viewBox="0 0 '+_r(svgW)+' '+_r(yOffset)+'" style="max-width:100%;max-height:280px;display:block;margin:0 auto;overflow:visible" xmlns="http://www.w3.org/2000/svg">'+svgContent+'</svg>';
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

  // Read from rows
  var players = _jerseyRows.filter(function(r){ return r.name.trim() || r.num.trim(); });
  if(!players.length){ if(window.toast) window.toast('Voer namen of nummers in','warn'); return; }

  var ci = document.getElementById('teColor');
  var color = ci?ci.value:'#000000';
  var nameH = parseFloat(document.getElementById('jVal_nameH')?.value)||30;
  var numH = parseFloat(document.getElementById('jVal_numH')?.value)||80;
  var gap = parseFloat(document.getElementById('jVal_gap')?.value)||5;

  // When curved: auto-increase gap to compensate for arc rise
  if(JD.curved) gap += nameH * 0.6;

  var font;
  try{font=await _getStyledFont();}catch(_){font=_currentFont;}
  if(!font) font=_currentFont;
  var simBold=_needsSimBold(), simItalic=_needsSimItalic();

  var added = 0;
  for(var i=0;i<players.length;i++){
    var name = (players[i].name||'').toUpperCase();
    var num = players[i].num||'';
    if(!name && !num) continue;

    var parts = [];
    var totalW = 0, totalH = 0;

    // Number SVG
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
        var cx2 = (totalW - nameSvgData.w)/2 + nameSvgData.offsetX;
        combinedParts += '<g transform="translate('+_r(cx2)+','+_r(yOff + nameSvgData.offsetY)+')">' + nameSvgData.svg + '</g>';
        yOff += nameSvgData.h + gap;
      } else if(nameSvgData.svg){
        var nx = (totalW - nameSvgData.mmW)/2;
        combinedParts += '<svg x="'+_r(nx)+'" y="'+_r(yOff)+'" width="'+_r(nameSvgData.mmW)+'" height="'+_r(nameSvgData.mmH)+'" viewBox="0 0 '+_r(nameSvgData.mmW)+' '+_r(nameSvgData.mmH)+'">';
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
  jAddRow:jAddRow,
  jRemoveRow:jRemoveRow,
  jOnRowInput:jOnRowInput,
  jAutoNumber:jAutoNumber,
  jDownloadTemplate:jDownloadTemplate,
  jImportExcel:jImportExcel,
  addJerseys:addJerseys,
  jPreview:_jRefreshPreview,
};

})();
