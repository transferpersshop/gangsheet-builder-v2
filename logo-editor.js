/* ================================================================
   logo-editor.js — Per-logo bewerkingsmodal voor Gang Sheet Builder
   v2.14.0 — live preview, pixel-zoom pipet, DTF-grade bg removal
   ================================================================ */
(function(){
'use strict';

/* ── State ── */
var _fabricObj = null;
var _origImg   = null;     // original HTMLImageElement (untouched)
var _workCanvas = null;    // committed edits canvas
var _workCtx   = null;
var _previewEl = null;     // preview <canvas> in modal
var _activeTool = '';
var _modified  = false;
var _origCanvasW = 0;
var _origCanvasH = 0;
var _liveTimer = null;     // debounce timer for live preview

// Outline state
var _outColor  = '#FFFFFF';
var _outWidth  = 0;

// Color replace state
var _pickMode   = false;
var _pickedRGB  = null;
var _replColor  = '#FF0000';
var _colorTol   = 30;

// Loupe element
var _loupeCanvas = null;
var _loupeCtx = null;

/* ══════════ Open / Close ══════════ */
function open(fabricObj){
  if(!fabricObj) return;
  _fabricObj = fabricObj;
  _activeTool = '';
  _modified = false;
  _pickMode = false;
  _pickedRGB = null;
  _outWidth = 0;

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
    var multiplier = 3;
    srcCanvas = fabricObj.toCanvasElement(multiplier);
    nw = srcCanvas.width;
    nh = srcCanvas.height;
  } else { return; }

  if(!nw || !nh) return;
  _origCanvasW = nw;
  _origCanvasH = nh;

  _origImg = new Image();
  _origImg.src = srcCanvas.toDataURL('image/png');

  _workCanvas = document.createElement('canvas');
  _workCanvas.width = nw; _workCanvas.height = nh;
  _workCtx = _workCanvas.getContext('2d');
  _workCtx.drawImage(srcCanvas, 0, 0);

  var m = document.getElementById('logoEditorModal');
  if(m) m.classList.add('open');

  _previewEl = document.getElementById('lePreview');
  _drawPreview(_workCanvas);
  _resetToolPanels();
  _wireEvents();

  var nameEl = document.getElementById('leFileName');
  if(nameEl) nameEl.textContent = fabricObj._name || 'Logo';

  var isRaster = (fabricObj.type === 'image') && !fabricObj._vectorOrigin;
  var upBtn = document.getElementById('leToolUpscale');
  if(upBtn) upBtn.style.display = isRaster ? '' : 'none';

  // Update upscale info with current dimensions
  var info = document.getElementById('leUpInfo');
  if(info) info.textContent = nw + '×' + nh + ' px';

  _createLoupe();
}

function close(){
  var m = document.getElementById('logoEditorModal');
  if(m) m.classList.remove('open');
  _fabricObj = null; _origImg = null; _workCanvas = null; _workCtx = null;
  _pickMode = false; _pickedRGB = null;
  _destroyLoupe();
  clearTimeout(_liveTimer);
}

/* ══════════ Preview rendering ══════════ */
function _drawPreview(sourceCanvas){
  if(!_previewEl) return;
  var src = sourceCanvas || _workCanvas;
  if(!src) return;
  var maxW = _previewEl.parentElement?.clientWidth || 500;
  var maxH = 260;
  var scale = Math.min(maxW / src.width, maxH / src.height, 1);
  _previewEl.width = Math.round(src.width * scale);
  _previewEl.height = Math.round(src.height * scale);
  var ctx = _previewEl.getContext('2d');
  _drawCheckerboard(ctx, _previewEl.width, _previewEl.height);
  ctx.drawImage(src, 0, 0, _previewEl.width, _previewEl.height);
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
// Generates a temporary canvas showing the current tool's effect on _workCanvas
function _livePreview(){
  clearTimeout(_liveTimer);
  _liveTimer = setTimeout(function(){
    if(_activeTool === 'outline') _liveOutline();
    else if(_activeTool === 'color') _liveColor();
    else _drawPreview(_workCanvas);
  }, 40);
}

function _liveOutline(){
  var ow = document.getElementById('leOutWidth');
  var oc = document.getElementById('leOutColor');
  var width = parseFloat(ow ? ow.value : 0) || 0;
  var color = oc ? oc.value : '#FFFFFF';
  if(width <= 0){ _drawPreview(_workCanvas); return; }

  var tmp = _buildOutline(_workCanvas, width, color);
  _drawPreview(tmp);
}

function _liveColor(){
  if(!_pickedRGB){ _drawPreview(_workCanvas); return; }
  var rc = document.getElementById('leReplColor');
  var ct = document.getElementById('leColorTol');
  var replHex = rc ? rc.value : '#FF0000';
  var tolerance = parseInt(ct ? ct.value : 30, 10);

  var tmp = _buildColorReplace(_workCanvas, _pickedRGB, replHex, tolerance);
  _drawPreview(tmp);
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
  if(tool === 'color') _updatePickedSwatch();
  _drawPreview(_workCanvas);
}

function _resetToolPanels(){
  selectTool('');
  var oc = document.getElementById('leOutColor');
  if(oc) oc.value = '#FFFFFF';
  var ow = document.getElementById('leOutWidth');
  if(ow) ow.value = '8';
  var owv = document.getElementById('leOutWidthVal');
  if(owv) owv.textContent = '8';
  _pickedRGB = null;
  _updatePickedSwatch();
  var rc = document.getElementById('leReplColor');
  if(rc) rc.value = '#FF0000';
  var ct = document.getElementById('leColorTol');
  if(ct) ct.value = '30';
  var ctv = document.getElementById('leColorTolVal');
  if(ctv) ctv.textContent = '30';
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
    var data = _workCtx.getImageData(px, py, 1, 1).data;
    if(data[3] < 10) return;
    _pickedRGB = {r: data[0], g: data[1], b: data[2]};
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

  _previewEl.onmouseleave = function(){
    _hideLoupe();
  };

  // Wire live preview on outline controls
  var outW = document.getElementById('leOutWidth');
  var outC = document.getElementById('leOutColor');
  if(outW) outW.addEventListener('input', function(){ _livePreview(); });
  if(outC) outC.addEventListener('input', function(){ _livePreview(); });

  // Wire live preview on color controls
  var replC = document.getElementById('leReplColor');
  var tolR = document.getElementById('leColorTol');
  if(replC) replC.addEventListener('input', function(){ _livePreview(); });
  if(tolR) tolR.addEventListener('input', function(){ _livePreview(); });
}

/* ══════════ Pixel-zoom loupe (pipet) ══════════ */
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
  if(_loupeCanvas && _loupeCanvas.parentNode){
    _loupeCanvas.parentNode.removeChild(_loupeCanvas);
  }
  _loupeCanvas = null; _loupeCtx = null;
}

function _showLoupe(e){
  if(!_loupeCanvas || !_workCanvas || !_previewEl) return;
  _loupeCanvas.style.display = 'block';

  var rect = _previewEl.getBoundingClientRect();
  var mx = e.clientX, my = e.clientY;

  // Position loupe above and to the right of cursor
  _loupeCanvas.style.left = (mx + 20) + 'px';
  _loupeCanvas.style.top = (my - 140) + 'px';

  // Map mouse to source pixels
  var scaleX = _workCanvas.width / _previewEl.width;
  var scaleY = _workCanvas.height / _previewEl.height;
  var srcX = Math.floor((mx - rect.left) * scaleX);
  var srcY = Math.floor((my - rect.top) * scaleY);

  // Draw zoomed region (10x magnification, 12×12 source pixels)
  var zoom = 10;
  var sampleSize = 12;
  var half = Math.floor(sampleSize / 2);
  var sx = srcX - half, sy = srcY - half;

  _loupeCtx.clearRect(0, 0, 120, 120);
  // Checkerboard for transparent areas
  _drawCheckerboard(_loupeCtx, 120, 120);
  _loupeCtx.drawImage(_workCanvas, sx, sy, sampleSize, sampleSize, 0, 0, 120, 120);

  // Draw crosshair
  _loupeCtx.strokeStyle = 'rgba(0,0,0,.6)';
  _loupeCtx.lineWidth = 1;
  _loupeCtx.strokeRect(55, 55, zoom, zoom);
  _loupeCtx.strokeStyle = 'rgba(255,255,255,.8)';
  _loupeCtx.strokeRect(54, 54, zoom + 2, zoom + 2);

  // Show color hex at bottom
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

function _hideLoupe(){
  if(_loupeCanvas) _loupeCanvas.style.display = 'none';
}

function _updatePickedSwatch(){
  var sw = document.getElementById('lePickedSwatch');
  var txt = document.getElementById('lePickedHex');
  if(!sw || !txt) return;
  if(_pickedRGB){
    var hex = '#' + _hex(_pickedRGB.r) + _hex(_pickedRGB.g) + _hex(_pickedRGB.b);
    sw.style.background = hex;
    sw.style.borderColor = '#999';
    txt.textContent = hex.toUpperCase();
  } else {
    sw.style.background = 'repeating-conic-gradient(#ddd 0% 25%,#fff 0% 50%) 50%/10px 10px';
    sw.style.borderColor = '#ddd';
    txt.textContent = 'Klik op preview';
  }
}

function _hex(n){ return n.toString(16).padStart(2,'0'); }

/* ══════════ Reset ══════════ */
function reset(){
  if(!_origImg || !_workCanvas) return;
  _workCanvas.width = _origImg.naturalWidth || _origImg.width;
  _workCanvas.height = _origImg.naturalHeight || _origImg.height;
  _workCtx.drawImage(_origImg, 0, 0);
  _outWidth = 0;
  _pickedRGB = null;
  _modified = false;
  _resetToolPanels();
  _drawPreview(_workCanvas);
  if(window.toast) window.toast('Reset naar origineel', 'info', 1200);
}

/* ══════════════════════════════════════════
   TOOL 1: OUTLINE
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

  var result = _buildOutline(_workCanvas, width, color);
  _workCanvas.width = result.width; _workCanvas.height = result.height;
  _workCtx.drawImage(result, 0, 0);
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
   TOOL 2: COLOR REPLACEMENT
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
  var ct = document.getElementById('leColorTol');
  var replHex = rc ? rc.value : '#FF0000';
  var tolerance = parseInt(ct ? ct.value : 30, 10);

  var result = _buildColorReplace(_workCanvas, _pickedRGB, replHex, tolerance);
  _workCtx.drawImage(result, 0, 0);
  _modified = true;
  _pickedRGB = null;
  _updatePickedSwatch();
  _drawPreview(_workCanvas);
  if(window.toast) window.toast('Kleur vervangen', 'success', 1200);
}

function onTolChange(){
  var ct = document.getElementById('leColorTol');
  var ctv = document.getElementById('leColorTolVal');
  if(ct && ctv) ctv.textContent = ct.value;
  _livePreview();
}

/* ── Quick color: all non-transparent pixels to one color ── */
function _makeAllColor(r, g, b, label){
  if(!_workCanvas) return;
  var w = _workCanvas.width, h = _workCanvas.height;
  var data = _workCtx.getImageData(0, 0, w, h);
  var px = data.data;
  for(var i = 0; i < px.length; i += 4){
    if(px[i+3] < 10) continue; // skip transparent
    px[i] = r; px[i+1] = g; px[i+2] = b;
  }
  _workCtx.putImageData(data, 0, 0);
  _modified = true;
  _drawPreview(_workCanvas);
  if(window.toast) window.toast(label, 'success', 1200);
}

function makeAllBlack(){ _makeAllColor(0, 0, 0, 'Logo zwart gemaakt'); }
function makeAllWhite(){ _makeAllColor(255, 255, 255, 'Logo wit gemaakt'); }

/* ══════════════════════════════════════════
   TOOL 3: UPSCALE
   ══════════════════════════════════════════ */
function applyUpscale(){
  var sel = document.getElementById('leUpFactor');
  var factor = parseInt(sel ? sel.value : 2, 10);
  var sharp = document.getElementById('leSharpAmount');
  var sharpVal = parseFloat(sharp ? sharp.value : 0.5) || 0.5;
  var ow = _workCanvas.width, oh = _workCanvas.height;
  var nw = ow * factor, nh = oh * factor;

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
  if(info) info.textContent = ow + '×' + oh + ' → ' + nw + '×' + nh + ' px';
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
   TOOL 4: BACKGROUND REMOVAL (DTF-grade)
   ══════════════════════════════════════════ */
var _bgRemoveLib = null;

async function applyBgRemove(){
  var btn = document.getElementById('leBgRemoveBtn');
  var status = document.getElementById('leBgStatus');
  if(btn) btn.disabled = true;
  if(status) status.textContent = 'Model laden… (eerste keer ±30 sec)';

  try{
    if(!_bgRemoveLib){
      try{
        var mod = await import('https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.5.5/dist/index.mjs');
        _bgRemoveLib = mod.removeBackground || mod.default?.removeBackground;
      }catch(e1){
        console.warn('[LE] @imgly/background-removal failed, using fallback', e1);
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
      _workCanvas.width = resultImg.width;
      _workCanvas.height = resultImg.height;
      _workCtx.clearRect(0, 0, resultImg.width, resultImg.height);
      _workCtx.drawImage(resultImg, 0, 0);

      // DTF post-processing: hard edges + shadow cleanup
      if(status) status.textContent = 'Randen verscherpen voor DTF…';
      _dtfPostProcess();
    } else {
      if(status) status.textContent = 'Achtergrond verwijderen (basis)…';
      _fallbackBgRemove();
      _dtfPostProcess();
    }

    _modified = true;
    _drawPreview(_workCanvas);
    if(status) status.textContent = 'Achtergrond verwijderd — klaar voor DTF';
    if(window.toast) window.toast('Achtergrond verwijderd', 'success');
  }catch(err){
    console.error('[LE] BG remove error:', err);
    if(status) status.textContent = 'Fout: ' + (err.message || 'onbekend');
    try{
      _fallbackBgRemove();
      _dtfPostProcess();
      _modified = true;
      _drawPreview(_workCanvas);
      if(status) status.textContent = 'Achtergrond verwijderd (basis)';
    }catch(_e){}
  }
  if(btn) btn.disabled = false;
}

/* DTF post-processing: hard alpha threshold + shadow removal */
function _dtfPostProcess(){
  var w = _workCanvas.width, h = _workCanvas.height;
  var data = _workCtx.getImageData(0, 0, w, h);
  var px = data.data;

  // Pass 1: Hard alpha threshold — DTF needs fully opaque or fully transparent
  // Anything below 128 alpha → transparent, above → fully opaque
  for(var i = 3; i < px.length; i += 4){
    px[i] = px[i] < 128 ? 0 : 255;
  }

  // Pass 2: Remove semi-gray shadow remnants near edges
  // Pixels that are very light gray + low saturation near transparent areas = shadow
  for(var y = 0; y < h; y++){
    for(var x = 0; x < w; x++){
      var idx = (y * w + x) * 4;
      if(px[idx + 3] === 0) continue; // already transparent

      var r = px[idx], g = px[idx+1], b = px[idx+2];
      var maxC = Math.max(r, g, b);
      var minC = Math.min(r, g, b);
      var lum = (r + g + b) / 3;
      var sat = maxC > 0 ? (maxC - minC) / maxC : 0;

      // Very light, low saturation pixel — check if it borders transparency
      if(lum > 180 && sat < 0.12){
        var hasTransparentNeighbor = false;
        for(var dy = -2; dy <= 2 && !hasTransparentNeighbor; dy++){
          for(var dx = -2; dx <= 2; dx++){
            var nx = x + dx, ny = y + dy;
            if(nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
            if(px[(ny * w + nx) * 4 + 3] === 0){ hasTransparentNeighbor = true; break; }
          }
        }
        if(hasTransparentNeighbor) px[idx + 3] = 0;
      }
    }
  }

  // Pass 3: Clean isolated transparent pixels inside the subject (1-pass morphological close)
  // If a transparent pixel is surrounded by opaque pixels, fill it
  var alpha = new Uint8Array(w * h);
  for(var j = 0; j < w * h; j++) alpha[j] = px[j * 4 + 3];

  for(var y2 = 1; y2 < h - 1; y2++){
    for(var x2 = 1; x2 < w - 1; x2++){
      var pos = y2 * w + x2;
      if(alpha[pos] > 0) continue; // already opaque
      // Count opaque neighbors (8-connected)
      var opaqueCount = 0;
      for(var dy2 = -1; dy2 <= 1; dy2++){
        for(var dx2 = -1; dx2 <= 1; dx2++){
          if(dy2 === 0 && dx2 === 0) continue;
          if(alpha[(y2+dy2)*w + (x2+dx2)] > 0) opaqueCount++;
        }
      }
      // If 6+ of 8 neighbors are opaque, this is an isolated hole — fill it
      if(opaqueCount >= 6){
        px[pos * 4 + 3] = 255;
        // Use average color of opaque neighbors
        var sr = 0, sg = 0, sb = 0, sc = 0;
        for(var dy3 = -1; dy3 <= 1; dy3++){
          for(var dx3 = -1; dx3 <= 1; dx3++){
            var npos = (y2+dy3)*w + (x2+dx3);
            if(alpha[npos] > 0){
              sr += px[npos*4]; sg += px[npos*4+1]; sb += px[npos*4+2]; sc++;
            }
          }
        }
        if(sc > 0){ px[pos*4] = Math.round(sr/sc); px[pos*4+1] = Math.round(sg/sc); px[pos*4+2] = Math.round(sb/sc); }
      }
    }
  }

  _workCtx.putImageData(data, 0, 0);
}

/* Fallback: flood-fill from all edges */
function _fallbackBgRemove(){
  var w = _workCanvas.width, h = _workCanvas.height;
  var data = _workCtx.getImageData(0, 0, w, h);
  var px = data.data;

  // Sample corners + edge midpoints for bg color
  var samples = [
    {x:0,y:0},{x:w-1,y:0},{x:0,y:h-1},{x:w-1,y:h-1},
    {x:Math.floor(w/2),y:0},{x:Math.floor(w/2),y:h-1},
    {x:0,y:Math.floor(h/2)},{x:w-1,y:Math.floor(h/2)}
  ];
  var bgR=0,bgG=0,bgB=0,cnt=0;
  samples.forEach(function(c){
    var idx = (c.y*w + c.x)*4;
    if(px[idx+3] > 200){ bgR += px[idx]; bgG += px[idx+1]; bgB += px[idx+2]; cnt++; }
  });
  if(cnt === 0) return;
  bgR = Math.round(bgR/cnt); bgG = Math.round(bgG/cnt); bgB = Math.round(bgB/cnt);

  var visited = new Uint8Array(w * h);
  var queue = [];
  for(var x=0;x<w;x++){ queue.push(x); queue.push(x+(h-1)*w); }
  for(var y=1;y<h-1;y++){ queue.push(y*w); queue.push(y*w+w-1); }

  var tolerance = 40;
  var tolSq = tolerance * tolerance * 3;

  while(queue.length > 0){
    var pos = queue.pop();
    if(pos<0 || pos>=w*h || visited[pos]) continue;
    visited[pos] = 1;
    var idx = pos*4;
    if(px[idx+3] < 10) continue;
    var dr=px[idx]-bgR, dg=px[idx+1]-bgG, db=px[idx+2]-bgB;
    if(dr*dr+dg*dg+db*db > tolSq) continue;
    px[idx+3] = 0;
    var cx=pos%w, cy=Math.floor(pos/w);
    if(cx>0) queue.push(pos-1);
    if(cx<w-1) queue.push(pos+1);
    if(cy>0) queue.push(pos-w);
    if(cy<h-1) queue.push(pos+w);
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
   APPLY / CANCEL
   ══════════════════════════════════════════ */
function apply(){
  if(!_fabricObj || !_workCanvas || !_modified){ close(); return; }

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

  close();
}

/* ══════════ Expose ══════════ */
window.gsbLogoEditor = {
  open: open,
  close: close,
  apply: apply,
  reset: reset,
  selectTool: selectTool,
  applyOutline: applyOutline,
  previewOutline: previewOutline,
  startPick: startPick,
  applyColorReplace: applyColorReplace,
  onTolChange: onTolChange,
  makeAllBlack: makeAllBlack,
  makeAllWhite: makeAllWhite,
  applyUpscale: applyUpscale,
  onSharpChange: onSharpChange,
  applyBgRemove: applyBgRemove,
};

})();
