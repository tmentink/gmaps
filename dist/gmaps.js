/*!
 * GMaps v1.2.0-alpha (https://github.com/tmentink/gmaps)
 * Copyright 2017 Trent Mentink
 * Licensed under MIT
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
  return typeof obj;
} : function(obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

(function(window) {
  "use strict";
  if (window.jQuery) {
    return;
  }
  var class2type = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regexp",
    "[object Object]": "object",
    "[object Error]": "error"
  };
  var getProto = Object.getPrototypeOf;
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var fnToString = hasOwn.toString;
  var ObjectFunctionString = fnToString.call(Object);
  var $ = {};
  $.type = function(obj) {
    if (!obj) {
      return obj + "";
    }
    return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
  };
  $.isWindow = function(obj) {
    return obj != null && obj === obj.window;
  };
  $.isFunction = function(obj) {
    return $.type(obj) === "function";
  };
  $.isArray = Array.isArray || function(obj) {
    return $.type(obj) === "array";
  };
  $.isNumeric = function(obj) {
    var type = $.type(obj);
    return (type === "number" || type === "string") && !isNaN(obj - parseFloat(obj));
  };
  $.isPlainObject = function(obj) {
    var proto, Ctor;
    if (!obj || toString.call(obj) !== "[object Object]") {
      return false;
    }
    proto = getProto(obj);
    if (!proto) {
      return true;
    }
    Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
  };
  $.isEmptyObject = function(obj) {
    var name;
    for (name in obj) {
      return false;
    }
    return true;
  };
  $.extend = function() {
    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[i] || {};
      i++;
    }
    if ((typeof target === "undefined" ? "undefined" : _typeof(target)) !== "object" && !$.isFunction(target)) {
      target = {};
    }
    if (i === length) {
      target = this;
      i--;
    }
    for (;i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && Array.isArray(src) ? src : [];
            } else {
              clone = src && $.isPlainObject(src) ? src : {};
            }
            target[name] = $.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  };
  window.$ = $;
})(window);

var gmap = function gmap(config) {
  var _this = this;
  config = $.extend(true, {}, gmap.Config, config);
  delete config.Delimiter;
  this.Components = {
    Label: new gmap.LabelArray(this),
    Marker: new gmap.MarkerArray(this),
    Polygon: new gmap.PolygonArray(this)
  };
  this.Config = config;
  this.Init = {
    Bounds: undefined,
    Options: config.MapOptions
  };
  this.Obj = new google.maps.Map(document.getElementById(config.MapId), config.MapOptions);
  this.Obj["GMaps"] = {
    Id: config.MapId,
    Map: this,
    Parent: this,
    Version: gmap.Const.Version
  };
  this.Type = gmap.Const.Component.Type.MAP;
  this.Version = gmap.Const.Version;
  google.maps.event.addListenerOnce(this.Obj, gmap.Const.Event.Type.TILES_LOADED, function() {
    _this.Init.Bounds = _this.Obj.getBounds();
  });
};

gmap.prototype = {
  addListener: function addListener(type, fn) {
    return gmap.Core.addListener(this, null, type, fn);
  },
  addLabel: function addLabel(parms) {
    return gmap.Core.addComponent(this, gmap.Const.Component.Type.LABEL, parms);
  },
  addMarker: function addMarker(parms) {
    return gmap.Core.addComponent(this, gmap.Const.Component.Type.MARKER, parms);
  },
  addPolygon: function addPolygon(parms) {
    return gmap.Core.addComponent(this, gmap.Const.Component.Type.POLYGON, parms);
  },
  getCenter: function getCenter() {
    return this.Obj.getCenter();
  },
  labels: function labels(ids) {
    return gmap.Core.search(this, gmap.Const.Component.Type.LABEL, ids);
  },
  markers: function markers(ids) {
    return gmap.Core.search(this, gmap.Const.Component.Type.MARKER, ids);
  },
  polygons: function polygons(ids) {
    return gmap.Core.search(this, gmap.Const.Component.Type.POLYGON, ids);
  },
  removeAllListeners: function removeAllListeners() {
    return gmap.Core.removeAllListeners(this);
  },
  removeListenerType: function removeListenerType(type) {
    return gmap.Core.removeListenerType(this, null, type);
  },
  reset: function reset() {
    return gmap.Core.reset(this);
  },
  setBounds: function setBounds(parms) {
    return gmap.Core.setBounds(this, parms);
  },
  update: function update(options) {
    return gmap.Core.update(this, null, options);
  }
};

!function(gmap) {
  "use strict";
  gmap.Config = {
    Delimiter: {
      LatLng: ",",
      LatLngPair: "|"
    },
    LabelOptions: {
      fontSize: 14,
      fontColor: "#000",
      strokeColor: "#FFF",
      strokeWeight: 1,
      align: "center"
    },
    MapId: "gmap",
    MapOptions: {
      zoom: 6,
      center: {
        lat: 37.5,
        lng: -120
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      clickableIcons: false,
      mapTypeControl: false,
      streetViewControl: false
    },
    MarkerOptions: {},
    PolygonOptions: {
      strokeColor: "#000",
      strokeOpacity: .8,
      strokeWeight: 1,
      fillColor: "#0275D8",
      fillOpacity: .8
    }
  };
  return gmap;
}(gmap || {});

!function(gmap) {
  "use strict";
  gmap.Const = {
    Component: {
      Properties: {
        CHILD_TYPE: "ChildType",
        MAP: "Map",
        TYPE: "Type"
      },
      Type: {
        LABEL: "Label",
        LABEL_ARRAY: "LabelArray",
        MAP: "Map",
        MARKER: "Marker",
        MARKER_ARRAY: "MarkerArray",
        POLYGON: "Polygon",
        POLYGON_ARRAY: "PolygonArray"
      }
    },
    Event: {
      Type: {
        ANIMATION_CHANGED: "animation_changed",
        BOUNDS_CHANGED: "bounds_changed",
        CENTER_CHANGED: "center_changed",
        CLICK: "click",
        CLICKABLE_CHANGED: "clickable_changed",
        CURSOR_CHANGED: "cursor_changed",
        DOUBLE_CLICK: "dblclick",
        DRAG: "drag",
        DRAG_END: "dragend",
        DRAG_START: "dragstart",
        DRAGGABLE_CHANGED: "draggable_changed",
        FLAT_CHANGED: "flat_changed",
        HEADING_CHANGED: "heading_changed",
        ICON_CHANGED: "icon_changed",
        IDLE: "idle",
        MAP_TYPE_ID_CHANGED: "maptypeid_changed",
        MOUSE_DOWN: "mousedown",
        MOUSE_MOVE: "mousemove",
        MOUSE_OUT: "mouseout",
        MOUSE_OVER: "mouseover",
        MOUSE_UP: "mouseup",
        POSITION_CHANGED: "position_changed",
        PROJECTION_CHANGED: "projection_changed",
        RESIZE: "resize",
        RIGHT_CLICK: "rightclick",
        SHAPE_CHANGED: "shape_changed",
        TILES_LOADED: "tilesloaded",
        TILT_CHANGED: "tilt_changed",
        TITLE_CHANGED: "title_changed",
        VISIBLE_CHANGED: "visible_changed",
        ZINDEX_CHANGED: "zindex_changed",
        ZOOM_CHANGED: "zoom_changed"
      }
    }
  };
  return gmap;
}(gmap || {});

!function(gmap) {
  "use strict";
  var Conversions = {
    center: function center(parms) {
      if ($.type(parms.center) == "string") {
        parms.center = gmap.Util.toLatLng(parms.center);
      }
    },
    paths: function paths(parms) {
      if ($.type(parms.paths) == "string") {
        parms.paths = gmap.Util.toLatLngArray(parms.paths);
      }
    },
    position: function position(parms) {
      if ($.type(parms.position) == "string") {
        parms.position = gmap.Util.toLatLng(parms.position);
      }
    },
    text: function text(parms) {
      parms.text = parms.text || parms.id;
    }
  };
  var ConvertableComponentOptions = {
    Label: {
      position: Conversions.position,
      text: Conversions.text
    },
    Map: {
      center: Conversions.center
    },
    Marker: {
      position: Conversions.position
    },
    Polygon: {
      paths: Conversions.paths
    }
  };
  var ComponentTypeAlias = {
    label: gmap.Const.Component.Type.LABEL,
    labels: gmap.Const.Component.Type.LABEL,
    map: gmap.Const.Component.Type.MAP,
    maps: gmap.Const.Component.Type.MAP,
    marker: gmap.Const.Component.Type.MARKER,
    markers: gmap.Const.Component.Type.MARKER,
    polygon: gmap.Const.Component.Type.POLYGON,
    polygons: gmap.Const.Component.Type.POLYGON
  };
  var EventTypeAlias = {
    animationchanged: gmap.Const.Event.Type.ANIMATION_CHANGED,
    boundschanged: gmap.Const.Event.Type.BOUNDS_CHANGED,
    centerchanged: gmap.Const.Event.Type.CENTER_CHANGED,
    click: gmap.Const.Event.Type.CLICK,
    clickablechanged: gmap.Const.Event.Type.CLICKABLE_CHANGED,
    cursorchanged: gmap.Const.Event.Type.CURSOR_CHANGED,
    doubleclick: gmap.Const.Event.Type.DOUBLE_CLICK,
    drag: gmap.Const.Event.Type.DRAG,
    dragend: gmap.Const.Event.Type.DRAG_END,
    dragstart: gmap.Const.Event.Type.DRAG_START,
    draggablechanged: gmap.Const.Event.Type.DRAGGABLE_CHANGED,
    flatchanged: gmap.Const.Event.Type.FLAT_CHANGED,
    headingchanged: gmap.Const.Event.Type.HEADING_CHANGED,
    iconchanged: gmap.Const.Event.Type.ICON_CHANGED,
    idle: gmap.Const.Event.Type.IDLE,
    maptypeidchanged: gmap.Const.Event.Type.MAP_TYPE_ID_CHANGED,
    mousedown: gmap.Const.Event.Type.MOUSE_DOWN,
    mousemove: gmap.Const.Event.Type.MOUSE_MOVE,
    mouseout: gmap.Const.Event.Type.MOUSE_OUT,
    mouseover: gmap.Const.Event.Type.MOUSE_OVER,
    mouseup: gmap.Const.Event.Type.MOUSE_UP,
    positionchanged: gmap.Const.Event.Type.POSITION_CHANGED,
    projectionchanged: gmap.Const.Event.Type.PROJECTION_CHANGED,
    resize: gmap.Const.Event.Type.RESIZE,
    rightclick: gmap.Const.Event.Type.RIGHT_CLICK,
    shapechanged: gmap.Const.Event.Type.SHAPE_CHANGED,
    tilesloaded: gmap.Const.Event.Type.TILES_LOADED,
    tiltchanged: gmap.Const.Event.Type.TILT_CHANGED,
    titlechanged: gmap.Const.Event.Type.TITLE_CHANGED,
    visiblechanged: gmap.Const.Event.Type.VISIBLE_CHANGED,
    zindexchanged: gmap.Const.Event.Type.ZINDEX_CHANGED,
    zoomchanged: gmap.Const.Event.Type.ZOOM_CHANGED
  };
  /**
   * Converts the supplied parameters based on the component type
   */
  var convertCompOptions = function convertCompOptions(type, parms) {
    type = type.replace("Array", "");
    Object.keys(ConvertableComponentOptions[type]).forEach(function(key) {
      ConvertableComponentOptions[type][key](parms);
    });
    return parms;
  };
  /**
   * Returns a copy of source minus the values of exclude
   */
  var copy = function copy(source, exclude) {
    var src_copy = $.extend(true, {}, source);
    if ($.type(exclude) == "object") {
      exclude = Object.keys(exclude);
    } else if ($.type(exclude) == "string") {
      exclude = exclude.split(",");
    }
    var src_proto = Object.keys(Object.getPrototypeOf(source));
    var base_proto = Object.keys(Object.getPrototypeOf(new gmap.BaseComponentArray("", "")));
    exclude = src_proto.concat(exclude);
    exclude = base_proto.concat(exclude);
    for (var i = 0, i_end = exclude.length; i < i_end; i++) {
      delete src_copy[exclude[i]];
    }
    var new_comp = source.Type ? new gmap[source.Type]() : {};
    return $.extend(new_comp, src_copy);
  };
  /**
   * Returns component type constant
   */
  var getComponentType = function getComponentType(type) {
    type = type.toLowerCase().replace(/\s+/g, "");
    return ComponentTypeAlias[type] || type;
  };
  /**
   * Returns event type constant
   */
  var getEventType = function getEventType(event) {
    event = event.toLowerCase().replace(/\s+/g, "");
    return EventTypeAlias[event] || event;
  };
  /**
   * Returns an array of the component's google objects
   */
  var getGoogleObjects = function getGoogleObjects(compArray) {
    var ids = getIds(compArray);
    var googleObjects = ids.map(function(id) {
      return compArray[id].Obj;
    });
    return googleObjects;
  };
  /**
   * Returns an array of the component's ids
   */
  var getIds = function getIds(compArray) {
    var ids = Object.keys(compArray);
    for (var prop in gmap.Const.Component.Properties) {
      var index = ids.indexOf(gmap.Const.Component.Properties[prop]);
      if (index !== -1) {
        ids.splice(index, 1);
      }
    }
    return ids;
  };
  /**
   * Returns value converted into an array
   */
  var toArray = function toArray(value) {
    if ($.type(value) == "number") {
      value = value.toString().split();
    } else if ($.type(value) == "string") {
      value = value.split();
    } else if ($.type(value) == "array") {
      value = value.toString().split(",");
    }
    return value;
  };
  /**
   * Converts a formatted string into a LatLng object
   */
  var toLatLng = function toLatLng(str) {
    var Delimiter = {
      LatLng: gmap.Config.Delimiter.LatLng || ","
    };
    var points = str.split(Delimiter.LatLng);
    return new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]));
  };
  /**
   * Converts a formatted string into an array of LatLng objects
   */
  var toLatLngArray = function toLatLngArray(str) {
    var Delimiter = {
      LatLng: gmap.Config.Delimiter.LatLng || ",",
      LatLngPair: gmap.Config.Delimiter.LatLngPair || "|"
    };
    var latLngArray = [];
    var coordPairs = str.split(Delimiter.LatLngPair);
    for (var i = 0, i_end = coordPairs.length; i < i_end; i++) {
      var points = coordPairs[i].split(Delimiter.LatLng);
      var latLng = new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]));
      latLngArray.push(latLng);
    }
    return latLngArray;
  };
  gmap.Util = {
    convertCompOptions: convertCompOptions,
    copy: copy,
    getComponentType: getComponentType,
    getEventType: getEventType,
    getGoogleObjects: getGoogleObjects,
    getIds: getIds,
    toArray: toArray,
    toLatLng: toLatLng,
    toLatLngArray: toLatLngArray
  };
  return gmap;
}(gmap || {});

!function(gmap) {
  "use strict";
  var BaseComponent = function BaseComponent(id, options, obj, type) {
    _classCallCheck(this, BaseComponent);
    var map = options.map.GMaps.Parent;
    this.Id = id;
    this.Init = {
      Options: options
    };
    this.Map = map;
    this.Obj = obj;
    this.Obj["GMaps"] = {
      Id: id,
      Map: map,
      Parent: this,
      Version: gmap.Const.Version
    };
    this.Type = type;
  };
  gmap.BaseComponent = BaseComponent;
  return gmap;
}(gmap || {});

!function(gmap) {
  "use strict";
  var BaseComponentArray = function() {
    function BaseComponentArray(map, type, childType) {
      _classCallCheck(this, BaseComponentArray);
      this.ChildType = childType;
      this.Map = map;
      this.Type = type;
    }
    BaseComponentArray.prototype.getBounds = function getBounds() {
      return gmap.Core.getBounds(this, this.getIds());
    };
    BaseComponentArray.prototype.getCenter = function getCenter() {
      return gmap.Core.getCenter(this, this.getIds());
    };
    BaseComponentArray.prototype.getGoogleObjects = function getGoogleObjects() {
      return gmap.Util.getGoogleObjects(this);
    };
    BaseComponentArray.prototype.getIds = function getIds() {
      return gmap.Util.getIds(this);
    };
    BaseComponentArray.prototype.hide = function hide() {
      return gmap.Core.hide(this, this.getIds());
    };
    BaseComponentArray.prototype.others = function others() {
      return gmap.Util.copy(this.Map.Components[this.ChildType], this.getIds());
    };
    BaseComponentArray.prototype.remove = function remove() {
      return gmap.Core.remove(this, this.getIds());
    };
    BaseComponentArray.prototype.reset = function reset() {
      return gmap.Core.reset(this, this.getIds());
    };
    BaseComponentArray.prototype.show = function show() {
      return gmap.Core.show(this, this.getIds());
    };
    BaseComponentArray.prototype.toggle = function toggle() {
      return gmap.Core.toggle(this, this.getIds());
    };
    BaseComponentArray.prototype.update = function update(options) {
      return gmap.Core.update(this, this.getIds(), options);
    };
    BaseComponentArray.prototype.zoom = function zoom() {
      var parms = {};
      parms[this.ChildType] = this.getIds();
      gmap.Core.setBounds(this.Map, parms);
      return this;
    };
    return BaseComponentArray;
  }();
  gmap.BaseComponentArray = BaseComponentArray;
  return gmap;
}(gmap || {});

!function(gmap) {
  "use strict";
  var Property = {
    ALIGN: "align",
    FONT_COLOR: "fontColor",
    FONT_FAMILY: "fontFamily",
    FONT_SIZE: "fontSize",
    MAX_ZOOM: "maxZoom",
    MIN_ZOOM: "minZoom",
    POSITION: "position",
    STROKE_WEIGHT: "strokeWeight",
    STROKE_COLOR: "strokeColor",
    VISIBLE: "visible",
    TEXT: "text",
    Z_INDEX: "zIndex"
  };
  var Default = {
    ALIGN: "center",
    FONT_COLOR: "#000",
    FONT_FAMILY: "sans-serif",
    FONT_SIZE: 14,
    STROKE_WEIGHT: 2,
    STROKE_COLOR: "#FFF",
    VISIBLE: true,
    Z_INDEX: 1e3
  };
  var googleLabel = function googleLabel(options) {
    for (var prop in Default) {
      this.set(Property[prop], Default[prop]);
    }
    this.setValues(options);
  };
  googleLabel.prototype = new google.maps.OverlayView();
  googleLabel.prototype.changed = function(prop) {
    switch (prop) {
     case Property.ALIGN:
     case Property.FONT_COLOR:
     case Property.FONT_FAMILY:
     case Property.FONT_SIZE:
     case Property.STROKE_WEIGHT:
     case Property.STROKE_COLOR:
     case Property.TEXT:
      return this.drawCanvas_();

     case Property.MAX_ZOOM:
     case Property.MIN_ZOOM:
     case Property.POSITION:
      return this.draw();

     case Property.VISIBLE:
      return this.setVisibility();
    }
  };
  googleLabel.prototype.draw = function() {
    var projection = this.getProjection();
    if (!projection) {
      return;
    }
    if (!this.canvas_) {
      return;
    }
    var latLng = this.get(Property.POSITION);
    if (!latLng) {
      return;
    }
    var pos = projection.fromLatLngToDivPixel(latLng);
    var style = this.canvas_.style;
    style["top"] = pos.y + "px";
    style["left"] = pos.x + "px";
    style["visibility"] = this.getVisible_();
  };
  googleLabel.prototype.drawCanvas_ = function() {
    var canvas = this.canvas_;
    if (!canvas) return;
    var style = canvas.style;
    style.zIndex = this.get(Property.Z_INDEX);
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = this.get(Property.STROKE_COLOR);
    ctx.fillStyle = this.get(Property.FONT_COLOR);
    ctx.font = this.get(Property.FONT_SIZE) + "px " + this.get(Property.FONT_FAMILY);
    var strokeWeight = Number(this.get(Property.STROKE_WEIGHT));
    var text = this.get(Property.TEXT).toString();
    if (text) {
      if (strokeWeight) {
        ctx.lineWidth = strokeWeight;
        ctx.strokeText(text, strokeWeight, strokeWeight);
      }
      ctx.fillText(text, strokeWeight, strokeWeight);
      var textMeasure = ctx.measureText(text);
      var textWidth = textMeasure.width + strokeWeight;
      style.marginLeft = this.getMarginLeft_(textWidth) + "px";
      style.marginTop = "-0.4em";
    }
  };
  googleLabel.prototype.getMarginLeft_ = function(textWidth) {
    switch (this.get(Property.ALIGN)) {
     case "left":
      return 0;

     case "right":
      return -textWidth;
    }
    return textWidth / -2;
  };
  googleLabel.prototype.getPosition = function() {
    return this[Property.POSITION];
  };
  googleLabel.prototype.getVisible_ = function() {
    var minZoom = this.get(Property.MIN_ZOOM);
    var maxZoom = this.get(Property.MAX_ZOOM);
    if (minZoom === undefined && maxZoom === undefined) {
      return "";
    }
    var map = this.getMap();
    if (!map) {
      return "";
    }
    var mapZoom = map.getZoom();
    if (mapZoom < minZoom || mapZoom > maxZoom) {
      return "hidden";
    }
    return "";
  };
  googleLabel.prototype.getVisible = function() {
    return this[Property.VISIBLE];
  };
  googleLabel.prototype.onAdd = function() {
    var canvas = this.canvas_ = document.createElement("canvas");
    var style = canvas.style;
    style.position = "absolute";
    var ctx = canvas.getContext("2d");
    ctx.lineJoin = "round";
    ctx.textBaseline = "top";
    this.drawCanvas_();
    this.setVisibility();
    var panes = this.getPanes();
    if (panes) {
      panes.floatPane.appendChild(canvas);
    }
  };
  googleLabel.prototype.onRemove = function() {
    var canvas = this.canvas_;
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  };
  googleLabel.prototype.setVisibility = function() {
    if (this["GMaps"]) {
      if (this.getVisible()) {
        this.setMap(this["GMaps"].Map.Obj);
      } else {
        this.setMap(null);
      }
    }
  };
  gmap.GoogleLabel = googleLabel;
  return gmap;
}(gmap || {});

!function(gmap) {
  "use strict";
  var Type = gmap.Const.Component.Type;
  var Label = function(_gmap$BaseComponent) {
    _inherits(Label, _gmap$BaseComponent);
    function Label(id, options) {
      _classCallCheck(this, Label);
      var obj = new gmap.GoogleLabel(options);
      return _possibleConstructorReturn(this, _gmap$BaseComponent.call(this, id, options, obj, Type.LABEL));
    }
    return Label;
  }(gmap.BaseComponent);
  gmap.Label = Label;
  return gmap;
}(gmap || {});

!function(gmap) {
  "use strict";
  var Type = gmap.Const.Component.Type;
  var LabelArray = function(_gmap$BaseComponentAr) {
    _inherits(LabelArray, _gmap$BaseComponentAr);
    function LabelArray(map) {
      _classCallCheck(this, LabelArray);
      return _possibleConstructorReturn(this, _gmap$BaseComponentAr.call(this, map, Type.LABEL_ARRAY, Type.LABEL));
    }
    return LabelArray;
  }(gmap.BaseComponentArray);
  gmap.LabelArray = LabelArray;
  return gmap;
}(gmap || {});

!function(gmap) {
  "use strict";
  var Type = gmap.Const.Component.Type;
  var Marker = function(_gmap$BaseComponent2) {
    _inherits(Marker, _gmap$BaseComponent2);
    function Marker(id, options) {
      _classCallCheck(this, Marker);
      var obj = new google.maps.Marker(options);
      return _possibleConstructorReturn(this, _gmap$BaseComponent2.call(this, id, options, obj, Type.MARKER));
    }
    return Marker;
  }(gmap.BaseComponent);
  gmap.Marker = Marker;
  return gmap;
}(gmap || {});

!function(gmap) {
  "use strict";
  var Type = gmap.Const.Component.Type;
  var MarkerArray = function(_gmap$BaseComponentAr2) {
    _inherits(MarkerArray, _gmap$BaseComponentAr2);
    function MarkerArray(map) {
      _classCallCheck(this, MarkerArray);
      return _possibleConstructorReturn(this, _gmap$BaseComponentAr2.call(this, map, Type.MARKER_ARRAY, Type.MARKER));
    }
    MarkerArray.prototype.addListener = function addListener(type, fn) {
      return gmap.Core.addListener(this, this.getIds(), type, fn);
    };
    MarkerArray.prototype.removeAllListeners = function removeAllListeners() {
      return gmap.Core.removeAllListeners(this, this.getIds());
    };
    MarkerArray.prototype.removeListenerType = function removeListenerType(type) {
      return gmap.Core.removeListenerType(this, this.getIds(), type);
    };
    return MarkerArray;
  }(gmap.BaseComponentArray);
  gmap.MarkerArray = MarkerArray;
  return gmap;
}(gmap || {});

!function(gmap) {
  "use strict";
  var Type = gmap.Const.Component.Type;
  var Polygon = function(_gmap$BaseComponent3) {
    _inherits(Polygon, _gmap$BaseComponent3);
    function Polygon(id, options) {
      _classCallCheck(this, Polygon);
      var obj = new google.maps.Polygon(options);
      return _possibleConstructorReturn(this, _gmap$BaseComponent3.call(this, id, options, obj, Type.POLYGON));
    }
    return Polygon;
  }(gmap.BaseComponent);
  gmap.Polygon = Polygon;
  return gmap;
}(gmap || {});

!function(gmap) {
  "use strict";
  var Type = gmap.Const.Component.Type;
  var PolygonArray = function(_gmap$BaseComponentAr3) {
    _inherits(PolygonArray, _gmap$BaseComponentAr3);
    function PolygonArray(map) {
      _classCallCheck(this, PolygonArray);
      return _possibleConstructorReturn(this, _gmap$BaseComponentAr3.call(this, map, Type.POLYGON_ARRAY, Type.POLYGON));
    }
    PolygonArray.prototype.addListener = function addListener(type, fn) {
      return gmap.Core.addListener(this, this.getIds(), type, fn);
    };
    PolygonArray.prototype.removeAllListeners = function removeAllListeners() {
      return gmap.Core.removeAllListeners(this, this.getIds());
    };
    PolygonArray.prototype.removeListenerType = function removeListenerType(type) {
      return gmap.Core.removeListenerType(this, this.getIds(), type);
    };
    return PolygonArray;
  }(gmap.BaseComponentArray);
  gmap.PolygonArray = PolygonArray;
  return gmap;
}(gmap || {});

!function(Core) {
  "use strict";
  var ErrorMessages = {
    IdExists: function IdExists(type, id) {
      return "Error: A " + type + " with the id " + id + " already exists";
    },
    ParmIsRequired: function ParmIsRequired(parm) {
      return "Error: " + parm + " is required";
    }
  };
  var RequiredParms = {
    Label: [ "id", "position" ],
    Marker: [ "id", "position" ],
    Polygon: [ "id", "paths" ]
  };
  Core.addComponent = function(map, type, parms) {
    type = gmap.Util.getComponentType(type);
    if ($.type(parms) == "array") {
      return _multiAdd(map, type, parms);
    }
    if ($.type(parms) == "object") {
      if (_validateParms(map, type, parms)) {
        var newCompArray = new gmap[type + "Array"](map);
        newCompArray[parms.id] = _add(map, type, parms);
        return newCompArray;
      }
    }
  };
  function _add(map, type, parms) {
    parms = gmap.Util.convertCompOptions(type, parms);
    var options = _mergeDefaults(map, type, parms);
    return map.Components[type][parms.id] = new gmap[type](parms.id, options);
  }
  function _multiAdd(map, type, parmsArray) {
    var newCompArray = new gmap[type + "Array"](map);
    for (var i = 0, i_end = parmsArray.length; i < i_end; i++) {
      var parms = parmsArray[i];
      if (_validateParms(map, type, parms)) {
        newCompArray[parms.id] = _add(map, type, parms);
      }
    }
    return newCompArray;
  }
  function _mergeDefaults(map, type, parms) {
    var defaults = map.Config[type + "Options"] || {};
    var options = $.extend({}, defaults, parms);
    options.map = map.Obj;
    delete options.id;
    return options;
  }
  function _validateParms(map, type, parms) {
    for (var i = 0, i_end = RequiredParms[type].length; i < i_end; i++) {
      var reqParm = RequiredParms[type][i];
      if (!parms[reqParm]) {
        throw ErrorMessages.ParmIsRequired(reqParm);
      }
    }
    if (map.Components[type][parms.id]) {
      throw ErrorMessages.IdExists(type, parms.id);
    }
    return true;
  }
  return Core;
}(gmap.Core || (gmap.Core = {}));

!function(Core) {
  "use strict";
  var BoundsFunction = {
    Label: function Label(comp) {
      return _getBoundsByPosition(comp);
    },
    Marker: function Marker(comp) {
      return _getBoundsByPosition(comp);
    },
    Polygon: function Polygon(comp) {
      return _getBoundsByPath(comp);
    }
  };
  Core.getBounds = function(compArray, ids) {
    ids = gmap.Util.toArray(ids);
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      var comp = compArray[ids[i]];
      if (comp) {
        bounds.union(BoundsFunction[compArray.ChildType](comp));
      }
    }
    return bounds;
  };
  Core.getCenter = function(compArray, ids) {
    return Core.getBounds(compArray, ids).getCenter();
  };
  Core.setBounds = function(map, parms) {
    if ($.type(parms) == "object") {
      var bounds = _getBoundsByComponents(map.Components, parms);
      map.Obj.fitBounds(bounds);
    } else if (parms == "init" || parms == "initial") {
      map.Obj.fitBounds(map.Init.Bounds);
      map.Obj.setZoom(map.Init.Options.zoom);
    }
    return map;
  };
  function _getBoundsByComponents(mapComps, parms) {
    var bounds = new google.maps.LatLngBounds();
    var types = Object.keys(parms);
    for (var i = 0, i_end = types.length; i < i_end; i++) {
      var type = gmap.Util.getComponentType(types[i]);
      var ids = _getIds(mapComps[type], parms[types[i]]);
      bounds.union(gmap.Core.getBounds(mapComps[type], ids));
    }
    return bounds;
  }
  function _getBoundsByPath(comp) {
    var bounds = new google.maps.LatLngBounds();
    var paths = comp.Obj.getPaths();
    for (var i = 0, i_end = paths.length; i < i_end; i++) {
      var path = paths.getAt(i);
      for (var j = 0, j_end = path.getLength(); j < j_end; j++) {
        bounds.extend(path.getAt(j));
      }
    }
    return bounds;
  }
  function _getBoundsByPosition(comp) {
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(comp.Obj.getPosition());
    return bounds;
  }
  function _getIds(comp, ids) {
    return ids == null || ids == "all" ? gmap.Util.getIds(comp) : ids;
  }
  return Core;
}(gmap.Core || (gmap.Core = {}));

!function(Core) {
  "use strict";
  var Action = {
    HIDE: "hide",
    SHOW: "show",
    TOGGLE: "toggle"
  };
  var Visibility = {
    hide: function hide() {
      return false;
    },
    show: function show() {
      return true;
    },
    toggle: function toggle(comp) {
      return !comp.Obj.getVisible();
    }
  };
  Core.hide = function(compArray, ids) {
    return _display(compArray, ids, Action.HIDE);
  };
  Core.show = function(compArray, ids) {
    return _display(compArray, ids, Action.SHOW);
  };
  Core.toggle = function(compArray, ids) {
    return _display(compArray, ids, Action.TOGGLE);
  };
  function _display(compArray, ids, action) {
    if ($.isArray(ids)) {
      return _multiDisplay(compArray, ids, action);
    }
    if (compArray[ids]) {
      return _setVisibility(compArray[ids], action);
    }
  }
  function _multiDisplay(compArray, ids, action) {
    var newCompArray = new gmap[compArray.Type](compArray.Map);
    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      var comp = compArray[ids[i]];
      if (comp) {
        newCompArray[ids[i]] = _setVisibility(comp, action);
      }
    }
    return newCompArray;
  }
  function _setVisibility(comp, action) {
    comp.Obj.setOptions({
      visible: Visibility[action](comp)
    });
    return comp;
  }
  return Core;
}(gmap.Core || (gmap.Core = {}));

!function(Core) {
  "use strict";
  var Action = {
    ADD: "add",
    REMOVE_ALL: "remove_all",
    REMOVE_TYPE: "remove_type"
  };
  var Execute = {
    add: function add(comp, type, fn) {
      return _add(comp, type, fn);
    },
    remove_all: function remove_all(comp) {
      return _removeAll(comp);
    },
    remove_type: function remove_type(comp, type) {
      return _removeType(comp, type);
    }
  };
  Core.addListener = function(compArray, ids, type, fn) {
    type = gmap.Util.getEventType(type);
    return _listener(compArray, ids, type, fn, Action.ADD);
  };
  Core.removeAllListeners = function(compArray, ids) {
    return _listener(compArray, ids, null, null, Action.REMOVE_ALL);
  };
  Core.removeListenerType = function(compArray, ids, type) {
    type = gmap.Util.getEventType(type);
    return _listener(compArray, ids, type, null, Action.REMOVE_TYPE);
  };
  function _listener(compArray, ids, type, fn, action) {
    if (compArray.Type == gmap.Const.Component.Type.MAP) {
      return Execute[action](compArray, type, fn);
    }
    if ($.isArray(ids)) {
      return _multiListener(compArray, ids, type, fn, action);
    }
    if (compArray[ids]) {
      return Execute[action](compArray[ids], type, fn);
    }
  }
  function _multiListener(compArray, ids, type, fn, action) {
    var newCompArray = new gmap[compArray.Type](compArray.Map);
    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      var comp = compArray[ids[i]];
      if (comp) {
        newCompArray[ids[i]] = Execute[action](comp, type, fn);
      }
    }
    return newCompArray;
  }
  function _add(comp, type, fn) {
    google.maps.event.addListener(comp.Obj, type, fn);
    return comp;
  }
  function _removeAll(comp) {
    google.maps.event.clearInstanceListeners(comp.Obj);
    return comp;
  }
  function _removeType(comp, type) {
    google.maps.event.clearListeners(comp.Obj, type);
    return comp;
  }
  return Core;
}(gmap.Core || (gmap.Core = {}));

!function(Core) {
  "use strict";
  Core.remove = function(compArray, ids) {
    if ($.isArray(ids)) {
      return _multiRemove(compArray, ids);
    }
    if (compArray[ids]) {
      return _remove(compArray[ids]);
    }
  };
  function _remove(comp) {
    comp.Obj.setMap(null);
    delete comp.Map.Components[comp.Type][comp.Id];
    return comp;
  }
  function _multiRemove(compArray, ids) {
    var newCompArray = new gmap[compArray.Type](compArray.Map);
    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      var comp = compArray[ids[i]];
      if (comp) {
        newCompArray[ids[i]] = _remove(comp);
      }
    }
    return newCompArray;
  }
  return Core;
}(gmap.Core || (gmap.Core = {}));

!function(Core) {
  "use strict";
  Core.reset = function(comp, ids) {
    if (comp.Type == gmap.Const.Component.Type.MAP) {
      comp.Obj.fitBounds(comp.Init.Bounds);
      return _reset(comp);
    }
    if ($.isArray(ids)) {
      return _multiReset(comp, ids);
    }
    if (comp[ids]) {
      return _reset(comp[ids]);
    }
  };
  function _reset(comp) {
    comp.Obj.setOptions(comp.Init.Options);
    return comp;
  }
  function _multiReset(compArray, ids) {
    var newCompArray = new gmap[compArray.Type](compArray.Map);
    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      var comp = compArray[ids[i]];
      if (comp) {
        newCompArray[ids[i]] = _reset(comp);
      }
    }
    return newCompArray;
  }
  return Core;
}(gmap.Core || (gmap.Core = {}));

!function(Core) {
  "use strict";
  Core.search = function(map, type, ids) {
    var compArray = map.Components[type];
    if (ids) {
      var exclude = _getIdsToExclude(compArray, gmap.Util.toArray(ids));
      return gmap.Util.copy(compArray, exclude);
    }
    return compArray;
  };
  function _getIdsToExclude(compArray, ids) {
    var allIDs = compArray.getIds();
    var exclude = allIDs.filter(function(i) {
      return ids.indexOf(i) === -1;
    });
    return exclude;
  }
  return Core;
}(gmap.Core || (gmap.Core = {}));

!function(Core) {
  "use strict";
  var ErrorMessages = {
    MustSupplyOptions: "Error: Must supply options"
  };
  Core.update = function(comp, ids, options) {
    if (options == undefined) {
      throw ErrorMessages.MustSupplyOptions;
    }
    options = gmap.Util.convertCompOptions(comp.Type, options);
    if (comp.Type == gmap.Const.Component.Type.MAP) {
      return _update(comp, options);
    }
    if ($.isArray(ids)) {
      return _multiUpdate(comp, ids, options);
    }
    if (comp[ids]) {
      return _update(comp[ids], options);
    }
  };
  function _update(comp, options) {
    comp.Obj.setOptions(options);
    return comp;
  }
  function _multiUpdate(compArray, ids, options) {
    var newCompArray = new gmap[compArray.Type](compArray.Map);
    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      var comp = compArray[ids[i]];
      if (comp) {
        newCompArray[ids[i]] = _update(comp, options);
      }
    }
    return newCompArray;
  }
  return Core;
}(gmap.Core || (gmap.Core = {}));

gmap.Const.Version = "1.2.0-alpha";