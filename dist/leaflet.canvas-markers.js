!function(t){var n={};function i(a){if(n[a])return n[a].exports;var e=n[a]={i:a,l:!1,exports:{}};return t[a].call(e.exports,e,e.exports,i),e.l=!0,e.exports}i.m=t,i.c=n,i.d=function(t,n,a){i.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:a})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,n){if(1&n&&(t=i(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var e in t)i.d(a,e,function(n){return t[n]}.bind(null,e));return a},i.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(n,"a",n),n},i.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},i.p="",i(i.s=0)}([function(t,n,i){var a=i(1),e=i(3);window.L.CanvasIconLayer=e(L),window.rbush=a},function(t,n,i){"use strict";t.exports=e,t.exports.default=e;var a=i(2);function e(t,n){if(!(this instanceof e))return new e(t,n);this._maxEntries=Math.max(4,t||9),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),n&&this._initFormat(n),this.clear()}function r(t,n,i){if(!i)return n.indexOf(t);for(var a=0;a<n.length;a++)if(i(t,n[a]))return a;return-1}function o(t,n){s(t,0,t.children.length,n,t)}function s(t,n,i,a,e){e||(e=_(null)),e.minX=1/0,e.minY=1/0,e.maxX=-1/0,e.maxY=-1/0;for(var r,o=n;o<i;o++)r=t.children[o],h(e,t.leaf?a(r):r);return e}function h(t,n){return t.minX=Math.min(t.minX,n.minX),t.minY=Math.min(t.minY,n.minY),t.maxX=Math.max(t.maxX,n.maxX),t.maxY=Math.max(t.maxY,n.maxY),t}function l(t,n){return t.minX-n.minX}function c(t,n){return t.minY-n.minY}function m(t){return(t.maxX-t.minX)*(t.maxY-t.minY)}function u(t){return t.maxX-t.minX+(t.maxY-t.minY)}function f(t,n){return t.minX<=n.minX&&t.minY<=n.minY&&n.maxX<=t.maxX&&n.maxY<=t.maxY}function d(t,n){return n.minX<=t.maxX&&n.minY<=t.maxY&&n.maxX>=t.minX&&n.maxY>=t.minY}function _(t){return{children:t,height:1,leaf:!0,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function p(t,n,i,e,r){for(var o,s=[n,i];s.length;)(i=s.pop())-(n=s.pop())<=e||(o=n+Math.ceil((i-n)/e/2)*e,a(t,o,n,i,r),s.push(n,o,o,i))}e.prototype={all:function(){return this._all(this.data,[])},search:function(t){var n=this.data,i=[],a=this.toBBox;if(!d(t,n))return i;for(var e,r,o,s,h=[];n;){for(e=0,r=n.children.length;e<r;e++)o=n.children[e],d(t,s=n.leaf?a(o):o)&&(n.leaf?i.push(o):f(t,s)?this._all(o,i):h.push(o));n=h.pop()}return i},collides:function(t){var n=this.data,i=this.toBBox;if(!d(t,n))return!1;for(var a,e,r,o,s=[];n;){for(a=0,e=n.children.length;a<e;a++)if(r=n.children[a],d(t,o=n.leaf?i(r):r)){if(n.leaf||f(t,o))return!0;s.push(r)}n=s.pop()}return!1},load:function(t){if(!t||!t.length)return this;if(t.length<this._minEntries){for(var n=0,i=t.length;n<i;n++)this.insert(t[n]);return this}var a=this._build(t.slice(),0,t.length-1,0);if(this.data.children.length)if(this.data.height===a.height)this._splitRoot(this.data,a);else{if(this.data.height<a.height){var e=this.data;this.data=a,a=e}this._insert(a,this.data.height-a.height-1,!0)}else this.data=a;return this},insert:function(t){return t&&this._insert(t,this.data.height-1),this},clear:function(){return this.data=_([]),this},remove:function(t,n){if(!t)return this;for(var i,a,e,o,s=this.data,h=this.toBBox(t),l=[],c=[];s||l.length;){if(s||(s=l.pop(),a=l[l.length-1],i=c.pop(),o=!0),s.leaf&&-1!==(e=r(t,s.children,n)))return s.children.splice(e,1),l.push(s),this._condense(l),this;o||s.leaf||!f(s,h)?a?(i++,s=a.children[i],o=!1):s=null:(l.push(s),c.push(i),i=0,a=s,s=s.children[0])}return this},toBBox:function(t){return t},compareMinX:l,compareMinY:c,toJSON:function(){return this.data},fromJSON:function(t){return this.data=t,this},_all:function(t,n){for(var i=[];t;)t.leaf?n.push.apply(n,t.children):i.push.apply(i,t.children),t=i.pop();return n},_build:function(t,n,i,a){var e,r=i-n+1,s=this._maxEntries;if(r<=s)return o(e=_(t.slice(n,i+1)),this.toBBox),e;a||(a=Math.ceil(Math.log(r)/Math.log(s)),s=Math.ceil(r/Math.pow(s,a-1))),(e=_([])).leaf=!1,e.height=a;var h,l,c,m,u=Math.ceil(r/s),f=u*Math.ceil(Math.sqrt(s));for(p(t,n,i,f,this.compareMinX),h=n;h<=i;h+=f)for(p(t,h,c=Math.min(h+f-1,i),u,this.compareMinY),l=h;l<=c;l+=u)m=Math.min(l+u-1,c),e.children.push(this._build(t,l,m,a-1));return o(e,this.toBBox),e},_chooseSubtree:function(t,n,i,a){for(var e,r,o,s,h,l,c,u,f,d;a.push(n),!n.leaf&&a.length-1!==i;){for(c=u=1/0,e=0,r=n.children.length;e<r;e++)h=m(o=n.children[e]),f=t,d=o,(l=(Math.max(d.maxX,f.maxX)-Math.min(d.minX,f.minX))*(Math.max(d.maxY,f.maxY)-Math.min(d.minY,f.minY))-h)<u?(u=l,c=h<c?h:c,s=o):l===u&&h<c&&(c=h,s=o);n=s||n.children[0]}return n},_insert:function(t,n,i){var a=this.toBBox,e=i?t:a(t),r=[],o=this._chooseSubtree(e,this.data,n,r);for(o.children.push(t),h(o,e);n>=0&&r[n].children.length>this._maxEntries;)this._split(r,n),n--;this._adjustParentBBoxes(e,r,n)},_split:function(t,n){var i=t[n],a=i.children.length,e=this._minEntries;this._chooseSplitAxis(i,e,a);var r=this._chooseSplitIndex(i,e,a),s=_(i.children.splice(r,i.children.length-r));s.height=i.height,s.leaf=i.leaf,o(i,this.toBBox),o(s,this.toBBox),n?t[n-1].children.push(s):this._splitRoot(i,s)},_splitRoot:function(t,n){this.data=_([t,n]),this.data.height=t.height+1,this.data.leaf=!1,o(this.data,this.toBBox)},_chooseSplitIndex:function(t,n,i){var a,e,r,o,h,l,c,u,f,d,_,p,g,x;for(l=c=1/0,a=n;a<=i-n;a++)e=s(t,0,a,this.toBBox),r=s(t,a,i,this.toBBox),f=e,d=r,void 0,void 0,void 0,void 0,_=Math.max(f.minX,d.minX),p=Math.max(f.minY,d.minY),g=Math.min(f.maxX,d.maxX),x=Math.min(f.maxY,d.maxY),o=Math.max(0,g-_)*Math.max(0,x-p),h=m(e)+m(r),o<l?(l=o,u=a,c=h<c?h:c):o===l&&h<c&&(c=h,u=a);return u},_chooseSplitAxis:function(t,n,i){var a=t.leaf?this.compareMinX:l,e=t.leaf?this.compareMinY:c;this._allDistMargin(t,n,i,a)<this._allDistMargin(t,n,i,e)&&t.children.sort(a)},_allDistMargin:function(t,n,i,a){t.children.sort(a);var e,r,o=this.toBBox,l=s(t,0,n,o),c=s(t,i-n,i,o),m=u(l)+u(c);for(e=n;e<i-n;e++)r=t.children[e],h(l,t.leaf?o(r):r),m+=u(l);for(e=i-n-1;e>=n;e--)r=t.children[e],h(c,t.leaf?o(r):r),m+=u(c);return m},_adjustParentBBoxes:function(t,n,i){for(var a=i;a>=0;a--)h(n[a],t)},_condense:function(t){for(var n,i=t.length-1;i>=0;i--)0===t[i].children.length?i>0?(n=t[i-1].children).splice(n.indexOf(t[i]),1):this.clear():o(t[i],this.toBBox)},_initFormat:function(t){var n=["return a"," - b",";"];this.compareMinX=new Function("a","b",n.join(t[0])),this.compareMinY=new Function("a","b",n.join(t[1])),this.toBBox=new Function("a","return {minX: a"+t[0]+", minY: a"+t[1]+", maxX: a"+t[2]+", maxY: a"+t[3]+"};")}}},function(t,n,i){t.exports=function(){"use strict";function t(t,n,i){var a=t[n];t[n]=t[i],t[i]=a}function n(t,n){return t<n?-1:t>n?1:0}return function(i,a,e,r,o){!function n(i,a,e,r,o){for(;r>e;){if(r-e>600){var s=r-e+1,h=a-e+1,l=Math.log(s),c=.5*Math.exp(2*l/3),m=.5*Math.sqrt(l*c*(s-c)/s)*(h-s/2<0?-1:1),u=Math.max(e,Math.floor(a-h*c/s+m)),f=Math.min(r,Math.floor(a+(s-h)*c/s+m));n(i,a,u,f,o)}var d=i[a],_=e,p=r;for(t(i,e,a),o(i[r],d)>0&&t(i,e,r);_<p;){for(t(i,_,p),_++,p--;o(i[_],d)<0;)_++;for(;o(i[p],d)>0;)p--}0===o(i[e],d)?t(i,e,p):t(i,++p,r),p<=a&&(e=p+1),a<=p&&(r=p-1)}}(i,a,e||0,r||i.length-1,o||n)}}()},function(t,n,i){"use strict";t.exports=function(t){var n=(t.Layer?t.Layer:t.Class).extend({initialize:function(n){t.setOptions(this,n),this._onClickListeners=[],this._onHoverListeners=[],this._enforceZIndex=!1},initializeCanvas:function(){var n=this._map.containerPointToLayerPoint([0,0]);t.DomUtil.setPosition(this._canvas,n);var i=this._map.getSize();this._canvas.width=i.x,this._canvas.height=i.y},setOptions:function(n){return t.setOptions(this,n),this.redraw()},setEnforceZIndex:function(t){this._enforceZIndex=t},redraw:function(){this._redraw(!0)},addMarkers:function(t){var n=this,i=[],a=[];this._enforceZIndex&&t.sort((t,n)=>t.options.zIndexOffset-n.options.zIndexOffset),t.forEach(function(t){if("markerPane"==t.options.pane&&t.options.icon){var e=t.getLatLng(),r=n._map.getBounds().contains(e),o=n._addMarker(t,e,r);!0===r&&i.push(o[0]),a.push(o[1])}else console.error("Layer isn't a marker")}),n._markers.load(i),n._latlngMarkers.load(a)},addMarker:function(t){var n=t.getLatLng(),i=this._map.getBounds().contains(n),a=this._addMarker(t,n,i);!0===i&&this._markers.insert(a[0]),this._latlngMarkers.insert(a[1])},addLayer:function(t){"markerPane"==t.options.pane&&t.options.icon?this.addMarker(t):console.error("Layer isn't a marker")},addLayers:function(t){this.addMarkers(t)},removeLayer:function(t){this.removeMarker(t,!0)},removeMarker:function(t,n){t.minX&&(t=t.data);var i=t.getLatLng(),a=this._map.getBounds().contains(i),e={minX:i.lng,minY:i.lat,maxX:i.lng,maxY:i.lat,data:t};this._latlngMarkers.remove(e,function(t,n){return t.data._leaflet_id===n.data._leaflet_id}),this._latlngMarkers.total--,this._latlngMarkers.dirty++,!0===a&&!0===n&&this._redraw(!0)},onAdd:function(t){this._map=t,this._canvas||this._initCanvas(),this.options.pane?this.getPane().appendChild(this._canvas):t._panes.overlayPane.appendChild(this._canvas),t.on("moveend",this._reset,this),t.on("resize",this._reset,this),t.on("click",this._executeListeners,this),t.on("mousemove",this._executeListeners,this),t._zoomAnimated&&t.on("zoomanim",this._animateZoom,this)},onRemove:function(t){this.options.pane?this.getPane().removeChild(this._canvas):t.getPanes().overlayPane.removeChild(this._canvas),t.off("click",this._executeListeners,this),t.off("mousemove",this._executeListeners,this),t.off("moveend",this._reset,this),t.off("resize",this._reset,this),t._zoomAnimated&&t.off("zoomanim",this._animateZoom,this)},addTo:function(t){return t.addLayer(this),this},clearLayers:function(){this._latlngMarkers=null,this._markers=null,this._redraw(!0)},_animateZoom:function(n){var i=this._map.getZoomScale(n.zoom),a=this._map._latLngBoundsToNewLayerBounds(this._map.getBounds(),n.zoom,n.center).min;t.DomUtil.setTransform(this._canvas,a,i)},_addMarker:function(n,i,a){n._map=this._map,this._markers||(this._markers=new rbush),this._latlngMarkers||(this._latlngMarkers=new rbush,this._latlngMarkers.dirty=0,this._latlngMarkers.total=0),t.Util.stamp(n);var e=this._map.latLngToContainerPoint(i),r=n.options.icon.options.iconSize,o=r[0]/2,s=r[1]/2,h=[{minX:e.x-o,minY:e.y-s,maxX:e.x+o,maxY:e.y+s,data:n},{minX:i.lng,minY:i.lat,maxX:i.lng,maxY:i.lat,data:n}];return this._latlngMarkers.dirty++,this._latlngMarkers.total++,!0===a&&this._drawMarker(n,e),h},_drawMarker:function(t,n){var i=this;this._imageLookup||(this._imageLookup={}),n||(n=i._map.latLngToContainerPoint(t.getLatLng()));var a=t.options.icon.options.iconUrl;if(t.canvas_img)i._drawImage(t,n);else if(i._imageLookup[a])t.canvas_img=i._imageLookup[a][0],!1===i._imageLookup[a][1]?i._imageLookup[a][2].push([t,n]):i._drawImage(t,n);else{var e=new Image;e.src=a,t.canvas_img=e,i._imageLookup[a]=[e,!1,[[t,n]]],e.onload=function(){i._imageLookup[a][1]=!0,i._imageLookup[a][2].forEach(function(t){i._drawImage(t[0],t[1])})}}},_drawImage:function(t,n){var i=t.options.icon.options;this._context.drawImage(t.canvas_img,n.x-i.iconAnchor[0],n.y-i.iconAnchor[1],i.iconSize[0],i.iconSize[1])},_reset:function(){this.initializeCanvas(),this._redraw()},_redraw:function(t){var n=this;if(t&&this._context.clearRect(0,0,this._canvas.width,this._canvas.height),this._map&&this._latlngMarkers){var i=[];n._latlngMarkers.dirty/n._latlngMarkers.total>=.1&&(n._latlngMarkers.all().forEach(function(t){i.push(t)}),n._latlngMarkers.clear(),n._latlngMarkers.load(i),n._latlngMarkers.dirty=0,i=[]);var a=n._map.getBounds(),e={minX:a.getWest(),minY:a.getSouth(),maxX:a.getEast(),maxY:a.getNorth()},r=[];n._latlngMarkers.search(e).forEach(function(t){var a=n._map.latLngToContainerPoint(t.data.getLatLng()),e=t.data.options.icon.options.iconSize,o=e[0]/2,s=e[1]/2,h={minX:a.x-o,minY:a.y-s,maxX:a.x+o,maxY:a.y+s,data:t.data};i.push(h),r.push({e:t,pointPos:a})}),this._enforceZIndex&&r.sort((t,n)=>t.e.data.options.zIndexOffset-n.e.data.options.zIndexOffset),r.forEach(t=>{n._drawMarker(t.e.data,t.pointPos)}),this._markers.clear(),this._markers.load(i)}},_initCanvas:function(){this._canvas=t.DomUtil.create("canvas","leaflet-canvas-icon-layer leaflet-layer");var n=this._map.getSize();this._canvas.width=n.x,this._canvas.height=n.y,this._context=this._canvas.getContext("2d");var i=this._map.options.zoomAnimation&&t.Browser.any3d;t.DomUtil.addClass(this._canvas,"leaflet-zoom-"+(i?"animated":"hide"))},addOnClickListener:function(t){this._onClickListeners.push(t)},addOnHoverListener:function(t){this._onHoverListeners.push(t)},_executeListeners:function(t){if(this._markers){var n=this,i=t.containerPoint.x,a=t.containerPoint.y;n._openToolTip&&(n._openToolTip.closeTooltip(),delete n._openToolTip);var e=this._markers.search({minX:i,minY:a,maxX:i,maxY:a});e&&e.length>0?(n._map._container.style.cursor="pointer","click"===t.type&&(e[0].data.getPopup()&&e[0].data.openPopup(),n._onClickListeners.forEach(function(n){n(t,e)})),"mousemove"===t.type&&(e[0].data.getTooltip()&&(n._openToolTip=e[0].data,e[0].data.openTooltip()),n._onHoverListeners.forEach(function(n){n(t,e)}))):n._map._container.style.cursor=""}}});t.canvasIconLayer=function(t){return new n(t)}}}]);