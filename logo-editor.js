/* ================================================================
   logo-editor.js — Per-logo bewerkingsmodal voor Gang Sheet Builder
   v2.17.0 — high-res vector preview, raster outline export, TPS styling
   ================================================================ */
(function(){
'use strict';

/* ── State ── */
var _fabricObj = null;
var _origImg   = null;        // only used for raster mode
var _workCanvas = null;
var _workCtx   = null;
var _previewEl = null;
var _activeTool = '';
var _modified  = false;
var _origCanvasW = 0;
var _origCanvasH = 0;
var _liveTimer = null;
var _isRaster  = false;
var _isVector  = false;

// Color replace state
var _pickMode   = false;
var _pickedRGB  = null;

// Loupe
var _loupeCanvas = null;
var _loupeCtx = null;

// Vector undo state — saved at open(), restored on cancel
var _vectorOrigState = null;   // { children: [{fill,stroke,strokeWidth,paintOrder},...], svgSource: string }

// Outline state — for "replace not stack"
var _preOutlineCanvas = null;  // snapshot before first outline (both vector & raster)
var _hasOutline = false;
var _outlineWidth = 0;         // saved slider value
var _outlineColor = '#FFFFFF'; // saved outline color
var _vectorMult = 3;           // multiplier used for vector→canvas rendering

/* ══════════ helpers ══════════ */
function _hex(n){ return n.toString(16).padStart(2,'0'); }
function _hexFromRgb(r,g,b){ return '#'+_hex(r)+_hex(g)+_hex(b); }

// Approximate RGB→CMYK (no ICC, formula-based)
function _rgbToCmyk(r,g,b){
  if(typeof rgbToCmyk === 'function') return rgbToCmyk(r,g,b);
  var r1=r/255, g1=g/255, b1=b/255;
  var k=1-Math.max(r1,g1,b1);
  if(k>=1) return {c:0,m:0,y:0,k:100};
  return { c:Math.round(((1-r1-k)/(1-k))*100), m:Math.round(((1-g1-k)/(1-k))*100),
           y:Math.round(((1-b1-k)/(1-k))*100), k:Math.round(k*100) };
}

/* ══════════ Open / Close ══════════ */
function open(fabricObj){
  if(!fabricObj) return;
  _fabricObj = fabricObj;
  _activeTool = '';
  _modified = false;
  _pickMode = false;
  _pickedRGB = null;
  _preOutlineCanvas = null;
  _hasOutline = false;
  _outlineWidth = 0;
  _outlineColor = '#FFFFFF';
  _vectorMult = 3;

  // Detect vector vs raster
  _isVector = (fabricObj.type === 'group' && !!fabricObj._objects);
  _isRaster = !_isVector;

  if(_isVector){
    // ── Vector path ──
    // Save original state for cancel/undo
    _vectorOrigState = _saveVectorState(fabricObj);

    // Create preview canvas from group rendering at high resolution
    var displayW = fabricObj.width * (fabricObj.scaleX || 1);
    _vectorMult = Math.max(3, Math.ceil(2000 / Math.max(displayW, 1)));
    var vecCanvas = fabricObj.toCanvasElement(_vectorMult);
    var trimmed = _trimCanvas(vecCanvas);
    _origCanvasW = trimmed.width;
    _origCanvasH = trimmed.height;

    _workCanvas = document.createElement('canvas');
    _workCanvas.width = trimmed.width;
    _workCanvas.height = trimmed.height;
    _workCtx = _workCanvas.getContext('2d');
    _workCtx.drawImage(trimmed, 0, 0);

    _origImg = null; // not used for vectors
  } else {
    // ── Raster path ──
    _vectorOrigState = null;
    var srcCanvas, nw, nh;
    if(fabricObj.type === 'image'){
      var imgEl = fabricObj.getElement();
      if(!imgEl) return;
      nw = imgEl.naturalWidth || imgEl.width;
      nh = imgEl.naturalHeight || imgEl.height;
      srcCanvas = document.createElement('canvas');
      srcCanvas.width = nw; srcCanvas.height = nh;
      srcCanvas.getContext('2d').drawImage(imgEl, 0, 0);
    } else if(fabricObj.toCanvasElement){
      srcCanvas = fabricObj.toCanvasElement(3);
      nw = srcCanvas.width; nh = srcCanvas.height;
    } else { return; }
    if(!nw || !nh) return;

    var trimmed2 = _trimCanvas(srcCanvas);
    nw = trimmed2.width; nh = trimmed2.height;
    _origCanvasW = nw; _origCanvasH = nh;

    _origImg = new Image();
    _origImg.src = trimmed2.toDataURL('image/png');

    _workCanvas = document.createElement('canvas');
    _workCanvas.width = nw; _workCanvas.height = nh;
    _workCtx = _workCanvas.getContext('2d');
    _workCtx.drawImage(trimmed2, 0, 0);
  }

  var m = document.getElementById('logoEditorModal');
  if(m) m.classList.add('open');
  _previewEl = document.getElementById('lePreview');
  _drawPreview(_workCanvas);
  _resetToolPanels();
  _wireEvents();

  var nameEl = document.getElementById('leFileName');
  if(nameEl) nameEl.textContent = fabricObj._name || 'Logo';

  // Show/hide bitmap-only tools
  var upBtn = document.getElementById('leToolUpscale');
  if(upBtn) upBtn.style.display = (_isRaster && !fabricObj._vectorOrigin) ? '' : 'none';
  var bgBtn = document.getElementById('leToolBgRemove');
  if(bgBtn) bgBtn.style.display = (_isRaster && !fabricObj._vectorOrigin) ? '' : 'none';

  var info = document.getElementById('leUpInfo');
  if(info) info.textContent = _origCanvasW + '×' + _origCanvasH + ' px';

  _createLoupe();
  _extractColors();
}

function close(keepChanges){
  // Vector cancel: undo all modifications if not keeping
  if(!keepChanges && _modified && _isVector && _fabricObj && _vectorOrigState){
    _restoreVectorState(_fabricObj, _vectorOrigState);
    _fabricObj.dirty = true;
    if(window._gsbCanvas) window._gsbCanvas.requestRenderAll();
  }

  var m = document.getElementById('logoEditorModal');
  if(m) m.classList.remove('open');
  _fabricObj = null; _origImg = null; _workCanvas = null; _workCtx = null;
  _pickMode = false; _pickedRGB = null;
  _vectorOrigState = null;
  _preOutlineCanvas = null;
  _hasOutline = false;
  _outlineWidth = 0;
  _outlineColor = '#FFFFFF';
  _vectorMult = 3;
  _destroyLoupe();
  clearTimeout(_liveTimer);
}

/* ══════════ Vector state save/restore ══════════ */
function _saveVectorState(group){
  var children = [];
  var walk = function(objs){
    objs.forEach(function(o){
      children.push({
        obj: o,
        fill: o.fill,
        stroke: o.stroke,
        strokeWidth: o.strokeWidth || 0,
        paintOrder: o.paintOrder || ''
      });
      if(o._objects) walk(o._objects);
    });
  };
  if(group._objects) walk(group._objects);
  return {
    children: children,
    svgSource: group._svgSource || null
  };
}

function _restoreVectorState(group, state){
  state.children.forEach(function(saved){
    saved.obj.set('fill', saved.fill);
    saved.obj.set('stroke', saved.stroke);
    saved.obj.set('strokeWidth', saved.strokeWidth);
    if(saved.paintOrder) saved.obj.set('paintOrder', saved.paintOrder);
    else saved.obj.set('paintOrder', '');
    saved.obj.dirty = true;
  });
  group._svgSource = state.svgSource;
  if(group._originalId && typeof svgSourceStore !== 'undefined'){
    if(state.svgSource) svgSourceStore.set(group._originalId, state.svgSource);
  }
  group.dirty = true;
}

/* ══════════ Refresh vector preview ══════════ */
function _refreshVectorPreview(){
  if(!_isVector || !_fabricObj) return;
  var displayW = _fabricObj.width * (_fabricObj.scaleX || 1);
  var mult = Math.max(3, Math.ceil(2000 / Math.max(displayW, 1)));
  var vecCanvas = _fabricObj.toCanvasElement(mult);
  var trimmed = _trimCanvas(vecCanvas);

  if(_hasOutline && _outlineWidth > 0){
    // Update pre-outline canvas with the freshly-rendered group
    if(!_preOutlineCanvas) _preOutlineCanvas = document.createElement('canvas');
    _preOutlineCanvas.width = trimmed.width;
    _preOutlineCanvas.height = trimmed.height;
    _preOutlineCanvas.getContext('2d').drawImage(trimmed, 0, 0);
    // Re-apply outline with scaled width
    var scaledW = _outlineWidth * _vectorMult / 3;
    var result = _buildOutline(_preOutlineCanvas, scaledW, _outlineColor);
    _workCanvas.width = result.width;
    _workCanvas.height = result.height;
    _workCtx = _workCanvas.getContext('2d');
    _workCtx.drawImage(result, 0, 0);
  } else {
    _workCanvas.width = trimmed.width;
    _workCanvas.height = trimmed.height;
    _workCtx = _workCanvas.getContext('2d');
    _workCtx.drawImage(trimmed, 0, 0);
  }
  _drawPreview(_workCanvas);
}

/* ══════════ Trim transparent edges ══════════ */
function _trimCanvas(src){
  var w = src.width, h = src.height;
  var data = src.getContext('2d').getImageData(0, 0, w, h).data;
  var top = h, left = w, bottom = 0, right = 0;
  for(var y = 0; y < h; y++){
    for(var x = 0; x < w; x++){
      if(data[(y * w + x) * 4 + 3] > 0){
        if(y < top) top = y;
        if(y > bottom) bottom = y;
        if(x < left) left = x;
        if(x > right) right = x;
      }
    }
  }
  if(top > bottom || left > right) return src;
  var tw = right - left + 1;
  var th = bottom - top + 1;
  if(tw >= w - 4 && th >= h - 4) return src;
  var out = document.createElement('canvas');
  out.width = tw; out.height = th;
  out.getContext('2d').drawImage(src, left, top, tw, th, 0, 0, tw, th);
  return out;
}

/* ══════════ Preview — always full width, max height ══════════ */
function _drawPreview(sourceCanvas){
  if(!_previewEl) return;
  var src = sourceCanvas || _workCanvas;
  if(!src) return;
  var wrap = _previewEl.parentElement;
  var maxW = (wrap ? wrap.clientWidth : 560) - 32;
  var maxH = 360;
  var scale = maxW / src.width;
  if(src.height * scale > maxH) scale = maxH / src.height;
  var pw = Math.round(src.width * scale);
  var ph = Math.round(src.height * scale);
  _previewEl.width = pw;
  _previewEl.height = ph;
  var ctx = _previewEl.getContext('2d');
  _drawCheckerboard(ctx, pw, ph);
  ctx.drawImage(src, 0, 0, pw, ph);
}

function _drawCheckerboard(ctx, w, h){
  var size = 8;
  for(var y = 0; y < h; y += size){
    for(var x = 0; x < w; x += size){
      ctx.fillStyle = ((x/size + y/size) % 2 === 0) ? '#e8e8e8' : '#fff';
      ctx.fillRect(x, y, size, size);
    }
  }
}

/* ══════════ Live preview engine ══════════ */
function _livePreview(){
  clearTimeout(_liveTimer);
  _liveTimer = setTimeout(function(){
    if(_activeTool === 'outline') _liveOutline();
    else if(_activeTool === 'color') _liveColor();
    else _drawPreview(_workCanvas);
  }, 40);
}

function _liveOutline(){
  if(_isVector){
    var ow = document.getElementById('leOutWidth');
    var oc = document.getElementById('leOutColor');
    var width = parseFloat(ow ? ow.value : 0) || 0;
    var color = oc ? oc.value : '#FFFFFF';
    if(width <= 0){
      // Show pre-outline version if outline was already applied
      _drawPreview(_preOutlineCanvas || _workCanvas);
      return;
    }
    // Build from pre-outline source to avoid stacking outlines
    var source = _preOutlineCanvas || _workCanvas;
    var scaledW = width * _vectorMult / 3;
    var tmp = _buildOutline(source, scaledW, color);
    _drawPreview(tmp);
    return;
  }
  var ow2 = document.getElementById('leOutWidth');
  var oc2 = document.getElementById('leOutColor');
  var width2 = parseFloat(ow2 ? ow2.value : 0) || 0;
  var color2 = oc2 ? oc2.value : '#FFFFFF';
  if(width2 <= 0){ _drawPreview(_workCanvas); return; }
  // For raster: use pre-outline canvas if outline was already applied
  var sourceForOutline = _preOutlineCanvas || _workCanvas;
  var tmp2 = _buildOutline(sourceForOutline, width2, color2);
  _drawPreview(tmp2);
}

function _liveColor(){
  if(!_pickedRGB){ _drawPreview(_workCanvas); return; }
  if(_isVector){
    // For vectors, show raster approximation in preview
    var rc = document.getElementById('leReplColor');
    var replHex = rc ? rc.value : '#FF0000';
    var tmp = _buildColorReplace(_workCanvas, _pickedRGB, replHex, 40);
    _drawPreview(tmp);
    return;
  }
  var rc2 = document.getElementById('leReplColor');
  var replHex2 = rc2 ? rc2.value : '#FF0000';
  var tmp2 = _buildColorReplace(_workCanvas, _pickedRGB, replHex2, 40);
  _drawPreview(tmp2);
}

/* ══════════ Tool switching ══════════ */
function selectTool(tool){
  _activeTool = tool;
  _pickMode = false;
  document.querySelectorAll('.le-tool-btn').forEach(function(b){
    b.classList.toggle('active', b.dataset.tool === tool);
  });
  document.querySelectorAll('.le-tool-panel').forEach(function(p){
    p.classList.toggle('active', p.id === 'lePanel_' + tool);
  });
  if(_previewEl) _previewEl.style.cursor = '';
  if(tool === 'color'){ _updatePickedSwatch(); _extractColors(); }
  _drawPreview(_workCanvas);
}

function _resetToolPanels(){
  selectTool('');
  var oc = document.getElementById('leOutColor');
  if(oc) oc.value = '#FFFFFF';
  var ow = document.getElementById('leOutWidth');
  if(ow) ow.value = '0';
  var owv = document.getElementById('leOutWidthVal');
  if(owv) owv.textContent = '0';
  _pickedRGB = null;
  _updatePickedSwatch();
  var rc = document.getElementById('leReplColor');
  if(rc) rc.value = '#FF0000';
}

/* ══════════ Extract dominant colors ══════════ */
function _extractColors(){
  var container = document.getElementById('leColorSwatches');
  if(!container) return;

  if(_isVector && _fabricObj && _fabricObj._objects){
    // Vector: extract colors from Fabric group children directly
    var colors = [];
    var seen = {};
    var normHex = function(v){
      if(!v || typeof v !== 'string') return null;
      if(v === 'none' || v === 'transparent') return null;
      if(v.startsWith('url')) return null;
      if(v.startsWith('#')){
        var h = v.toLowerCase();
        if(h.length === 4) h = '#'+h[1]+h[1]+h[2]+h[2]+h[3]+h[3];
        return h;
      }
      if(v.startsWith('rgb')){
        var m = v.match(/(\d+)/g);
        if(m && m.length >= 3) return _hexFromRgb(+m[0], +m[1], +m[2]).toLowerCase();
      }
      return null;
    };
    var walk = function(objs){
      objs.forEach(function(o){
        if(o._objects) walk(o._objects);
        ['fill','stroke'].forEach(function(prop){
          var hex = normHex(o[prop]);
          if(hex && !seen[hex]){
            seen[hex] = true;
            var n = parseInt(hex.substr(1), 16);
            colors.push({ r:(n>>16)&255, g:(n>>8)&255, b:n&255, hex:hex });
          }
        });
      });
    };
    walk(_fabricObj._objects);

    var html = '';
    colors.forEach(function(c){
      html += '<button class="le-color-chip" data-r="'+c.r+'" data-g="'+c.g+'" data-b="'+c.b+'" data-hex="'+c.hex+'" title="'+c.hex.toUpperCase()+'" style="background:'+c.hex+'"></button>';
    });
    container.innerHTML = html;
    container.querySelectorAll('.le-color-chip').forEach(function(chip){
      chip.onclick = function(){
        _pickedRGB = { r: parseInt(chip.dataset.r,10), g: parseInt(chip.dataset.g,10), b: parseInt(chip.dataset.b,10), hex: chip.dataset.hex };
        _updatePickedSwatch();
        _liveColor();
      };
    });
    return;
  }

  // Raster: sample pixel colors from workCanvas
  if(!_workCanvas) return;
  var w = _workCanvas.width, h = _workCanvas.height;
  var sampleW = Math.min(w, 200), sampleH = Math.min(h, 200);
  var tmpC = document.createElement('canvas');
  tmpC.width = sampleW; tmpC.height = sampleH;
  var tctx = tmpC.getContext('2d');
  tctx.drawImage(_workCanvas, 0, 0, sampleW, sampleH);
  var data = tctx.getImageData(0, 0, sampleW, sampleH).data;
  var buckets = {};
  for(var i = 0; i < data.length; i += 4){
    if(data[i+3] < 30) continue;
    var r = Math.round(data[i] / 16) * 16;
    var g = Math.round(data[i+1] / 16) * 16;
    var b = Math.round(data[i+2] / 16) * 16;
    r = Math.min(r, 240); g = Math.min(g, 240); b = Math.min(b, 240);
    var key = r + ',' + g + ',' + b;
    buckets[key] = (buckets[key] || 0) + 1;
  }
  var sorted = Object.keys(buckets).sort(function(a,b2){ return buckets[b2] - buckets[a]; });
  var unique = [];
  for(var j = 0; j < sorted.length && unique.length < 8; j++){
    var parts = sorted[j].split(',').map(Number);
    var tooClose = false;
    for(var k = 0; k < unique.length; k++){
      var dr = parts[0]-unique[k][0], dg = parts[1]-unique[k][1], db = parts[2]-unique[k][2];
      if(dr*dr + dg*dg + db*db < 2000){ tooClose = true; break; }
    }
    if(!tooClose) unique.push(parts);
  }
  var html2 = '';
  for(var u = 0; u < unique.length; u++){
    var c = unique[u];
    var hex = '#' + _hex(c[0]) + _hex(c[1]) + _hex(c[2]);
    html2 += '<button class="le-color-chip" data-r="'+c[0]+'" data-g="'+c[1]+'" data-b="'+c[2]+'" data-hex="'+hex+'" title="'+hex+'" style="background:'+hex+'"></button>';
  }
  container.innerHTML = html2;
  container.querySelectorAll('.le-color-chip').forEach(function(chip){
    chip.onclick = function(){
      _pickedRGB = { r: parseInt(chip.dataset.r,10), g: parseInt(chip.dataset.g,10), b: parseInt(chip.dataset.b,10), hex: chip.dataset.hex };
      _updatePickedSwatch();
      _liveColor();
    };
  });
}

/* ══════════ Event wiring ══════════ */
function _wireEvents(){
  if(!_previewEl) return;
  _previewEl.onclick = function(e){
    if(_activeTool !== 'color' || !_pickMode) return;
    var rect = _previewEl.getBoundingClientRect();
    var scaleX = _workCanvas.width / _previewEl.width;
    var scaleY = _workCanvas.height / _previewEl.height;
    var px = Math.floor((e.clientX - rect.left) * scaleX);
    var py = Math.floor((e.clientY - rect.top) * scaleY);
    px = Math.max(0, Math.min(px, _workCanvas.width - 1));
    py = Math.max(0, Math.min(py, _workCanvas.height - 1));
    var d = _workCtx.getImageData(px, py, 1, 1).data;
    if(d[3] < 10) return;
    _pickedRGB = {r: d[0], g: d[1], b: d[2], hex: _hexFromRgb(d[0],d[1],d[2]) };
    _pickMode = false;
    _previewEl.style.cursor = '';
    _updatePickedSwatch();
    _hideLoupe();
    _liveColor();
  };
  _previewEl.onmousemove = function(e){
    if(!_pickMode || _activeTool !== 'color') return;
    _showLoupe(e);
  };
  _previewEl.onmouseleave = function(){ _hideLoupe(); };

  var outW = document.getElementById('leOutWidth');
  var outC = document.getElementById('leOutColor');
  if(outW) outW.addEventListener('input', function(){ _livePreview(); });
  if(outC) outC.addEventListener('input', function(){ _livePreview(); });
  var replC = document.getElementById('leReplColor');
  if(replC) replC.addEventListener('input', function(){
    _updateCmykDisplay('leReplCmyk', replC.value);
    _livePreview();
  });
}

/* ══════════ Loupe ══════════ */
function _createLoupe(){
  _destroyLoupe();
  var el = document.createElement('canvas');
  el.width = 120; el.height = 120;
  el.style.cssText = 'position:fixed;width:120px;height:120px;border-radius:50%;border:3px solid #333;box-shadow:0 4px 16px rgba(0,0,0,.3);pointer-events:none;z-index:9999;display:none;image-rendering:pixelated';
  document.body.appendChild(el);
  _loupeCanvas = el;
  _loupeCtx = el.getContext('2d');
  _loupeCtx.imageSmoothingEnabled = false;
}
function _destroyLoupe(){
  if(_loupeCanvas && _loupeCanvas.parentNode) _loupeCanvas.parentNode.removeChild(_loupeCanvas);
  _loupeCanvas = null; _loupeCtx = null;
}
function _showLoupe(e){
  if(!_loupeCanvas || !_workCanvas || !_previewEl) return;
  _loupeCanvas.style.display = 'block';
  var rect = _previewEl.getBoundingClientRect();
  var mx = e.clientX, my = e.clientY;
  _loupeCanvas.style.left = (mx + 20) + 'px';
  _loupeCanvas.style.top = (my - 140) + 'px';
  var scX = _workCanvas.width / _previewEl.width;
  var scY = _workCanvas.height / _previewEl.height;
  var srcX = Math.floor((mx - rect.left) * scX);
  var srcY = Math.floor((my - rect.top) * scY);
  var half = 6;
  _loupeCtx.clearRect(0, 0, 120, 120);
  _drawCheckerboard(_loupeCtx, 120, 120);
  _loupeCtx.drawImage(_workCanvas, srcX - half, srcY - half, 12, 12, 0, 0, 120, 120);
  _loupeCtx.strokeStyle = 'rgba(0,0,0,.6)'; _loupeCtx.lineWidth = 1;
  _loupeCtx.strokeRect(55, 55, 10, 10);
  _loupeCtx.strokeStyle = 'rgba(255,255,255,.8)';
  _loupeCtx.strokeRect(54, 54, 12, 12);
  srcX = Math.max(0, Math.min(srcX, _workCanvas.width - 1));
  srcY = Math.max(0, Math.min(srcY, _workCanvas.height - 1));
  var px = _workCtx.getImageData(srcX, srcY, 1, 1).data;
  if(px[3] > 10){
    var hex = '#' + _hex(px[0]) + _hex(px[1]) + _hex(px[2]);
    _loupeCtx.fillStyle = 'rgba(0,0,0,.7)';
    _loupeCtx.fillRect(10, 100, 100, 18);
    _loupeCtx.fillStyle = '#fff';
    _loupeCtx.font = 'bold 11px monospace';
    _loupeCtx.textAlign = 'center';
    _loupeCtx.fillText(hex.toUpperCase(), 60, 114);
  }
}
function _hideLoupe(){ if(_loupeCanvas) _loupeCanvas.style.display = 'none'; }

function _updatePickedSwatch(){
  var sw = document.getElementById('lePickedSwatch');
  var txt = document.getElementById('lePickedHex');
  if(!sw || !txt) return;
  if(_pickedRGB){
    var hex = _hexFromRgb(_pickedRGB.r, _pickedRGB.g, _pickedRGB.b);
    sw.style.background = hex; sw.style.borderColor = '#999';
    txt.textContent = hex.toUpperCase();
    // Update CMYK display for picked color
    _updateCmykDisplay('lePickedCmyk', hex);
  } else {
    sw.style.background = 'repeating-conic-gradient(#ddd 0% 25%,#fff 0% 50%) 50%/10px 10px';
    sw.style.borderColor = '#ddd';
    txt.textContent = 'Kies hieronder of gebruik pipet';
    var cmykEl = document.getElementById('lePickedCmyk');
    if(cmykEl) cmykEl.textContent = '';
  }
}

function _updateCmykDisplay(elementId, hex){
  var el = document.getElementById(elementId);
  if(!el) return;
  var h = hex.replace('#','');
  if(h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
  var n = parseInt(h, 16);
  var r = (n>>16)&255, g = (n>>8)&255, b = n&255;
  var cmyk = _rgbToCmyk(r, g, b);
  el.textContent = 'CMYK: ' + cmyk.c + ' / ' + cmyk.m + ' / ' + cmyk.y + ' / ' + cmyk.k;
}

/* ══════════ Reset ══════════ */
function reset(){
  if(_isVector && _fabricObj && _vectorOrigState){
    _restoreVectorState(_fabricObj, _vectorOrigState);
    _fabricObj.dirty = true;
    // Re-save state (so subsequent cancel is clean)
    _vectorOrigState = _saveVectorState(_fabricObj);
    _refreshVectorPreview();
    _modified = false;
    _hasOutline = false;
    _outlineWidth = 0;
    _outlineColor = '#FFFFFF';
    _preOutlineCanvas = null;
    _resetToolPanels();
    _extractColors();
    if(window.toast) window.toast('Reset naar origineel', 'info', 1200);
    return;
  }
  if(!_origImg || !_workCanvas) return;
  _workCanvas.width = _origImg.naturalWidth || _origImg.width;
  _workCanvas.height = _origImg.naturalHeight || _origImg.height;
  _workCtx.drawImage(_origImg, 0, 0);
  _pickedRGB = null;
  _modified = false;
  _hasOutline = false;
  _preOutlineCanvas = null;
  _resetToolPanels();
  _drawPreview(_workCanvas);
  _extractColors();
  if(window.toast) window.toast('Reset naar origineel', 'info', 1200);
}

/* ══════════════════════════════════════════
   TOOL 1: KLEUR AANPASSEN
   ══════════════════════════════════════════ */
function _buildColorReplace(src, pickedRGB, replHex, tolerance){
  var w = src.width, h = src.height;
  var tmpC = document.createElement('canvas');
  tmpC.width = w; tmpC.height = h;
  var tctx = tmpC.getContext('2d');
  tctx.drawImage(src, 0, 0);
  var data = tctx.getImageData(0, 0, w, h);
  var px = data.data;
  var rr = parseInt(replHex.substring(1,3), 16);
  var rg = parseInt(replHex.substring(3,5), 16);
  var rb = parseInt(replHex.substring(5,7), 16);
  var sr = pickedRGB.r, sg = pickedRGB.g, sb = pickedRGB.b;
  var tolSq = tolerance * tolerance * 3;
  for(var i = 0; i < px.length; i += 4){
    if(px[i+3] < 10) continue;
    var dr = px[i]-sr, dg = px[i+1]-sg, db = px[i+2]-sb;
    if(dr*dr + dg*dg + db*db <= tolSq){
      px[i] = rr; px[i+1] = rg; px[i+2] = rb;
    }
  }
  tctx.putImageData(data, 0, 0);
  return tmpC;
}

function startPick(){
  _pickMode = true;
  if(_previewEl) _previewEl.style.cursor = 'crosshair';
}

function applyColorReplace(){
  if(!_pickedRGB) return;
  var rc = document.getElementById('leReplColor');
  var replHex = rc ? rc.value : '#FF0000';
  var oldHex = _pickedRGB.hex || _hexFromRgb(_pickedRGB.r, _pickedRGB.g, _pickedRGB.b);

  if(_isVector && _fabricObj){
    // Vector: use recolorSvgPaths from app.js (modifies group + _svgSource)
    if(typeof recolorSvgPaths === 'function'){
      recolorSvgPaths(_fabricObj, oldHex, replHex, 40);
    }
    _modified = true;
    _refreshVectorPreview();
    _extractColors();
    _pickedRGB = null;
    _updatePickedSwatch();
    if(window.toast) window.toast('Kleur vervangen', 'success', 1200);
    return;
  }

  // Raster path
  var result = _buildColorReplace(_workCanvas, _pickedRGB, replHex, 40);
  _workCtx.drawImage(result, 0, 0);
  _modified = true;
  _pickedRGB = null;
  _updatePickedSwatch();
  _drawPreview(_workCanvas);
  _extractColors();
  // If we have a pre-outline snapshot, update it too
  if(_preOutlineCanvas){
    var prResult = _buildColorReplace(_preOutlineCanvas, _pickedRGB, replHex, 40);
    var pctx = _preOutlineCanvas.getContext('2d');
    pctx.drawImage(prResult, 0, 0);
  }
  if(window.toast) window.toast('Kleur vervangen', 'success', 1200);
}

function _makeAllColor(r, g, b, label){
  var hexColor = _hexFromRgb(r, g, b);

  if(_isVector && _fabricObj){
    // Vector: set all fill/stroke to one color
    var walk = function(objs){
      objs.forEach(function(o){
        if(o._objects) walk(o._objects);
        if(o.fill && o.fill !== 'none' && o.fill !== 'transparent' && typeof o.fill === 'string' && !o.fill.startsWith('url'))
          o.set('fill', hexColor);
        if(o.stroke && o.stroke !== 'none' && o.stroke !== 'transparent' && typeof o.stroke === 'string' && !o.stroke.startsWith('url'))
          o.set('stroke', hexColor);
        o.dirty = true;
      });
    };
    walk(_fabricObj._objects);
    _fabricObj.dirty = true;

    // Update _svgSource
    _updateSvgSourceAllColor(hexColor);

    _modified = true;
    _refreshVectorPreview();
    _extractColors();
    if(window.toast) window.toast(label, 'success', 1200);
    return;
  }

  // Raster path
  if(!_workCanvas) return;
  var w = _workCanvas.width, h = _workCanvas.height;
  var data = _workCtx.getImageData(0, 0, w, h);
  var px = data.data;
  for(var i = 0; i < px.length; i += 4){
    if(px[i+3] < 10) continue;
    px[i] = r; px[i+1] = g; px[i+2] = b;
  }
  _workCtx.putImageData(data, 0, 0);
  _modified = true;
  // Update pre-outline snapshot too
  if(_preOutlineCanvas){
    var pd = _preOutlineCanvas.getContext('2d').getImageData(0, 0, _preOutlineCanvas.width, _preOutlineCanvas.height);
    var ppx = pd.data;
    for(var j = 0; j < ppx.length; j += 4){
      if(ppx[j+3] < 10) continue;
      ppx[j] = r; ppx[j+1] = g; ppx[j+2] = b;
    }
    _preOutlineCanvas.getContext('2d').putImageData(pd, 0, 0);
  }
  _drawPreview(_workCanvas);
  _extractColors();
  if(window.toast) window.toast(label, 'success', 1200);
}
function makeAllBlack(){ _makeAllColor(0, 0, 0, 'Logo zwart gemaakt'); }
function makeAllWhite(){ _makeAllColor(255, 255, 255, 'Logo wit gemaakt'); }

function _updateSvgSourceAllColor(hexColor){
  if(!_fabricObj || !_fabricObj._svgSource) return;
  try {
    var parser = new DOMParser();
    var doc = parser.parseFromString(_fabricObj._svgSource, 'image/svg+xml');
    doc.querySelectorAll('*').forEach(function(el){
      ['fill','stroke'].forEach(function(attr){
        var val = el.getAttribute(attr);
        if(val && val !== 'none' && val !== 'transparent' && !val.startsWith('url')){
          el.setAttribute(attr, hexColor);
        }
      });
      var style = el.getAttribute('style');
      if(style){
        var changed = false;
        var newStyle = style.replace(/(fill|stroke)\s*:\s*([^;]+)/gi, function(match, prop, val){
          var trimmed = val.trim();
          if(trimmed !== 'none' && trimmed !== 'transparent' && !trimmed.startsWith('url')){
            changed = true; return prop + ':' + hexColor;
          }
          return match;
        });
        if(changed) el.setAttribute('style', newStyle);
      }
    });
    // Also update gradient stops
    doc.querySelectorAll('stop').forEach(function(stop){
      var sc = stop.getAttribute('stop-color');
      if(sc && sc !== 'none') stop.setAttribute('stop-color', hexColor);
    });
    _fabricObj._svgSource = new XMLSerializer().serializeToString(doc.documentElement);
    if(_fabricObj._originalId && typeof svgSourceStore !== 'undefined'){
      svgSourceStore.set(_fabricObj._originalId, _fabricObj._svgSource);
    }
    _fabricObj._recolored = true;
  } catch(e){
    console.warn('[LE] Failed to update SVG source:', e);
  }
}

/* ══════════════════════════════════════════
   TOOL 2: ACHTERGROND VERWIJDEREN (bitmap only)
   ══════════════════════════════════════════ */
var _bgRemoveLib = null;

async function applyBgRemove(){
  var btn = document.getElementById('leBgRemoveBtn');
  var status = document.getElementById('leBgStatus');
  if(btn) btn.disabled = true;
  if(status) status.textContent = 'Model laden…';

  try{
    if(!_bgRemoveLib){
      try{
        var mod = await import('https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.5.5/dist/index.mjs');
        _bgRemoveLib = mod.removeBackground || mod.default?.removeBackground;
      }catch(e1){
        console.warn('[LE] @imgly/background-removal CDN failed, trying fallback', e1);
        _bgRemoveLib = null;
      }
    }
    if(_bgRemoveLib){
      if(status) status.textContent = 'Achtergrond verwijderen…';
      var blob = await new Promise(function(resolve){ _workCanvas.toBlob(resolve, 'image/png'); });
      var resultBlob = await _bgRemoveLib(blob, {
        output: { format: 'image/png', quality: 1 },
        progress: function(key, current, total){
          if(status && key === 'compute:inference') status.textContent = 'AI verwerkt… ' + Math.round((current/total)*100) + '%';
        }
      });
      var resultUrl = URL.createObjectURL(resultBlob);
      var resultImg = await _loadImg(resultUrl);
      URL.revokeObjectURL(resultUrl);
      _workCanvas.width = resultImg.width; _workCanvas.height = resultImg.height;
      _workCtx.clearRect(0, 0, resultImg.width, resultImg.height);
      _workCtx.drawImage(resultImg, 0, 0);
      if(status) status.textContent = 'Randen verscherpen…';
      _dtfPostProcess();
    } else {
      if(status) status.textContent = 'Achtergrond verwijderen…';
      _fallbackBgRemove();
      _dtfPostProcess();
    }
    _modified = true;
    _drawPreview(_workCanvas);
    if(status) status.textContent = 'Klaar';
    if(window.toast) window.toast('Achtergrond verwijderd', 'success');
  }catch(err){
    console.error('[LE] BG remove error:', err);
    if(status) status.textContent = 'Fout, fallback wordt gebruikt…';
    try{
      _fallbackBgRemove(); _dtfPostProcess();
      _modified = true; _drawPreview(_workCanvas);
      if(status) status.textContent = 'Klaar (basis)';
    }catch(_e){
      if(status) status.textContent = 'Fout: ' + (err.message || 'onbekend');
    }
  }
  if(btn) btn.disabled = false;
}

/* DTF post-processing: hard alpha + edge erosion */
function _dtfPostProcess(){
  var w = _workCanvas.width, h = _workCanvas.height;
  var data = _workCtx.getImageData(0, 0, w, h);
  var px = data.data;

  // Pass 1: Hard alpha threshold
  for(var i = 3; i < px.length; i += 4){
    px[i] = px[i] < 128 ? 0 : 255;
  }

  // Pass 2: Edge erosion — remove fringe pixels
  var alpha1 = new Uint8Array(w * h);
  for(var j = 0; j < w * h; j++) alpha1[j] = px[j * 4 + 3];
  for(var y = 0; y < h; y++){
    for(var x = 0; x < w; x++){
      var pos = y * w + x;
      if(alpha1[pos] === 0) continue;
      var hasEdge = false;
      if(x === 0 || x === w-1 || y === 0 || y === h-1) hasEdge = true;
      else if(alpha1[pos-1]===0 || alpha1[pos+1]===0 || alpha1[pos-w]===0 || alpha1[pos+w]===0) hasEdge = true;
      if(hasEdge){
        var idx = pos * 4;
        var rr = px[idx], gg = px[idx+1], bb = px[idx+2];
        var maxC = Math.max(rr, gg, bb), minC = Math.min(rr, gg, bb);
        var lum = (rr + gg + bb) / 3;
        var sat = maxC > 0 ? (maxC - minC) / maxC : 0;
        if(lum > 160 && sat < 0.15) px[idx + 3] = 0;
      }
    }
  }

  // Pass 3: Second erosion pass
  var alpha2 = new Uint8Array(w * h);
  for(var j2 = 0; j2 < w * h; j2++) alpha2[j2] = px[j2 * 4 + 3];
  for(var y2 = 1; y2 < h - 1; y2++){
    for(var x2 = 1; x2 < w - 1; x2++){
      var pos2 = y2 * w + x2;
      if(alpha2[pos2] === 0) continue;
      if(alpha2[pos2-1]===0 || alpha2[pos2+1]===0 || alpha2[pos2-w]===0 || alpha2[pos2+w]===0){
        var idx2 = pos2 * 4;
        var lum2 = (px[idx2] + px[idx2+1] + px[idx2+2]) / 3;
        var maxC2 = Math.max(px[idx2], px[idx2+1], px[idx2+2]);
        var minC2 = Math.min(px[idx2], px[idx2+1], px[idx2+2]);
        var sat2 = maxC2 > 0 ? (maxC2 - minC2) / maxC2 : 0;
        if(lum2 > 200 && sat2 < 0.1) px[idx2 + 3] = 0;
      }
    }
  }

  // Pass 4: Fill isolated transparent holes
  var alpha3 = new Uint8Array(w * h);
  for(var j3 = 0; j3 < w * h; j3++) alpha3[j3] = px[j3 * 4 + 3];
  for(var y3 = 1; y3 < h - 1; y3++){
    for(var x3 = 1; x3 < w - 1; x3++){
      var pos3 = y3 * w + x3;
      if(alpha3[pos3] > 0) continue;
      var opaqueCount = 0;
      for(var dy3 = -1; dy3 <= 1; dy3++){
        for(var dx3 = -1; dx3 <= 1; dx3++){
          if(dy3 === 0 && dx3 === 0) continue;
          if(alpha3[(y3+dy3)*w + (x3+dx3)] > 0) opaqueCount++;
        }
      }
      if(opaqueCount >= 6){
        px[pos3 * 4 + 3] = 255;
        var sr2 = 0, sg2 = 0, sb2 = 0, sc2 = 0;
        for(var dy4 = -1; dy4 <= 1; dy4++){
          for(var dx4 = -1; dx4 <= 1; dx4++){
            var npos = (y3+dy4)*w + (x3+dx4);
            if(alpha3[npos] > 0){ sr2 += px[npos*4]; sg2 += px[npos*4+1]; sb2 += px[npos*4+2]; sc2++; }
          }
        }
        if(sc2 > 0){ px[pos3*4] = Math.round(sr2/sc2); px[pos3*4+1] = Math.round(sg2/sc2); px[pos3*4+2] = Math.round(sb2/sc2); }
      }
    }
  }

  _workCtx.putImageData(data, 0, 0);
}

/* Fallback: flood-fill from edges */
function _fallbackBgRemove(){
  var w = _workCanvas.width, h = _workCanvas.height;
  var data = _workCtx.getImageData(0, 0, w, h);
  var px = data.data;
  var samples = [];
  for(var sx = 0; sx < w; sx += Math.max(1, Math.floor(w/20))){
    samples.push({x:sx, y:0}); samples.push({x:sx, y:h-1});
  }
  for(var sy = 0; sy < h; sy += Math.max(1, Math.floor(h/20))){
    samples.push({x:0, y:sy}); samples.push({x:w-1, y:sy});
  }
  var bgR=0, bgG=0, bgB=0, cnt=0;
  samples.forEach(function(c){
    var idx = (c.y*w + c.x)*4;
    if(px[idx+3] > 200){ bgR += px[idx]; bgG += px[idx+1]; bgB += px[idx+2]; cnt++; }
  });
  if(cnt === 0) return;
  bgR = Math.round(bgR/cnt); bgG = Math.round(bgG/cnt); bgB = Math.round(bgB/cnt);
  var visited = new Uint8Array(w * h);
  var queue = [];
  for(var ex = 0; ex < w; ex++){ queue.push(ex); queue.push(ex + (h-1)*w); }
  for(var ey = 1; ey < h-1; ey++){ queue.push(ey*w); queue.push(ey*w + w-1); }
  var tolSq = 60 * 60 * 3;
  while(queue.length > 0){
    var pos = queue.pop();
    if(pos < 0 || pos >= w*h || visited[pos]) continue;
    visited[pos] = 1;
    var idx = pos * 4;
    if(px[idx+3] < 10) continue;
    var dr = px[idx]-bgR, dg = px[idx+1]-bgG, db = px[idx+2]-bgB;
    if(dr*dr + dg*dg + db*db > tolSq) continue;
    px[idx+3] = 0;
    var cx2 = pos % w, cy2 = Math.floor(pos / w);
    if(cx2 > 0) queue.push(pos-1);
    if(cx2 < w-1) queue.push(pos+1);
    if(cy2 > 0) queue.push(pos-w);
    if(cy2 < h-1) queue.push(pos+w);
  }
  _workCtx.putImageData(data, 0, 0);
}

function _loadImg(src){
  return new Promise(function(resolve, reject){
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function(){ resolve(img); };
    img.onerror = reject;
    img.src = src;
  });
}

/* ══════════════════════════════════════════
   TOOL 3: OUTLINE
   ══════════════════════════════════════════ */
function _buildOutline(src, width, color){
  var sw = src.width, sh = src.height;
  var pad = Math.ceil(width);
  var nw = sw + pad * 2, nh = sh + pad * 2;
  var tmpC = document.createElement('canvas');
  tmpC.width = nw; tmpC.height = nh;
  var tctx = tmpC.getContext('2d');
  var steps = Math.max(24, Math.ceil(width * 6));
  for(var i = 0; i < steps; i++){
    var angle = (i / steps) * Math.PI * 2;
    tctx.drawImage(src, pad + Math.cos(angle) * width, pad + Math.sin(angle) * width);
  }
  tctx.globalCompositeOperation = 'source-in';
  tctx.fillStyle = color;
  tctx.fillRect(0, 0, nw, nh);
  tctx.globalCompositeOperation = 'source-over';
  tctx.drawImage(src, pad, pad);
  return tmpC;
}

function applyOutline(){
  var ow = document.getElementById('leOutWidth');
  var oc = document.getElementById('leOutColor');
  var width = parseFloat(ow ? ow.value : 0) || 0;
  var color = oc ? oc.value : '#FFFFFF';
  if(width <= 0) return;

  if(_isVector && _fabricObj){
    // Vector: use raster dilation for outline
    // (svg2pdf.js cannot reliably render paint-order:stroke, so we rasterize
    //  the outline at apply-time → Track 3 export at 300 DPI)

    // Save pre-outline canvas for replace behavior (first time only)
    if(!_preOutlineCanvas){
      _preOutlineCanvas = document.createElement('canvas');
      _preOutlineCanvas.width = _workCanvas.width;
      _preOutlineCanvas.height = _workCanvas.height;
      _preOutlineCanvas.getContext('2d').drawImage(_workCanvas, 0, 0);
    }

    // Save outline parameters for re-apply after color changes
    _outlineWidth = width;
    _outlineColor = color;

    // Build outline from pre-outline canvas (replace, not stack)
    var scaledW = width * _vectorMult / 3;
    var result = _buildOutline(_preOutlineCanvas, scaledW, color);
    _workCanvas.width = result.width;
    _workCanvas.height = result.height;
    _workCtx = _workCanvas.getContext('2d');
    _workCtx.drawImage(result, 0, 0);

    _hasOutline = true;
    _modified = true;
    _drawPreview(_workCanvas);
    if(window.toast) window.toast('Outline toegepast', 'success', 1200);
    return;
  }

  // Raster: replace outline instead of stacking
  if(_hasOutline && _preOutlineCanvas){
    // Restore pre-outline state
    _workCanvas.width = _preOutlineCanvas.width;
    _workCanvas.height = _preOutlineCanvas.height;
    _workCtx.drawImage(_preOutlineCanvas, 0, 0);
  }

  // Save pre-outline state (first time only)
  if(!_preOutlineCanvas){
    _preOutlineCanvas = document.createElement('canvas');
    _preOutlineCanvas.width = _workCanvas.width;
    _preOutlineCanvas.height = _workCanvas.height;
    _preOutlineCanvas.getContext('2d').drawImage(_workCanvas, 0, 0);
  }

  var sourceForOutline = _preOutlineCanvas;
  var result = _buildOutline(sourceForOutline, width, color);
  _workCanvas.width = result.width; _workCanvas.height = result.height;
  _workCtx.drawImage(result, 0, 0);
  _hasOutline = true;
  _modified = true;
  _drawPreview(_workCanvas);
  if(window.toast) window.toast('Outline toegepast', 'success', 1200);
}

function previewOutline(){
  var ow = document.getElementById('leOutWidth');
  var owv = document.getElementById('leOutWidthVal');
  if(ow && owv) owv.textContent = ow.value;
  _livePreview();
}

/* ══════════════════════════════════════════
   TOOL 4: UPSCALE (bitmap only)
   ══════════════════════════════════════════ */
function applyUpscale(){
  var sel = document.getElementById('leUpFactor');
  var factor = parseInt(sel ? sel.value : 2, 10);
  var sharp = document.getElementById('leSharpAmount');
  var sharpVal = parseFloat(sharp ? sharp.value : 0.5) || 0.5;
  var ow2 = _workCanvas.width, oh2 = _workCanvas.height;
  var nw = ow2 * factor, nh = oh2 * factor;
  if(nw > 8000 || nh > 8000){
    if(window.toast) window.toast('Te groot — maximaal 8000px', 'error', 2000);
    return;
  }
  var tmpC = document.createElement('canvas');
  tmpC.width = nw; tmpC.height = nh;
  var tctx = tmpC.getContext('2d');
  tctx.imageSmoothingEnabled = true;
  tctx.imageSmoothingQuality = 'high';
  tctx.drawImage(_workCanvas, 0, 0, nw, nh);
  if(sharpVal > 0){
    var data = tctx.getImageData(0, 0, nw, nh);
    _unsharpMask(data, nw, nh, sharpVal);
    tctx.putImageData(data, 0, 0);
  }
  _workCanvas.width = nw; _workCanvas.height = nh;
  _workCtx.drawImage(tmpC, 0, 0);
  _modified = true;
  _drawPreview(_workCanvas);
  var info = document.getElementById('leUpInfo');
  if(info) info.textContent = ow2 + '×' + oh2 + ' → ' + nw + '×' + nh + ' px';
  if(window.toast) window.toast('Upscale ' + factor + 'x toegepast', 'success', 1500);
}

function _unsharpMask(imageData, w, h, amount){
  var px = imageData.data;
  var copy = new Uint8ClampedArray(px);
  for(var y = 1; y < h - 1; y++){
    for(var x = 1; x < w - 1; x++){
      for(var c = 0; c < 3; c++){
        var sum = 0;
        for(var dy = -1; dy <= 1; dy++){
          for(var dx = -1; dx <= 1; dx++){
            sum += copy[((y+dy)*w + (x+dx))*4 + c];
          }
        }
        var blurred = sum / 9;
        var original = copy[(y*w+x)*4+c];
        px[(y*w+x)*4+c] = Math.max(0, Math.min(255, Math.round(original + amount * (original - blurred))));
      }
    }
  }
}

function onSharpChange(){
  var s = document.getElementById('leSharpAmount');
  var sv = document.getElementById('leSharpVal');
  if(s && sv) sv.textContent = parseFloat(s.value).toFixed(1);
}

/* ══════════════════════════════════════════
   APPLY — vector stays vector, raster stays raster
   ══════════════════════════════════════════ */
function apply(){
  if(!_fabricObj || !_modified){ close(false); return; }

  if(_isVector){
    if(_hasOutline && _outlineWidth > 0){
      // Outline was applied → rasterize vector + outline at high resolution
      var displayW2 = _fabricObj.width * (_fabricObj.scaleX || 1);
      var mult2 = Math.max(3, Math.ceil(2000 / Math.max(displayW2, 1)));
      var vecRender = _fabricObj.toCanvasElement(mult2);
      var trimmedRender = _trimCanvas(vecRender);
      var scaledW2 = _outlineWidth * mult2 / 3;
      var outlinedCanvas = _buildOutline(trimmedRender, scaledW2, _outlineColor);

      var dataUrl2 = outlinedCanvas.toDataURL('image/png');
      var obj2 = _fabricObj;
      var nw2 = outlinedCanvas.width, nh2 = outlinedCanvas.height;

      fabric.Image.fromURL(dataUrl2, function(newImg){
        var ratioW = (_origCanvasW > 0) ? nw2 / _origCanvasW : 1;
        var ratioH = (_origCanvasH > 0) ? nh2 / _origCanvasH : 1;
        var newMmW = (obj2._mmW || 50) * ratioW;
        var newMmH = (obj2._mmH || 50) * ratioH;
        var pxPerMm = window._displayPxPerMm || 5;

        newImg.set({
          left: obj2.left, top: obj2.top, angle: obj2.angle,
          flipX: !!(obj2.flipX), flipY: !!(obj2.flipY),
          scaleX: (newMmW * pxPerMm) / nw2,
          scaleY: (newMmH * pxPerMm) / nh2,
        });
        newImg.objectCaching = false;

        newImg._id = obj2._id;
        newImg._originalId = obj2._originalId;
        newImg._name = obj2._name;
        newImg._naturalW = nw2;
        newImg._naturalH = nh2;
        newImg._mmW = newMmW;
        newImg._mmH = newMmH;
        newImg._mmLeft = obj2._mmLeft;
        newImg._mmTop = obj2._mmTop;
        if(obj2._vectorOrigin) newImg._vectorOrigin = obj2._vectorOrigin;
        if(obj2._isFillTile) newImg._isFillTile = obj2._isFillTile;
        // Do NOT copy _svgSource → forces Track 3 raster export
        // Also remove from svgSourceStore so export cannot find it
        if(obj2._originalId && typeof svgSourceStore !== 'undefined'){
          svgSourceStore.delete(obj2._originalId);
        }

        var canvas = window._gsbCanvas;
        if(canvas){
          if(typeof window.attachObjListeners === 'function') window.attachObjListeners(newImg);
          canvas.remove(obj2);
          canvas.add(newImg);
          canvas.setActiveObject(newImg);
          canvas.requestRenderAll();
          if(typeof window.syncMmFromPx === 'function') window.syncMmFromPx(newImg);
          if(typeof window.renderItemList === 'function') window.renderItemList();
          if(typeof window.renderSelectedPanel === 'function') window.renderSelectedPanel();
        }
        if(window.toast) window.toast('Logo bijgewerkt', 'success');
      }, { crossOrigin: 'anonymous' });

      close(true);
      return;
    }

    // No outline — vector stays vector, color changes already on group
    _fabricObj.dirty = true;
    _fabricObj._recolored = true;
    var canvas = window._gsbCanvas;
    if(canvas){
      canvas.requestRenderAll();
      if(typeof window.renderItemList === 'function') window.renderItemList();
      if(typeof window.renderSelectedPanel === 'function') window.renderSelectedPanel();
    }
    if(window.toast) window.toast('Logo bijgewerkt', 'success');
    close(true);
    return;
  }

  // Raster path: create new fabric.Image
  var dataUrl = _workCanvas.toDataURL('image/png');
  var obj = _fabricObj;
  var nw = _workCanvas.width, nh = _workCanvas.height;

  fabric.Image.fromURL(dataUrl, function(newImg){
    var ratioW = (_origCanvasW > 0) ? nw / _origCanvasW : 1;
    var ratioH = (_origCanvasH > 0) ? nh / _origCanvasH : 1;
    var newMmW = (obj._mmW || 50) * ratioW;
    var newMmH = (obj._mmH || 50) * ratioH;
    var pxPerMm = window._displayPxPerMm || 5;

    newImg.set({
      left: obj.left, top: obj.top, angle: obj.angle,
      flipX: !!(obj.flipX), flipY: !!(obj.flipY),
      scaleX: (newMmW * pxPerMm) / nw,
      scaleY: (newMmH * pxPerMm) / nh,
    });
    newImg.objectCaching = false;

    newImg._id = obj._id;
    newImg._originalId = obj._originalId;
    newImg._name = obj._name;
    newImg._naturalW = nw;
    newImg._naturalH = nh;
    newImg._mmW = newMmW;
    newImg._mmH = newMmH;
    newImg._mmLeft = obj._mmLeft;
    newImg._mmTop = obj._mmTop;
    if(obj._vectorOrigin) newImg._vectorOrigin = obj._vectorOrigin;
    if(obj._embeddedRasterW) newImg._embeddedRasterW = obj._embeddedRasterW;
    if(obj._embeddedRasterH) newImg._embeddedRasterH = obj._embeddedRasterH;
    if(obj._pdfPageW) newImg._pdfPageW = obj._pdfPageW;
    if(obj._pdfPageH) newImg._pdfPageH = obj._pdfPageH;
    if(obj._isFillTile) newImg._isFillTile = obj._isFillTile;

    // Clear SVG source — raster edits are not reflected in SVG,
    // so export must use raster track (Track 3)
    // Do NOT copy _svgSource to newImg

    var canvas = window._gsbCanvas;
    if(canvas){
      if(typeof window.attachObjListeners === 'function') window.attachObjListeners(newImg);
      canvas.remove(obj);
      canvas.add(newImg);
      canvas.setActiveObject(newImg);
      canvas.requestRenderAll();
      if(typeof window.syncMmFromPx === 'function') window.syncMmFromPx(newImg);
      if(typeof window.renderItemList === 'function') window.renderItemList();
      if(typeof window.renderSelectedPanel === 'function') window.renderSelectedPanel();
    }
    if(window.toast) window.toast('Logo bijgewerkt', 'success');
  }, { crossOrigin: 'anonymous' });

  close(true);
}

/* ══════════ Expose ══════════ */
window.gsbLogoEditor = {
  open: open, close: function(){ close(false); }, apply: apply, reset: reset,
  selectTool: selectTool,
  applyOutline: applyOutline, previewOutline: previewOutline,
  startPick: startPick, applyColorReplace: applyColorReplace,
  makeAllBlack: makeAllBlack, makeAllWhite: makeAllWhite,
  applyUpscale: applyUpscale, onSharpChange: onSharpChange,
  applyBgRemove: applyBgRemove,
};

})();
