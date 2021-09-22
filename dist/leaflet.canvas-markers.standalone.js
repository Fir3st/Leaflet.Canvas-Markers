!function(t){var e={};function a(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=t,a.c=e,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(n,i,function(e){return t[e]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=4)}([,,,function(t,e,a){"use strict";t.exports=function(t){var e=(t.Layer?t.Layer:t.Class).extend({initialize:function(e){t.setOptions(this,e),this._onClickListeners=[],this._onHoverListeners=[],this._enforceZIndex=!1},initializeCanvas:function(){var e=this._map.containerPointToLayerPoint([0,0]);t.DomUtil.setPosition(this._canvas,e);var a=this._map.getSize();this._canvas.width=a.x,this._canvas.height=a.y},setOptions:function(e){return t.setOptions(this,e),this.redraw()},setEnforceZIndex:function(t){this._enforceZIndex=t},redraw:function(){this._redraw(!0)},addMarkers:function(t){var e=this,a=[],n=[];this._enforceZIndex&&t.sort((t,e)=>t.options.zIndexOffset-e.options.zIndexOffset),t.forEach(function(t){if("markerPane"==t.options.pane&&t.options.icon){var i=t.getLatLng(),o=e._map.getBounds().contains(i),r=e._addMarker(t,i,o);!0===o&&a.push(r[0]),n.push(r[1])}else console.error("Layer isn't a marker")}),e._markers.load(a),e._latlngMarkers.load(n)},addMarker:function(t){var e=t.getLatLng(),a=this._map.getBounds().contains(e),n=this._addMarker(t,e,a);!0===a&&this._markers.insert(n[0]),this._latlngMarkers.insert(n[1])},addLayer:function(t){"markerPane"==t.options.pane&&t.options.icon?this.addMarker(t):console.error("Layer isn't a marker")},addLayers:function(t){this.addMarkers(t)},removeLayer:function(t){this.removeMarker(t,!0)},removeMarker:function(t,e){t.minX&&(t=t.data);var a=t.getLatLng(),n=this._map.getBounds().contains(a),i={minX:a.lng,minY:a.lat,maxX:a.lng,maxY:a.lat,data:t};this._latlngMarkers.remove(i,function(t,e){return t.data._leaflet_id===e.data._leaflet_id}),this._latlngMarkers.total--,this._latlngMarkers.dirty++,!0===n&&!0===e&&this._redraw(!0)},onAdd:function(t){this._map=t,this._canvas||this._initCanvas(),this.options.pane?this.getPane().appendChild(this._canvas):t._panes.overlayPane.appendChild(this._canvas),t.on("moveend",this._reset,this),t.on("resize",this._reset,this),t.on("click",this._executeListeners,this),t.on("mousemove",this._executeListeners,this),t._zoomAnimated&&t.on("zoomanim",this._animateZoom,this)},onRemove:function(t){this.options.pane?this.getPane().removeChild(this._canvas):t.getPanes().overlayPane.removeChild(this._canvas),t.off("click",this._executeListeners,this),t.off("mousemove",this._executeListeners,this),t.off("moveend",this._reset,this),t.off("resize",this._reset,this),t._zoomAnimated&&t.off("zoomanim",this._animateZoom,this)},addTo:function(t){return t.addLayer(this),this},clearLayers:function(){this._latlngMarkers=null,this._markers=null,this._redraw(!0)},_animateZoom:function(e){var a=this._map.getZoomScale(e.zoom),n=this._map._latLngBoundsToNewLayerBounds(this._map.getBounds(),e.zoom,e.center).min;t.DomUtil.setTransform(this._canvas,n,a)},_addMarker:function(e,a,n){e._map=this._map,this._markers||(this._markers=new rbush),this._latlngMarkers||(this._latlngMarkers=new rbush,this._latlngMarkers.dirty=0,this._latlngMarkers.total=0),t.Util.stamp(e);var i=this._map.latLngToContainerPoint(a),o=e.options.icon.options.iconSize,r=o[0]/2,s=o[1]/2,c=[{minX:i.x-r,minY:i.y-s,maxX:i.x+r,maxY:i.y+s,data:e},{minX:a.lng,minY:a.lat,maxX:a.lng,maxY:a.lat,data:e}];return this._latlngMarkers.dirty++,this._latlngMarkers.total++,!0===n&&this._drawMarker(e,i),c},_drawMarker:function(t,e){var a=this;this._imageLookup||(this._imageLookup={}),e||(e=a._map.latLngToContainerPoint(t.getLatLng()));var n=t.options.icon.options.iconUrl;if(t.canvas_img)a._drawImage(t,e);else if(a._imageLookup[n])t.canvas_img=a._imageLookup[n][0],!1===a._imageLookup[n][1]?a._imageLookup[n][2].push([t,e]):a._drawImage(t,e);else{var i=new Image;i.src=n,t.canvas_img=i,a._imageLookup[n]=[i,!1,[[t,e]]],i.onload=function(){a._imageLookup[n][1]=!0,a._imageLookup[n][2].forEach(function(t){a._drawImage(t[0],t[1])})}}},_drawImage:function(t,e){var a=t.options.icon.options;this._context.drawImage(t.canvas_img,e.x-a.iconAnchor[0],e.y-a.iconAnchor[1],a.iconSize[0],a.iconSize[1])},_reset:function(){this.initializeCanvas(),this._redraw()},_redraw:function(t){var e=this;if(t&&this._context.clearRect(0,0,this._canvas.width,this._canvas.height),this._map&&this._latlngMarkers){var a=[];e._latlngMarkers.dirty/e._latlngMarkers.total>=.1&&(e._latlngMarkers.all().forEach(function(t){a.push(t)}),e._latlngMarkers.clear(),e._latlngMarkers.load(a),e._latlngMarkers.dirty=0,a=[]);var n=e._map.getBounds(),i={minX:n.getWest(),minY:n.getSouth(),maxX:n.getEast(),maxY:n.getNorth()},o=[];e._latlngMarkers.search(i).forEach(function(t){var n=e._map.latLngToContainerPoint(t.data.getLatLng()),i=t.data.options.icon.options.iconSize,r=i[0]/2,s=i[1]/2,c={minX:n.x-r,minY:n.y-s,maxX:n.x+r,maxY:n.y+s,data:t.data};a.push(c),o.push({e:t,pointPos:n})}),this._enforceZIndex&&o.sort((t,e)=>t.e.data.options.zIndexOffset-e.e.data.options.zIndexOffset),o.forEach(t=>{e._drawMarker(t.e.data,t.pointPos)}),this._markers.clear(),this._markers.load(a)}},_initCanvas:function(){this._canvas=t.DomUtil.create("canvas","leaflet-canvas-icon-layer leaflet-layer");var e=this._map.getSize();this._canvas.width=e.x,this._canvas.height=e.y,this._context=this._canvas.getContext("2d");var a=this._map.options.zoomAnimation&&t.Browser.any3d;t.DomUtil.addClass(this._canvas,"leaflet-zoom-"+(a?"animated":"hide"))},addOnClickListener:function(t){this._onClickListeners.push(t)},addOnHoverListener:function(t){this._onHoverListeners.push(t)},_executeListeners:function(t){if(this._markers){var e=this,a=t.containerPoint.x,n=t.containerPoint.y;e._openToolTip&&(e._openToolTip.closeTooltip(),delete e._openToolTip);var i=this._markers.search({minX:a,minY:n,maxX:a,maxY:n});i&&i.length>0?(e._map._container.style.cursor="pointer","click"===t.type&&(i[0].data.getPopup()&&i[0].data.openPopup(),e._onClickListeners.forEach(function(e){e(t,i)})),"mousemove"===t.type&&(i[0].data.getTooltip()&&(e._openToolTip=i[0].data,i[0].data.openTooltip()),e._onHoverListeners.forEach(function(e){e(t,i)}))):e._map._container.style.cursor=""}}});t.canvasIconLayer=function(t){return new e(t)}}},function(t,e,a){var n=a(3);window.L.CanvasIconLayer=n(L)}]);