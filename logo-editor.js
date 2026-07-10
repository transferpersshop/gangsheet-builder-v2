/* ================================================================
   logo-editor.js — Per-logo bewerkingsmodal voor Gang Sheet Builder
   v2.13.0 — outline, kleur vervangen, upscale, achtergrond verwijderen
   ================================================================ */
(function(){
'use strict';

/* ── State ── */
var _fabricObj = null;     // fabric.js object being edited
var _origImg   = null;     // original HTMLImageElement (untouched)
var _workCanvas = null;    // off-screen canvas with current edits
var _workCtx   = null;
var _previewEl = null;     // preview <canvas> in modal
var _activeTool = '';      // 'outline' | 'color' | 'upscale' | 'bgremove'
var _modified  = false;

// Outline
var _outColor  = '#FFFFFF';
var _outWidth  = 0;

// Color replace
var _pickMode   = false;
var _pickedRGB  = null;    // {r,g,b}
var _replColor  = '#FF0000';
var _colorTol   = 30;

// Upscale
var _upFactor   = 2;

/* ══════════ Open / Close ══════════ */
function open(fabricObj){
  if(!fabricObj) return;
  _fabricObj = fabricObj;
  _activeTool = '';
  _modified = false;
  _pickMode = false;
  _pickedRGB = null;
  _outWidth = 0;

  // Get the original image element
  var imgEl = fabricObj.getElement();
  if(!imgEl) return;

  // Create a clean copy of the original image
  var tmpC = document.createElement('canvas');
  var nw = imgEl.naturalWidth || imgEl.width;
  var nh = imgEl.naturalHeight || imgEl.height;
  tmpC.width = nw; tmpC.height = nh;
  var tc = tmpC.getContext('2d');
  tc.drawImage(imgEl, 0, 0);

  _origImg = new Image();
  _origImg.src = tmpC.toDataURL('image/png');

  // Init work canvas
  _workCanvas = document.createElement('canvas');
  _workCanvas.width = nw; _workCanvas.height = nh;
  _workCtx = _workCanvas.getContext('2d');
  _workCtx.drawImage(imgEl, 0, 0);

  // Show modal
  var m = document.getElementById('logoEditorModal');
  if(m) m.classList.add('open');

  // Setup preview
  _previewEl = document.getElementById('lePreview');
  _drawPreview();
  _resetToolPanels();
  _wireEvents();

  // Set filename label
  var nameEl = document.getElementById('leFileName');
  if(nameEl) nameEl.textContent = fabricObj._name || 'Logo';

  // Show/hide upscale based on raster type
  var isRaster = (fabricObj.type === 'image') && !fabricObj._vectorOrigin;
  var upSection = document.getElementById('leToolUpscale');
  if(upSection) upSection.style.display = isRaster ? '' : 'none';
}

function close(){
  var m = document.getElementById('logoEditorModal');
  if(m) m.classList.remove('open');
  _fabricObj = null; _origImg = null; _workCanvas = null; _workCtx = null;
  _pickMode = false; _pickedRGB = null;
}

/* ══════════ Preview ══════════ */
function _drawPreview(){
  if(!_previewEl || !_workCanvas) return;
  var maxW = _previewEl.parentElement?.clientWidth || 500;
  var maxH = 280;
  var scale = Math.min(maxW / _workCanvas.width, maxH / _workCanvas.height, 1);
  _previewEl.width = Math.round(_workCanvas.width * scale);
  _previewEl.height = Math.round(_workCanvas.height * scale);
  var ctx = _previewEl.getContext('2d');
  // Checkerboard background for transparency
  _drawCheckerboard(ctx, _previewEl.width, _previewEl.height);
  ctx.drawImage(_workCanvas, 0, 0, _previewEl.width, _previewEl.height);
}

function _drawCheckerboard(ctx, w, h){
  var size = 8;
  for(var y = 0; y < h; y += size){
    for(var x = 0; x < w; x += size){
      ctx.fillStyle = ((x/size + y/size) % 2 === 0) ? '#e8e8e8' : '#ffffff';
      ctx.fillRect(x, y, size, size);
    }
  }
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
  // Reset cursor
  if(_previewEl) _previewEl.style.cursor = '';
  if(tool === 'color') _updatePickedSwatch();
}

function _resetToolPanels(){
  selectTool('');
  // Reset outline controls
  var oc = document.getElementById('leOutColor');
  if(oc) oc.value = _outColor;
  var ow = document.getElementById('leOutWidth');
  if(ow){ ow.value = '0'; }
  var owv = document.getElementById('leOutWidthVal');
  if(owv) owv.textContent = '0';
  // Reset color controls
  _pickedRGB = null;
  _updatePickedSwatch();
  var rc = document.getElementById('leReplColor');
  if(rc) rc.value = _replColor;
  var ct = document.getElementById('leColorTol');
  if(ct) ct.value = '30';
  var ctv = document.getElementById('leColorTolVal');
  if(ctv) ctv.textContent = '30';
}

/* ══════════ Event wiring ══════════ */
function _wireEvents(){
  // Preview click — eyedropper for color tool
  if(_previewEl){
    _previewEl.onclick = function(e){
      if(_activeTool !== 'color' || !_pickMode) return;
      var rect = _previewEl.getBoundingClientRect();
      var scaleX = _workCanvas.width / _previewEl.width;
      var scaleY = _workCanvas.height / _previewEl.height;
      var px = Math.floor((e.clientX - rect.left) * scaleX);
      var py = Math.floor((e.clientY - rect.top) * scaleY);
      var data = _workCtx.getImageData(px, py, 1, 1).data;
      if(data[3] < 10) return; // skip transparent
      _pickedRGB = {r: data[0], g: data[1], b: data[2]};
      _pickMode = false;
      _previewEl.style.cursor = '';
      _updatePickedSwatch();
    };
  }
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
    sw.style.background = 'repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%) 50%/12px 12px';
    sw.style.borderColor = '#ddd';
    txt.textContent = 'Klik op logo';
  }
}

function _hex(n){ return n.toString(16).padStart(2,'0'); }

/* ══════════ Reset to original ══════════ */
function reset(){
  if(!_origImg || !_workCanvas) return;
  _workCanvas.width = _origImg.naturalWidth || _origImg.width;
  _workCanvas.height = _origImg.naturalHeight || _origImg.height;
  _workCtx.drawImage(_origImg, 0, 0);
  _outWidth = 0;
  _pickedRGB = null;
  _modified = false;
  _resetToolPanels();
  _drawPreview();
  if(window.toast) window.toast('Reset naar origineel', 'info', 1200);
}

/* ══════════════════════════════════════════
   TOOL 1: OUTLINE
   ══════════════════════════════════════════ */
function applyOutline(){
  var ow = document.getElementById('leOutWidth');
  var oc = document.getElementById('leOutColor');
  var width = parseFloat(ow ? ow.value : 0) || 0;
  var color = oc ? oc.value : '#FFFFFF';
  if(width <= 0) return;

  _outColor = color;
  _outWidth = width;

  // Work on the current work canvas content
  var src = _workCanvas;
  var sw = src.width, sh = src.height;
  var pad = Math.ceil(width);
  var nw = sw + pad * 2, nh = sh + pad * 2;

  var tmpC = document.createElement('canvas');
  tmpC.width = nw; tmpC.height = nh;
  var tctx = tmpC.getContext('2d');

  // Step 1: Draw source at multiple offsets to create dilated silhouette
  var steps = Math.max(16, Math.ceil(width * 4));
  for(var i = 0; i < steps; i++){
    var angle = (i / steps) * Math.PI * 2;
    var dx = Math.cos(angle) * width;
    var dy = Math.sin(angle) * width;
    tctx.drawImage(src, pad + dx, pad + dy);
  }

  // Step 2: Colorize the silhouette — source-in compositing
  tctx.globalCompositeOperation = 'source-in';
  tctx.fillStyle = color;
  tctx.fillRect(0, 0, nw, nh);

  // Step 3: Draw original on top
  tctx.globalCompositeOperation = 'source-over';
  tctx.drawImage(src, pad, pad);

  // Update work canvas
  _workCanvas.width = nw; _workCanvas.height = nh;
  _workCtx.drawImage(tmpC, 0, 0);
  _modified = true;
  _drawPreview();
  if(window.toast) window.toast('Outline toegepast', 'success', 1200);
}

function previewOutline(){
  // Quick preview without modifying work canvas
  var ow = document.getElementById('leOutWidth');
  var oc = document.getElementById('leOutColor');
  var width = parseFloat(ow ? ow.value : 0) || 0;
  var owv = document.getElementById('leOutWidthVal');
  if(owv) owv.textContent = width;
  // Just update the label, actual preview happens on apply
}

/* ══════════════════════════════════════════
   TOOL 2: COLOR REPLACEMENT
   ══════════════════════════════════════════ */
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
  _replColor = replHex;
  _colorTol = tolerance;

  // Parse replacement color
  var rr = parseInt(replHex.substring(1,3), 16);
  var rg = parseInt(replHex.substring(3,5), 16);
  var rb = parseInt(replHex.substring(5,7), 16);

  var w = _workCanvas.width, h = _workCanvas.height;
  var data = _workCtx.getImageData(0, 0, w, h);
  var px = data.data;

  var sr = _pickedRGB.r, sg = _pickedRGB.g, sb = _pickedRGB.b;
  var tolSq = tolerance * tolerance;
  var replaced = 0;

  for(var i = 0; i < px.length; i += 4){
    if(px[i+3] < 10) continue; // skip transparent
    var dr = px[i] - sr, dg = px[i+1] - sg, db = px[i+2] - sb;
    var distSq = dr*dr + dg*dg + db*db;
    if(distSq <= tolSq * 3){ // *3 because 3 channels
      px[i] = rr; px[i+1] = rg; px[i+2] = rb;
      replaced++;
    }
  }

  _workCtx.putImageData(data, 0, 0);
  _modified = true;
  _pickedRGB = null;
  _updatePickedSwatch();
  _drawPreview();
  if(window.toast) window.toast(replaced + ' pixels vervangen', 'success', 1500);
}

function onTolChange(){
  var ct = document.getElementById('leColorTol');
  var ctv = document.getElementById('leColorTolVal');
  if(ct && ctv) ctv.textContent = ct.value;
}

/* ══════════════════════════════════════════
   TOOL 3: UPSCALE (PNG/JPG only)
   ══════════════════════════════════════════ */
function applyUpscale(){
  var sel = document.getElementById('leUpFactor');
  var factor = parseInt(sel ? sel.value : 2, 10);
  var sharp = document.getElementById('leSharpAmount');
  var sharpVal = parseFloat(sharp ? sharp.value : 0.5) || 0.5;

  var ow = _workCanvas.width, oh = _workCanvas.height;
  var nw = ow * factor, nh = oh * factor;

  // Safety: limit to 8000px max dimension
  if(nw > 8000 || nh > 8000){
    if(window.toast) window.toast('Te groot — maximaal 8000px', 'error', 2000);
    return;
  }

  var tmpC = document.createElement('canvas');
  tmpC.width = nw; tmpC.height = nh;
  var tctx = tmpC.getContext('2d');

  // High-quality bicubic resampling
  tctx.imageSmoothingEnabled = true;
  tctx.imageSmoothingQuality = 'high';
  tctx.drawImage(_workCanvas, 0, 0, nw, nh);

  // Apply unsharp mask for sharpening
  if(sharpVal > 0){
    var data = tctx.getImageData(0, 0, nw, nh);
    _unsharpMask(data, nw, nh, sharpVal);
    tctx.putImageData(data, 0, 0);
  }

  // Update work canvas
  _workCanvas.width = nw; _workCanvas.height = nh;
  _workCtx.drawImage(tmpC, 0, 0);
  _modified = true;
  _drawPreview();

  // Update info
  var info = document.getElementById('leUpInfo');
  if(info) info.textContent = ow + '×' + oh + ' → ' + nw + '×' + nh + ' px';
  if(window.toast) window.toast('Upscale ' + factor + 'x toegepast (' + nw + '×' + nh + ')', 'success', 1500);
}

/* Unsharp mask: pixel-level sharpening */
function _unsharpMask(imageData, w, h, amount){
  var px = imageData.data;
  var copy = new Uint8ClampedArray(px);
  var radius = 1;

  // Simple 3x3 box blur
  for(var y = radius; y < h - radius; y++){
    for(var x = radius; x < w - radius; x++){
      for(var c = 0; c < 3; c++){
        var sum = 0, count = 0;
        for(var dy = -radius; dy <= radius; dy++){
          for(var dx = -radius; dx <= radius; dx++){
            sum += copy[((y+dy)*w + (x+dx))*4 + c];
            count++;
          }
        }
        var blurred = sum / count;
        var original = copy[(y*w+x)*4+c];
        var sharpened = original + amount * (original - blurred);
        px[(y*w+x)*4+c] = Math.max(0, Math.min(255, Math.round(sharpened)));
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
   TOOL 4: BACKGROUND REMOVAL (AI)
   ══════════════════════════════════════════ */
var _bgRemoveLib = null;

async function applyBgRemove(){
  var btn = document.getElementById('leBgRemoveBtn');
  var status = document.getElementById('leBgStatus');
  if(btn) btn.disabled = true;
  if(status) status.textContent = 'Model laden… (eerste keer ±30 sec)';

  try{
    // Load library on demand
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
      // AI-based removal
      if(status) status.textContent = 'Achtergrond verwijderen…';
      var blob = await new Promise(function(resolve){
        _workCanvas.toBlob(resolve, 'image/png');
      });
      var resultBlob = await _bgRemoveLib(blob, {
        output: { format: 'image/png', quality: 1 },
        progress: function(key, current, total){
          if(status && key === 'compute:inference') status.textContent = 'Verwerken… ' + Math.round((current/total)*100) + '%';
        }
      });
      // Load result into work canvas
      var resultUrl = URL.createObjectURL(resultBlob);
      var resultImg = await _loadImg(resultUrl);
      URL.revokeObjectURL(resultUrl);
      _workCanvas.width = resultImg.width;
      _workCanvas.height = resultImg.height;
      _workCtx.clearRect(0, 0, resultImg.width, resultImg.height);
      _workCtx.drawImage(resultImg, 0, 0);
    } else {
      // Fallback: smart threshold removal + edge refinement
      if(status) status.textContent = 'Achtergrond verwijderen (basis)…';
      _fallbackBgRemove();
    }

    _modified = true;
    _drawPreview();
    if(status) status.textContent = 'Achtergrond verwijderd';
    if(window.toast) window.toast('Achtergrond verwijderd', 'success');
  }catch(err){
    console.error('[LE] BG remove error:', err);
    if(status) status.textContent = 'Fout: ' + (err.message || 'onbekend');
    // Try fallback
    try{
      _fallbackBgRemove();
      _modified = true;
      _drawPreview();
      if(status) status.textContent = 'Achtergrond verwijderd (basis)';
    }catch(_){}
  }
  if(btn) btn.disabled = false;
}

/* Fallback: flood-fill from corners + tolerance-based */
function _fallbackBgRemove(){
  var w = _workCanvas.width, h = _workCanvas.height;
  var data = _workCtx.getImageData(0, 0, w, h);
  var px = data.data;

  // Sample corners to detect bg color
  var corners = [
    {x:0,y:0}, {x:w-1,y:0}, {x:0,y:h-1}, {x:w-1,y:h-1},
    {x:1,y:1}, {x:w-2,y:1}, {x:1,y:h-2}, {x:w-2,y:h-2}
  ];
  var bgR = 0, bgG = 0, bgB = 0, cnt = 0;
  corners.forEach(function(c){
    var idx = (c.y * w + c.x) * 4;
    bgR += px[idx]; bgG += px[idx+1]; bgB += px[idx+2]; cnt++;
  });
  bgR = Math.round(bgR/cnt); bgG = Math.round(bgG/cnt); bgB = Math.round(bgB/cnt);

  // Flood fill from all edges
  var visited = new Uint8Array(w * h);
  var queue = [];

  // Add all edge pixels
  for(var x = 0; x < w; x++){ queue.push(x); queue.push(x + (h-1)*w); }
  for(var y = 1; y < h-1; y++){ queue.push(y*w); queue.push(y*w + w-1); }

  var tolerance = 35;
  var tolSq = tolerance * tolerance * 3;

  while(queue.length > 0){
    var pos = queue.pop();
    if(pos < 0 || pos >= w*h || visited[pos]) continue;
    visited[pos] = 1;
    var idx = pos * 4;
    if(px[idx+3] < 10) continue; // already transparent
    var dr = px[idx]-bgR, dg = px[idx+1]-bgG, db = px[idx+2]-bgB;
    if(dr*dr + dg*dg + db*db > tolSq) continue; // not bg color
    px[idx+3] = 0; // make transparent
    var px2 = pos % w, py2 = Math.floor(pos / w);
    if(px2 > 0) queue.push(pos - 1);
    if(px2 < w-1) queue.push(pos + 1);
    if(py2 > 0) queue.push(pos - w);
    if(py2 < h-1) queue.push(pos + w);
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
   APPLY to fabric canvas / CANCEL
   ══════════════════════════════════════════ */
function apply(){
  if(!_fabricObj || !_workCanvas || !_modified){
    close();
    return;
  }

  var dataUrl = _workCanvas.toDataURL('image/png');
  var obj = _fabricObj;
  var nw = _workCanvas.width, nh = _workCanvas.height;

  fabric.Image.fromURL(dataUrl, function(newImg){
    // Keep position, angle, flip
    newImg.set({
      left: obj.left, top: obj.top, angle: obj.angle,
      flipX: obj.flipX, flipY: obj.flipY,
      scaleX: obj.scaleX, scaleY: obj.scaleY,
    });
    // Copy custom properties
    newImg._id = obj._id;
    newImg._originalId = obj._originalId;
    newImg._name = obj._name;
    newImg._naturalW = nw;
    newImg._naturalH = nh;

    // Adjust mm dimensions based on size change
    var origNW = obj._naturalW || (obj.getElement()?.naturalWidth || nw);
    var origNH = obj._naturalH || (obj.getElement()?.naturalHeight || nh);
    var ratioW = nw / origNW;
    var ratioH = nh / origNH;
    newImg._mmW = (obj._mmW || 50) * ratioW;
    newImg._mmH = (obj._mmH || 50) * ratioH;
    newImg._mmLeft = obj._mmLeft;
    newImg._mmTop = obj._mmTop;

    // Preserve flags
    if(obj._vectorOrigin) newImg._vectorOrigin = obj._vectorOrigin;
    if(obj._svgSource) newImg._svgSource = obj._svgSource;
    if(obj._hasGradients) newImg._hasGradients = obj._hasGradients;
    if(obj._embeddedRasterW) newImg._embeddedRasterW = obj._embeddedRasterW;
    if(obj._embeddedRasterH) newImg._embeddedRasterH = obj._embeddedRasterH;
    if(obj._pdfPageW) newImg._pdfPageW = obj._pdfPageW;
    if(obj._pdfPageH) newImg._pdfPageH = obj._pdfPageH;
    if(obj._isFillTile) newImg._isFillTile = obj._isFillTile;

    // Replace on canvas
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
  // Outline
  applyOutline: applyOutline,
  previewOutline: previewOutline,
  // Color
  startPick: startPick,
  applyColorReplace: applyColorReplace,
  onTolChange: onTolChange,
  // Upscale
  applyUpscale: applyUpscale,
  onSharpChange: onSharpChange,
  // BG remove
  applyBgRemove: applyBgRemove,
};

})();
