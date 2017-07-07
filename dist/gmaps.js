/*!
 * gmaps v1.0.0-alpha.6 (https://github.com/tmentink/gmaps)
 * Copyright 2017 Trent Mentink
 * Licensed under MIT
 */

if (typeof google === "undefined" || typeof google.maps === "undefined") {
  throw new Error("gmaps requires Google Maps JavaScript API v3.");
}

!function() {
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
  !function() {
    "use strict";
    if (!Array.prototype.find) {
      Object.defineProperty(Array.prototype, "find", {
        value: function value(predicate) {
          if (this == null) {
            throw new TypeError("'this' is null or not defined");
          }
          var o = Object(this);
          var len = o.length >>> 0;
          if (typeof predicate !== "function") {
            throw new TypeError("predicate must be a function");
          }
          var thisArg = arguments[1];
          var k = 0;
          while (k < len) {
            var kValue = o[k];
            if (predicate.call(thisArg, kValue, k, o)) {
              return kValue;
            }
            k++;
          }
          return undefined;
        }
      });
    }
    if (!Array.prototype.includes) {
      Object.defineProperty(Array.prototype, "includes", {
        value: function value(searchElement, fromIndex) {
          if (this == null) {
            throw new TypeError("'this' is null or not defined");
          }
          var o = Object(this);
          var len = o.length >>> 0;
          if (len === 0) {
            return false;
          }
          var n = fromIndex || 0;
          var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
          function sameValueZero(x, y) {
            return x === y || typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y);
          }
          while (k < len) {
            if (sameValueZero(o[k], searchElement)) {
              return true;
            }
            k++;
          }
          return false;
        }
      });
    }
  }();
  !function($) {
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
    $.type = function(obj) {
      if (!obj) {
        return obj + "";
      }
      return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
    };
    $.isWindow = function(obj) {
      return obj !== null && obj === obj.window;
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
        if ((options = arguments[i]) !== null) {
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
    return $;
  }(window.jQuery || ($ = {}));
  !function() {
    "use strict";
    var gmap = function gmap(settings) {
      var _this = this;
      if ($.isPlainObject(settings)) {
        Util.renameSettings(settings);
      }
      settings = Util.mergeWithGlobalSettings(settings);
      var mapOptions = Util.convertComponentOptions({
        compType: Const.ComponentType.MAP,
        compOptions: settings[Const.Setting.MAP_OPTIONS]
      });
      var mapId = settings[Const.Setting.MAP_ID];
      var mapContainer = document.getElementById(mapId);
      if (!mapContainer) {
        return Util.throwError({
          method: "new gmap",
          message: "Could not find an element with an Id of " + mapId,
          obj: settings
        });
      }
      this.components = {
        Circle: new Components.CircleArray({
          map: this
        }),
        Label: new Components.LabelArray({
          map: this
        }),
        Marker: new Components.MarkerArray({
          map: this
        }),
        Polygon: new Components.PolygonArray({
          map: this
        }),
        Polyline: new Components.PolylineArray({
          map: this
        }),
        Rectangle: new Components.RectangleArray({
          map: this
        })
      };
      this.init = {
        bounds: undefined,
        options: mapOptions
      };
      this.obj = new google.maps.Map(mapContainer, mapOptions);
      this.obj["gmaps"] = {
        id: mapId,
        map: this,
        parent: this,
        version: gmap.version
      };
      this.settings = settings;
      this.type = Const.ComponentType.MAP;
      this.version = gmap.version;
      google.maps.event.addListenerOnce(this.obj, Const.EventType.TILES_LOADED, function() {
        _this.init.bounds = _this.obj.getBounds();
      });
    };
    window.gmap = gmap;
  }();
  var Const = function(Const) {
    "use strict";
    var Option = {
      ALIGN: "align",
      ANCHOR_POINT: "anchorPoint",
      ANIMATION: "animation",
      BACKGROUND_COLOR: "backgroundColor",
      BOUNDS: "bounds",
      CENTER: "center",
      CLICKABLE: "clickable",
      CLICKABLE_ICONS: "clickableIcons",
      CONTENT: "content",
      CROSS_ON_DRAG: "crossOnDrag",
      CURSOR: "cursor",
      DISABLE_AUTO_PAN: "disableAutoPan",
      DISABLE_DEFAULT_UI: "disableDefaultUI",
      DISABLE_DOUBLE_CLICK_ZOOM: "disableDoubleClickZoom",
      DRAGGABLE: "draggable",
      DRAGGABLE_CURSOR: "draggableCursor",
      DRAGGING_CURSOR: "draggingCursor",
      EDITABLE: "editable",
      FILL_COLOR: "fillColor",
      FILL_OPACITY: "fillOpacity",
      FONT_COLOR: "fontColor",
      FONT_FAMILY: "fontFamily",
      FONT_SIZE: "fontSize",
      FULLSCREEN_CONTROL: "fullscreenControl",
      FULLSCREEN_CONTROL_OPTIONS: "fullscreenControlOptions",
      GEODESIC: "geodesic",
      GESTURE_HANDLING: "gestureHandling",
      HEADING: "heading",
      ICON: "icon",
      ICONS: "icons",
      KEYBOARD_SHORTCUTS: "keyboardShortcuts",
      LABEL: "label",
      MAP: "map",
      MAP_TYPE_CONTROL: "mapTypeControl",
      MAP_TYPE_CONTROL_OPTIONS: "mapTypeControlOptions",
      MAP_TYPE_ID: "mapTypeId",
      MAX_WIDTH: "maxWidth",
      MAX_ZOOM: "maxZoom",
      MIN_ZOOM: "minZoom",
      NO_CLEAR: "noClear",
      OPACITY: "opacity",
      OPTIMIZED: "optimized",
      PAN_CONTROL: "panControl",
      PAN_CONTROL_OPTIONS: "panControlOptions",
      PATH: "path",
      PATHS: "paths",
      PIXEL_OFFSET: "pixelOffset",
      PLACE: "place",
      POSITION: "position",
      RADIUS: "radius",
      ROTATE_CONTROL: "rotateControl",
      ROTATE_CONTROL_OPTIONS: "rotateControlOptions",
      SCALE_CONTROL: "scaleControl",
      SCALE_CONTROL_OPTIONS: "scaleControlOptions",
      SCROLL_WHEEL: "scrollWheel",
      SHAPE: "shape",
      STREET_VIEW: "streetView",
      STREET_VIEW_CONTROL: "streetViewControl",
      STREET_VIEW_CONTROL_OPTIONS: "streetViewControlOptions",
      STROKE_COLOR: "strokeColor",
      STROKE_OPACITY: "strokeOpacity",
      STROKE_POSITION: "strokePosition",
      STROKE_WEIGHT: "strokeWeight",
      STYLES: "styles",
      TILT: "tilt",
      TITLE: "title",
      TEXT: "text",
      VISIBLE: "visible",
      ZOOM: "zoom",
      ZOOM_CONTROL: "zoomControl",
      ZOOM_CONTROL_OPTIONS: "zoomControlOptions",
      Z_INDEX: "zIndex"
    };
    var Type = {
      CIRCLE: "Circle",
      CIRCLE_ARRAY: "CircleArray",
      LABEL: "Label",
      LABEL_ARRAY: "LabelArray",
      MAP: "Map",
      MARKER: "Marker",
      MARKER_ARRAY: "MarkerArray",
      POLYGON: "Polygon",
      POLYGON_ARRAY: "PolygonArray",
      POLYLINE: "Polyline",
      POLYLINE_ARRAY: "PolylineArray",
      RECTANGLE: "Rectangle",
      RECTANGLE_ARRAY: "RectangleArray"
    };
    var Components = {};
    Components[Type.CIRCLE] = {
      options: [ {
        name: Option.CENTER,
        convertable: true,
        required: true
      }, {
        name: Option.CLICKABLE
      }, {
        name: Option.DRAGGABLE
      }, {
        name: Option.EDITABLE
      }, {
        name: Option.FILL_COLOR
      }, {
        name: Option.FILL_OPACITY
      }, {
        name: Option.MAP
      }, {
        name: Option.RADIUS,
        required: true
      }, {
        name: Option.STROKE_COLOR
      }, {
        name: Option.STROKE_OPACITY
      }, {
        name: Option.STROKE_POSITION
      }, {
        name: Option.STROKE_WEIGHT
      }, {
        name: Option.VISIBLE
      }, {
        name: Option.Z_INDEX
      } ]
    };
    Components[Type.LABEL] = {
      options: [ {
        name: Option.ALIGN
      }, {
        name: Option.FONT_COLOR
      }, {
        name: Option.FONT_FAMILY
      }, {
        name: Option.FONT_SIZE
      }, {
        name: Option.MAX_ZOOM
      }, {
        name: Option.MIN_ZOOM
      }, {
        name: Option.POSITION,
        convertable: true,
        required: true
      }, {
        name: Option.STROKE_WEIGHT
      }, {
        name: Option.STROKE_COLOR
      }, {
        name: Option.VISIBLE
      }, {
        name: Option.TEXT,
        required: true
      }, {
        name: Option.Z_INDEX
      } ]
    };
    Components[Type.MAP] = {
      options: [ {
        name: Option.BACKGROUND_COLOR
      }, {
        name: Option.CENTER,
        convertable: true,
        required: true
      }, {
        name: Option.CLICKABLE_ICONS
      }, {
        name: Option.DISABLE_DEFAULT_UI
      }, {
        name: Option.DISABLE_DOUBLE_CLICK_ZOOM
      }, {
        name: Option.DRAGGABLE
      }, {
        name: Option.DRAGGABLE_CURSOR
      }, {
        name: Option.DRAGGING_CURSOR
      }, {
        name: Option.FULLSCREEN_CONTROL
      }, {
        name: Option.FULLSCREEN_CONTROL_OPTIONS
      }, {
        name: Option.GESTURE_HANDLING
      }, {
        name: Option.HEADING
      }, {
        name: Option.KEYBOARD_SHORTCUTS
      }, {
        name: Option.MAP_TYPE_CONTROL
      }, {
        name: Option.MAP_TYPE_CONTROL_OPTIONS
      }, {
        name: Option.MAP_TYPE_ID
      }, {
        name: Option.MAX_ZOOM
      }, {
        name: Option.NO_CLEAR
      }, {
        name: Option.PAN_CONTROL
      }, {
        name: Option.PAN_CONTROL_OPTIONS
      }, {
        name: Option.ROTATE_CONTROL
      }, {
        name: Option.ROTATE_CONTROL_OPTIONS
      }, {
        name: Option.SCALE_CONTROL
      }, {
        name: Option.SCALE_CONTROL_OPTIONS
      }, {
        name: Option.SCROLL_WHEEL
      }, {
        name: Option.STREET_VIEW
      }, {
        name: Option.STREET_VIEW_CONTROL
      }, {
        name: Option.STREET_VIEW_CONTROL_OPTIONS
      }, {
        name: Option.STYLES
      }, {
        name: Option.TILT
      }, {
        name: Option.ZOOM,
        required: true
      }, {
        name: Option.ZOOM_CONTROL
      }, {
        name: Option.ZOOM_CONTROL_OPTIONS
      } ]
    };
    Components[Type.MARKER] = {
      options: [ {
        name: Option.ANCHOR_POINT
      }, {
        name: Option.ANIMATION
      }, {
        name: Option.CLICKABLE
      }, {
        name: Option.CROSS_ON_DRAG
      }, {
        name: Option.CURSOR
      }, {
        name: Option.DRAGGABLE
      }, {
        name: Option.ICON
      }, {
        name: Option.LABEL
      }, {
        name: Option.MAP
      }, {
        name: Option.OPACITY
      }, {
        name: Option.OPTIMIZED
      }, {
        name: Option.PLACE
      }, {
        name: Option.POSITION,
        convertable: true,
        required: true
      }, {
        name: Option.SHAPE
      }, {
        name: Option.TITLE
      }, {
        name: Option.VISIBLE
      }, {
        name: Option.Z_INDEX
      } ]
    };
    Components[Type.POLYGON] = {
      options: [ {
        name: Option.CLICKABLE
      }, {
        name: Option.DRAGGABLE
      }, {
        name: Option.EDITABLE
      }, {
        name: Option.FILL_COLOR
      }, {
        name: Option.FILL_OPACITY
      }, {
        name: Option.GEODESIC
      }, {
        name: Option.MAP
      }, {
        name: Option.PATHS,
        convertable: true,
        required: true
      }, {
        name: Option.STROKE_COLOR
      }, {
        name: Option.STROKE_OPACITY
      }, {
        name: Option.STROKE_POSITION
      }, {
        name: Option.STROKE_WEIGHT
      }, {
        name: Option.VISIBLE
      }, {
        name: Option.Z_INDEX
      } ]
    };
    Components[Type.POLYLINE] = {
      options: [ {
        name: Option.CLICKABLE
      }, {
        name: Option.DRAGGABLE
      }, {
        name: Option.EDITABLE
      }, {
        name: Option.GEODESIC
      }, {
        name: Option.ICONS
      }, {
        name: Option.MAP
      }, {
        name: Option.PATH,
        convertable: true,
        required: true
      }, {
        name: Option.STROKE_COLOR
      }, {
        name: Option.STROKE_OPACITY
      }, {
        name: Option.STROKE_WEIGHT
      }, {
        name: Option.VISIBLE
      }, {
        name: Option.Z_INDEX
      } ]
    };
    Components[Type.RECTANGLE] = {
      options: [ {
        name: Option.BOUNDS,
        convertable: true,
        required: true
      }, {
        name: Option.CLICKABLE
      }, {
        name: Option.DRAGGABLE
      }, {
        name: Option.EDITABLE
      }, {
        name: Option.FILL_COLOR
      }, {
        name: Option.FILL_OPACITY
      }, {
        name: Option.MAP
      }, {
        name: Option.STROKE_COLOR
      }, {
        name: Option.STROKE_OPACITY
      }, {
        name: Option.STROKE_POSITION
      }, {
        name: Option.STROKE_WEIGHT
      }, {
        name: Option.VISIBLE
      }, {
        name: Option.Z_INDEX
      } ]
    };
    Const.Components = Components;
    Const.ComponentOption = Option;
    Const.ComponentType = Type;
    return Const;
  }(Const || (Const = {}));
  var Const = function(Const) {
    "use strict";
    Const.EventType = {
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
    };
    Const.Setting = {
      CIRCLE_OPTIONS: "circleOptions",
      DELIMITED_STRINGS: "delimitedStrings",
      DELIMITER: "delimiter",
      LABEL_OPTIONS: "labelOptions",
      MAP_ID: "mapId",
      MAP_OPTIONS: "mapOptions",
      MARKER_OPTIONS: "markerOptions",
      POLYGON_OPTIONS: "polygonOptions",
      POLYLINE_OPTIONS: "polylineOptions",
      RECTANGLE_OPTIONS: "rectangleOptions",
      URL_PRECISION: "urlPrecision"
    };
    return Const;
  }(Const || (Const = {}));
  !function(Settings, CompOption, Type) {
    "use strict";
    var CircleOptions = {};
    CircleOptions[CompOption.CLICKABLE] = true;
    CircleOptions[CompOption.DRAGGABLE] = false;
    CircleOptions[CompOption.EDITABLE] = false;
    CircleOptions[CompOption.FILL_COLOR] = "#2196f3";
    CircleOptions[CompOption.FILL_OPACITY] = .75;
    CircleOptions[CompOption.STROKE_COLOR] = "#000";
    CircleOptions[CompOption.STROKE_OPACITY] = .75;
    CircleOptions[CompOption.STROKE_POSITION] = google.maps.StrokePosition.CENTER;
    CircleOptions[CompOption.STROKE_WEIGHT] = 1;
    CircleOptions[CompOption.VISIBLE] = true;
    var Delimiter = {
      latLng: "|",
      latLngArray: "~",
      latLngBounds: "|"
    };
    var LabelOptions = {};
    LabelOptions[CompOption.ALIGN] = "center";
    LabelOptions[CompOption.FONT_COLOR] = "#000";
    LabelOptions[CompOption.FONT_SIZE] = 14;
    LabelOptions[CompOption.STROKE_COLOR] = "#FFF";
    LabelOptions[CompOption.STROKE_WEIGHT] = 1;
    LabelOptions[CompOption.VISIBLE] = true;
    var MapOptions = {};
    MapOptions[CompOption.CENTER] = {
      lat: 37.5,
      lng: -120
    };
    MapOptions[CompOption.CLICKABLE_ICONS] = false;
    MapOptions[CompOption.DISABLE_DOUBLE_CLICK_ZOOM] = false;
    MapOptions[CompOption.GESTURE_HANDLING] = "auto";
    MapOptions[CompOption.KEYBOARD_SHORTCUTS] = true;
    MapOptions[CompOption.MAP_TYPE_CONTROL] = false;
    MapOptions[CompOption.MAP_TYPE_ID] = google.maps.MapTypeId.ROADMAP;
    MapOptions[CompOption.SCROLL_WHEEL] = true;
    MapOptions[CompOption.STREET_VIEW_CONTROL] = false;
    MapOptions[CompOption.ZOOM] = 6;
    MapOptions[CompOption.ZOOM_CONTROL] = true;
    var MarkerOptions = {};
    MarkerOptions[CompOption.CLICKABLE] = true;
    MarkerOptions[CompOption.CROSS_ON_DRAG] = true;
    MarkerOptions[CompOption.DRAGGABLE] = false;
    MarkerOptions[CompOption.OPACITY] = 1;
    MarkerOptions[CompOption.OPTIMIZED] = true;
    MarkerOptions[CompOption.VISIBLE] = true;
    var PolygonOptions = {};
    PolygonOptions[CompOption.CLICKABLE] = true;
    PolygonOptions[CompOption.DRAGGABLE] = false;
    PolygonOptions[CompOption.EDITABLE] = false;
    PolygonOptions[CompOption.FILL_COLOR] = "#2196f3";
    PolygonOptions[CompOption.FILL_OPACITY] = .75;
    PolygonOptions[CompOption.GEODESIC] = false;
    PolygonOptions[CompOption.STROKE_COLOR] = "#000";
    PolygonOptions[CompOption.STROKE_OPACITY] = .75;
    PolygonOptions[CompOption.STROKE_WEIGHT] = 1;
    PolygonOptions[CompOption.VISIBLE] = true;
    var PolylineOptions = {};
    PolylineOptions[CompOption.CLICKABLE] = true;
    PolylineOptions[CompOption.DRAGGABLE] = false;
    PolylineOptions[CompOption.EDITABLE] = false;
    PolylineOptions[CompOption.GEODESIC] = false;
    PolylineOptions[CompOption.STROKE_COLOR] = "#000";
    PolylineOptions[CompOption.STROKE_OPACITY] = .75;
    PolylineOptions[CompOption.STROKE_WEIGHT] = 3;
    PolylineOptions[CompOption.VISIBLE] = true;
    var RectangleOptions = {};
    RectangleOptions[CompOption.CLICKABLE] = true;
    RectangleOptions[CompOption.DRAGGABLE] = false;
    RectangleOptions[CompOption.EDITABLE] = false;
    RectangleOptions[CompOption.FILL_COLOR] = "#2196f3";
    RectangleOptions[CompOption.FILL_OPACITY] = .75;
    RectangleOptions[CompOption.STROKE_COLOR] = "#000";
    RectangleOptions[CompOption.STROKE_OPACITY] = .75;
    RectangleOptions[CompOption.STROKE_POSITION] = google.maps.StrokePosition.CENTER;
    RectangleOptions[CompOption.STROKE_WEIGHT] = 1;
    RectangleOptions[CompOption.VISIBLE] = true;
    Settings[Type.CIRCLE_OPTIONS] = CircleOptions;
    Settings[Type.DELIMITED_STRINGS] = true;
    Settings[Type.DELIMITER] = Delimiter;
    Settings[Type.LABEL_OPTIONS] = LabelOptions;
    Settings[Type.MAP_ID] = "gmap";
    Settings[Type.MAP_OPTIONS] = MapOptions;
    Settings[Type.MARKER_OPTIONS] = MarkerOptions;
    Settings[Type.POLYGON_OPTIONS] = PolygonOptions;
    Settings[Type.POLYLINE_OPTIONS] = PolylineOptions;
    Settings[Type.RECTANGLE_OPTIONS] = RectangleOptions;
    Settings[Type.URL_PRECISION] = 5;
    return Settings;
  }(gmap.settings || (gmap.settings = {}), Const.ComponentOption, Const.Setting);
  var Util = function(Util) {
    "use strict";
    var Conversions = {
      bounds: function bounds(parms) {
        if (parms.bounds) {
          parms.bounds = Util.toLatLngBounds(parms.bounds);
        }
      },
      center: function center(parms) {
        if (parms.center) {
          parms.center = Util.toLatLng(parms.center);
        }
      },
      path: function path(parms) {
        if (parms.path) {
          parms.path = Util.toLatLngArray(parms.path);
        }
      },
      paths: function paths(parms) {
        if (parms.paths || parms.path) {
          parms.paths = Util.toLatLngArray(parms.paths || parms.path);
          delete parms.path;
        }
      },
      position: function position(parms) {
        if (parms.position) {
          parms.position = Util.toLatLng(parms.position);
        }
      }
    };
    Util.cleanComponentOptions = function(parms) {
      var compOptions = parms.compOptions;
      var compType = parms.compType.replace("Array", "");
      var compTypeOptions = _getComponentOptions(compType);
      Object.keys(compOptions).forEach(function(key) {
        if (compTypeOptions.indexOf(key) === -1) {
          delete compOptions[key];
        }
      });
      return compOptions;
    };
    Util.convertComponentOptions = function(parms) {
      var compOptions = parms.compOptions;
      var compType = parms.compType.replace("Array", "");
      var convertableOptions = _getConvertableOptions(compType);
      for (var i = 0, i_end = convertableOptions.length; i < i_end; i++) {
        var option = convertableOptions[i];
        Conversions[option.name](compOptions);
      }
      return compOptions;
    };
    Util.copy = function(parms) {
      var compArray = parms.compArray;
      var new_comp = Util.getNewComponentArray(compArray);
      var proto = _getPrototypes(compArray);
      var copy = $.extend(true, new_comp, compArray);
      for (var i = 0, i_end = proto.length; i < i_end; i++) {
        delete copy[proto[i]];
      }
      return copy;
    };
    Util.getNewComponentArray = function(compArray, map) {
      if ($.type(compArray) === "string") {
        return new Components[compArray + "Array"]({
          map: map
        });
      }
      return new Components[compArray.type]({
        map: compArray.map
      });
    };
    Util.renameComponentOptions = function(compOptions) {
      Object.keys(compOptions).forEach(function(key) {
        Util.renameProperty({
          newName: Util.lookupComponentOption(key),
          obj: compOptions,
          oldName: key
        });
      });
      return compOptions;
    };
    Util.validComponentOption = function(parms) {
      var compOption = parms.compOption;
      var compType = parms.compType;
      return _getComponentOptions(compType).includes(compOption);
    };
    Util.validMapComponent = function(compType) {
      return compType !== "Map" && Object.keys(Const.Components).includes(compType);
    };
    function _getConvertableOptions(compType) {
      return Const.Components[compType].options.filter(function(option) {
        return option.convertable === true;
      });
    }
    function _getComponentOptions(compType) {
      return Const.Components[compType].options.map(function(option) {
        return option.name;
      });
    }
    function _getPrototypes(compArray) {
      var proto = Object.keys(Object.getPrototypeOf(compArray));
      var base_proto = Object.keys(Object.getPrototypeOf(new Components.BaseComponentArray({})));
      return proto.concat(base_proto);
    }
    return Util;
  }(Util || (Util = {}));
  var Util = function(Util, Settings) {
    "use strict";
    Util.toArray = function(val) {
      if ($.isArray(val) === false) {
        return [ val ];
      }
      return val;
    };
    Util.toLatLng = function(val) {
      if ($.type(val) === "string") {
        return Settings.delimitedStrings ? _strToLatLng(val) : JSON.parse(val);
      }
      return val;
    };
    Util.toLatLngArray = function(val) {
      if ($.type(val) === "string") {
        return Settings.delimitedStrings ? _strToLatLngArray(val) : JSON.parse(val);
      }
      return val;
    };
    Util.toLatLngBounds = function(val) {
      if ($.type(val) === "string") {
        return Settings.delimitedStrings ? _strToLatLngBounds(val) : JSON.parse(val);
      }
      return val;
    };
    Util.toLowerCase = function(val) {
      var regex = /\s+|\_+/g;
      if ($.type(val) === "string") {
        return val.toLowerCase().replace(regex, "");
      }
      return undefined;
    };
    Util.toString = function(val) {
      if (val instanceof google.maps.LatLng) {
        return Settings.delimitedStrings ? val.toUrlValue(Settings.urlPrecision) : JSON.stringify(val, _jsonReplacer);
      }
      if (val instanceof google.maps.MVCArray) {
        if (val.getAt(0) instanceof google.maps.MVCArray) {
          return Settings.delimitedStrings ? _toMultiDelimitedString(val) : _toMultiJSONString(val);
        } else {
          return Settings.delimitedStrings ? _toDelimitedString(val) : JSON.stringify(val.getArray(), _jsonReplacer);
        }
      }
      return undefined;
    };
    function _jsonReplacer(key, value) {
      if (key === "lat" || key === "lng") {
        return Number(value.toFixed(Settings.urlPrecision));
      }
      return value;
    }
    function _strToLatLng(str) {
      var points = str.split(",");
      return new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]));
    }
    function _strToLatLngArray(str) {
      var latLngArray = [];
      var coordPairs = str.split(Settings.delimiter.latLng || "|");
      for (var i = 0, i_end = coordPairs.length; i < i_end; i++) {
        latLngArray.push(Util.toLatLng(coordPairs[i]));
      }
      return latLngArray;
    }
    function _strToLatLngBounds(str) {
      var coordPairs = str.split(Settings.delimiter.latLngBounds || "|");
      return {
        north: Number(coordPairs[0]),
        east: Number(coordPairs[1]),
        south: Number(coordPairs[2]),
        west: Number(coordPairs[3])
      };
    }
    function _toDelimitedString(MVCArray) {
      var str = "";
      MVCArray.forEach(function(el, i) {
        if (i > 0) {
          str += Settings.delimiter.latLng || "|";
        }
        str += el.toUrlValue(Settings.urlPrecision || 6);
      });
      return str;
    }
    function _toMultiDelimitedString(MVCArray) {
      var str = "";
      MVCArray.forEach(function(el, i) {
        if (i > 0) {
          str += Settings.delimiter.latLngArray || "~";
        }
        str += _toDelimitedString(el);
      });
      return str;
    }
    function _toMultiJSONString(MVCArray) {
      var arr = [];
      MVCArray.forEach(function(el) {
        arr.push(el.getArray());
      });
      return JSON.stringify(arr, _jsonReplacer);
    }
    return Util;
  }(Util || (Util = {}), gmap.settings);
  var Util = function(Util) {
    "use strict";
    Util.lookupComponentOption = function(value) {
      value = Util.toLowerCase(value);
      return _lookup(Const.ComponentOption, value) || value;
    };
    Util.lookupComponentType = function(value) {
      value = Util.toLowerCase(value);
      return _lookup(Const.ComponentType, value, true) || value;
    };
    Util.lookupEventType = function(value) {
      value = Util.toLowerCase(value);
      return _lookup(Const.EventType, value) || value;
    };
    Util.lookupSetting = function(value) {
      value = Util.toLowerCase(value);
      return _lookup(Const.Setting, value) || value;
    };
    function _lookup(constant, value, plural) {
      var key = Object.keys(constant).find(function(key) {
        key = Util.toLowerCase(key);
        return key === value || plural && key + "s" === value;
      });
      return constant[key];
    }
    return Util;
  }(Util || (Util = {}));
  var Util = function(Util) {
    "use strict";
    Util.renameProperty = function(parms) {
      var newName = parms.newName;
      var obj = parms.obj;
      var oldName = parms.oldName;
      if (oldName === newName) {
        return;
      }
      if (obj.hasOwnProperty(oldName)) {
        obj[newName] = obj[oldName];
        delete obj[oldName];
      }
    };
    Util.throwError = function(parms) {
      console.error(parms.method + ": " + parms.message, parms.obj || "");
      return false;
    };
    return Util;
  }(Util || (Util = {}));
  var Util = function(Util, GlobalSettings, Setting) {
    "use strict";
    var LocalSettings = [ Setting.CIRCLE_OPTIONS, Setting.LABEL_OPTIONS, Setting.MAP_ID, Setting.MAP_OPTIONS, Setting.MARKER_OPTIONS, Setting.POLYGON_OPTIONS, Setting.POLYLINE_OPTIONS, Setting.RECTANGLE_OPTIONS ];
    Util.renameSettings = function(userSettings) {
      Object.keys(userSettings).forEach(function(key) {
        Util.renameProperty({
          newName: Util.lookupSetting(key),
          obj: userSettings,
          oldName: key
        });
      });
      return userSettings;
    };
    Util.mergeWithGlobalSettings = function(userSettings) {
      userSettings = $.extend(true, {}, GlobalSettings, userSettings);
      Object.keys(userSettings).forEach(function(key) {
        if (LocalSettings.indexOf(key) === -1) {
          delete userSettings[key];
        }
      });
      return userSettings;
    };
    return Util;
  }(Util || (Util = {}), gmap.settings, Const.Setting);
  var Core = function(Core) {
    "use strict";
    Core.addComponent = function(parms) {
      var compOptions = parms.compOptions;
      var map = parms.map;
      var type = Util.lookupComponentType(parms.type);
      if (Util.validMapComponent(type)) {
        if ($.type(compOptions) === "array") {
          return _multiAdd(map, type, compOptions);
        }
        if ($.type(compOptions) === "object") {
          if (_validateOptions(map, type, compOptions)) {
            var newCompArray = Util.getNewComponentArray(type, map);
            newCompArray.push(_add(map, type, compOptions));
            return newCompArray;
          }
        }
      } else {
        return Util.throwError({
          method: "add",
          message: type + " is not a valid map component",
          obj: {
            type: type
          }
        });
      }
    };
    function _add(map, type, compOptions) {
      compOptions = Util.convertComponentOptions({
        compType: type,
        compOptions: compOptions
      });
      if ($.type(compOptions.id) !== "string" && $.type(compOptions.id) !== "number") {
        compOptions.id = _getAutoId(map, type);
      }
      var comp = new Components[type]({
        id: compOptions.id,
        options: _mergeDefaults(map, type, compOptions)
      });
      map.components[type].push(comp);
      return comp;
    }
    function _multiAdd(map, type, compOptionsArray) {
      var newCompArray = Util.getNewComponentArray(type, map);
      for (var i = 0, i_end = compOptionsArray.length; i < i_end; i++) {
        var compOptions = compOptionsArray[i];
        if (_validateOptions(map, type, compOptions)) {
          newCompArray.push(_add(map, type, compOptions));
        }
      }
      return newCompArray;
    }
    function _getAutoId(map, type) {
      var id = map.components[type].seed++;
      return "__" + id + "__";
    }
    function _mergeDefaults(map, type, compOptions) {
      var namespace = Util.lookupSetting(type + "Options");
      var defaults = map.settings[namespace] || {};
      var options = $.extend({}, defaults, compOptions);
      options.map = map.obj;
      delete options.id;
      return options;
    }
    function _getRequiredOptions(compType) {
      return Const.Components[compType].options.filter(function(option) {
        return option.required === true;
      });
    }
    function _requiredOptionIsEmpty(reqOption, compOptions) {
      return compOptions[reqOption] === "" || compOptions[reqOption] === null || compOptions[reqOption] === undefined;
    }
    function _validateOptions(map, compType, compOptions) {
      if (map.components[compType].includes(compOptions.id) === true) {
        return Util.throwError({
          method: "add",
          message: "A " + compType + " with an id of " + compOptions.id + " already exists",
          obj: compOptions
        });
      }
      var requiredOptions = _getRequiredOptions(compType);
      for (var i = 0, i_end = requiredOptions.length; i < i_end; i++) {
        var reqOption = requiredOptions[i].name;
        if (_requiredOptionIsEmpty(reqOption, compOptions)) {
          return Util.throwError({
            method: "add",
            message: reqOption + " must have a value",
            obj: compOptions
          });
        }
      }
      return true;
    }
    return Core;
  }(Core || (Core = {}));
  var Core = function(Core) {
    "use strict";
    var BoundsFunction = {
      Circle: function Circle(comp) {
        return comp.obj.getBounds();
      },
      Label: function Label(comp) {
        return _getBoundsByPosition(comp);
      },
      Marker: function Marker(comp) {
        return _getBoundsByPosition(comp);
      },
      Polygon: function Polygon(comp) {
        return _getBoundsByPaths(comp);
      },
      Polyline: function Polyline(comp) {
        return _getBoundsByPath(comp);
      },
      Rectangle: function Rectangle(comp) {
        return comp.obj.getBounds();
      }
    };
    Core.fitBounds = function(parms) {
      var comps = parms.comps;
      var map = parms.map;
      if (comps instanceof google.maps.LatLngBounds) {
        map.obj.fitBounds(comps);
      } else if ($.type(comps) === "object") {
        var bounds = _getBoundsByComponents(map.components, comps);
        map.obj.fitBounds(bounds);
      } else if (comps === "init" || comps === "initial") {
        map.obj.fitBounds(map.init.bounds);
        map.obj.setZoom(map.init.options.zoom);
      }
      return map;
    };
    Core.getBounds = function(parms) {
      var bounds = new google.maps.LatLngBounds();
      var compArray = parms.compArray;
      var ids = Util.toArray(parms.ids);
      for (var i = 0, i_end = ids.length; i < i_end; i++) {
        var comp = compArray.findById(ids[i]);
        if (comp) {
          bounds.union(BoundsFunction[compArray.getChildType()](comp));
        }
      }
      return bounds;
    };
    Core.getCenter = function(parms) {
      var bounds = Core.getBounds({
        compArray: parms.compArray,
        ids: parms.ids
      });
      return bounds.getCenter();
    };
    function _getBoundsByComponents(mapComps, comps) {
      var bounds = new google.maps.LatLngBounds();
      var types = Object.keys(comps);
      for (var i = 0, i_end = types.length; i < i_end; i++) {
        var type = Util.lookupComponentType(types[i]);
        var ids = _getIds(mapComps[type], comps[types[i]]);
        bounds.union(Core.getBounds({
          compArray: mapComps[type],
          ids: ids
        }));
      }
      return bounds;
    }
    function _getBoundsByPath(comp) {
      var bounds = new google.maps.LatLngBounds();
      var path = comp.obj.getPath();
      for (var i = 0, i_end = path.length; i < i_end; i++) {
        bounds.extend(path.getAt(i));
      }
      return bounds;
    }
    function _getBoundsByPaths(comp) {
      var bounds = new google.maps.LatLngBounds();
      var paths = comp.obj.getPaths();
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
      bounds.extend(comp.obj.getPosition());
      return bounds;
    }
    function _getIds(compArray, ids) {
      return ids === null || ids === "all" ? compArray.getIds() : ids;
    }
    return Core;
  }(Core || (Core = {}));
  var Core = function(Core) {
    "use strict";
    var CoordinateFunctions = {
      Label: function Label(obj) {
        return obj.getPosition();
      },
      Marker: function Marker(obj) {
        return obj.getPosition();
      },
      Polygon: function Polygon(obj) {
        return obj.getPaths();
      },
      Polyline: function Polyline(obj) {
        return obj.getPath();
      }
    };
    Core.getCoordinates = function(parms) {
      var compArray = parms.compArray;
      var stringify = parms.stringify;
      var ids = Util.toArray(parms.ids);
      var retVal = {};
      for (var i = 0, i_end = ids.length; i < i_end; i++) {
        var id = ids[i];
        var comp = compArray.findById(id);
        if (comp) {
          var coords = CoordinateFunctions[comp.type](comp.obj);
          retVal[id] = stringify ? Util.toString(coords) : coords;
        }
      }
      return _formatRetVal(retVal);
    };
    function _formatRetVal(retVal) {
      var keys = Object.keys(retVal);
      return keys.length === 1 ? retVal[keys[0]] : retVal;
    }
    return Core;
  }(Core || (Core = {}));
  var Core = function(Core) {
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
        return !comp.obj.getVisible();
      }
    };
    Core.hide = function(parms) {
      return _display(parms.compArray, parms.ids, Action.HIDE);
    };
    Core.show = function(parms) {
      return _display(parms.compArray, parms.ids, Action.SHOW);
    };
    Core.toggle = function(parms) {
      return _display(parms.compArray, parms.ids, Action.TOGGLE);
    };
    function _display(compArray, ids, action) {
      if ($.isArray(ids)) {
        return _multiDisplay(compArray, ids, action);
      }
      var comp = compArray.findById(ids);
      if (comp) {
        return _setVisibility(comp, action);
      }
    }
    function _multiDisplay(compArray, ids, action) {
      var newCompArray = Util.getNewComponentArray(compArray);
      for (var i = 0, i_end = ids.length; i < i_end; i++) {
        var comp = compArray.findById(ids[i]);
        if (comp) {
          newCompArray.push(_setVisibility(comp, action));
        }
      }
      return newCompArray;
    }
    function _setVisibility(comp, action) {
      comp.obj.setOptions({
        visible: Visibility[action](comp)
      });
      return comp;
    }
    return Core;
  }(Core || (Core = {}));
  var Core = function(Core, ComponentType) {
    "use strict";
    var DefaultOptions = {
      showMarkers: true,
      zoom: 12
    };
    var IconOptions = {
      geolocate_inner: {
        fillColor: "#2196f3",
        fillOpacity: 1,
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        strokeColor: "#FFF",
        strokeOpacity: 1,
        strokeWeight: 2
      },
      geolocate_outer: {
        fillColor: "#2196f3",
        fillOpacity: .5,
        path: google.maps.SymbolPath.CIRCLE,
        scale: 16,
        strokeOpacity: 0
      }
    };
    var MarkerIds = [ "geolocate_inner", "geolocate_outer" ];
    Core.geolocate = function(parms) {
      var map = parms.map;
      var options = $.extend({}, DefaultOptions, parms.options || {});
      if (window.navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          if (options.showMarkers === true && _markerExists(map) === false) {
            map.add(ComponentType.MARKER, [ _getMarkerOptions(MarkerIds[1], center), _getMarkerOptions(MarkerIds[0], center) ]);
          }
          map.markers(MarkerIds).setOptions({
            position: center,
            visible: options.showMarkers
          });
          return map.setOptions({
            center: center,
            zoom: options.zoom
          });
        });
      } else {
        return false;
      }
    };
    function _getMarkerOptions(id, position) {
      return {
        id: id,
        position: position,
        icon: IconOptions[id]
      };
    }
    function _markerExists(map) {
      var markers = map.components[ComponentType.MARKER];
      return markers.includes(MarkerIds[0]) === true || markers.includes(MarkerIds[1]) === true;
    }
    return Core;
  }(Core || (Core = {}), Const.ComponentType);
  var Core = function(Core, ComponentType) {
    "use strict";
    var Action = {
      ADD: "add",
      REMOVE_ALL: "remove_all",
      REMOVE_TYPE: "remove_type",
      TRIGGER: "trigger"
    };
    var Execute = {
      add: function add(comp, type, fn) {
        google.maps.event.addListener(comp.obj, type, fn);
        return comp;
      },
      remove_all: function remove_all(comp) {
        google.maps.event.clearInstanceListeners(comp.obj);
        return comp;
      },
      remove_type: function remove_type(comp, type) {
        google.maps.event.clearListeners(comp.obj, type);
        return comp;
      },
      trigger: function trigger(comp, type) {
        google.maps.event.trigger(comp.obj, type, {});
        return comp;
      }
    };
    Core.addListener = function(parms) {
      var compArray = parms.compArray;
      var func = parms.func;
      var ids = parms.ids;
      var type = Util.lookupEventType(parms.type);
      return _listener(compArray, ids, type, func, Action.ADD);
    };
    Core.removeListener = function(parms) {
      var compArray = parms.compArray;
      var ids = parms.ids;
      var type = Util.lookupEventType(parms.type);
      var action = type !== "all" ? Action.REMOVE_TYPE : Action.REMOVE_ALL;
      return _listener(compArray, ids, type, null, action);
    };
    Core.triggerListener = function(parms) {
      var compArray = parms.compArray;
      var ids = parms.ids;
      var type = Util.lookupEventType(parms.type);
      return _listener(compArray, ids, type, null, Action.TRIGGER);
    };
    function _listener(compArray, ids, type, func, action) {
      if (compArray.type === ComponentType.MAP) {
        return Execute[action](compArray, type, func);
      }
      if ($.isArray(ids)) {
        return _multiListener(compArray, ids, type, func, action);
      }
      var comp = compArray.findById(ids);
      if (comp) {
        return Execute[action](comp, type, func);
      }
    }
    function _multiListener(compArray, ids, type, func, action) {
      var newCompArray = Util.getNewComponentArray(compArray);
      for (var i = 0, i_end = ids.length; i < i_end; i++) {
        var comp = compArray.findById(ids[i]);
        if (comp) {
          newCompArray.push(Execute[action](comp, type, func));
        }
      }
      return newCompArray;
    }
    return Core;
  }(Core || (Core = {}), Const.ComponentType);
  var Core = function(Core, ComponentType) {
    "use strict";
    Core.getOptions = function(parms) {
      var compArray = parms.compArray;
      var compOption = parms.compOption || null;
      var compType = parms.compType;
      var ids = parms.ids;
      var retVal = {};
      if (compType === ComponentType.MAP) {
        retVal = _getComponentOptions(compArray, compOption);
      } else {
        for (var i = 0, i_end = ids.length; i < i_end; i++) {
          var id = ids[i];
          var comp = compArray.findById(id);
          if (comp) {
            retVal[id] = _getComponentOptions(comp, compOption);
          }
        }
      }
      return retVal ? _formatRetVal(retVal) : undefined;
    };
    Core.setOptions = function(parms) {
      var compArray = parms.compArray;
      var compOptions = parms.compOptions;
      var compType = parms.compType;
      var ids = parms.ids;
      var value = parms.value;
      compOptions = _formatComponentOptions(compOptions, compType, value);
      if (compType === ComponentType.MAP) {
        return _setOptions(compArray, compOptions);
      }
      if ($.isArray(ids)) {
        return _multiSetOptions(compArray, ids, compOptions);
      }
      var comp = compArray.findById(ids);
      if (comp) {
        return _setOptions(comp, compOptions);
      }
    };
    function _formatComponentOptions(compOptions, compType, value) {
      if ($.type(compOptions) === "string") {
        var optionName = Util.lookupComponentOption(compOptions);
        compOptions = {};
        compOptions[optionName] = value;
      } else {
        Util.renameComponentOptions(compOptions);
      }
      return compOptions = Util.convertComponentOptions({
        compOptions: compOptions,
        compType: compType
      });
    }
    function _formatRetVal(retVal) {
      var keys = Object.keys(retVal);
      return keys.length === 1 ? retVal[keys[0]] : retVal;
    }
    function _getComponentOptions(comp, compOptions) {
      compOptions = Util.lookupComponentOption(compOptions);
      var obj = $.extend({}, comp.obj);
      if (compOptions) {
        return obj[compOptions];
      }
      return Util.cleanComponentOptions({
        compOptions: obj,
        compType: comp.type
      });
    }
    function _setOptions(comp, options) {
      comp.obj.setOptions(options);
      return comp;
    }
    function _multiSetOptions(compArray, ids, options) {
      var newCompArray = Util.getNewComponentArray(compArray);
      for (var i = 0, i_end = ids.length; i < i_end; i++) {
        var comp = compArray.findById(ids[i]);
        if (comp) {
          newCompArray.push(_setOptions(comp, options));
        }
      }
      return newCompArray;
    }
    return Core;
  }(Core || (Core = {}), Const.ComponentType);
  var Core = function(Core) {
    "use strict";
    var Action = {
      POP: "pop",
      SHIFT: "shift"
    };
    var RemoveFunction = {
      pop: function pop(compArray) {
        var comp = compArray.data.pop();
        comp.obj.setMap(null);
        return comp;
      },
      shift: function shift(compArray) {
        var comp = compArray.data.shift();
        comp.obj.setMap(null);
        return comp;
      }
    };
    Core.pop = function(parms) {
      var count = parms.count || 1;
      var map = parms.map;
      var type = Util.lookupComponentType(parms.type);
      return _pop(map.components[type], count, Action.POP);
    };
    Core.remove = function(parms) {
      var ids = parms.ids;
      var map = parms.map;
      var type = Util.lookupComponentType(parms.type);
      if (Util.validMapComponent(type)) {
        var compArray = map.components[type];
        ids = ids || compArray.getIds();
        if ($.isArray(ids)) {
          return _multiRemove(compArray, ids);
        }
        var comp = compArray.findById(ids);
        if (comp) {
          return _remove(comp);
        }
      } else {
        return Util.throwError({
          method: "remove",
          message: type + " is not a valid map component",
          obj: {
            type: type
          }
        });
      }
    };
    Core.shift = function(parms) {
      var count = parms.count || 1;
      var map = parms.map;
      var type = Util.lookupComponentType(parms.type);
      return _pop(map.components[type], count, Action.SHIFT);
    };
    function _remove(comp) {
      var compArray = comp.map.components[comp.type];
      var index = compArray.data.indexOf(comp);
      comp.obj.setMap(null);
      return compArray.data.splice(index, 1)[0];
    }
    function _multiRemove(compArray, ids) {
      var newCompArray = Util.getNewComponentArray(compArray);
      for (var i = 0, i_end = ids.length; i < i_end; i++) {
        var comp = compArray.findById(ids[i]);
        if (comp) {
          newCompArray.push(_remove(comp));
        }
      }
      return newCompArray;
    }
    function _pop(compArray, count, action) {
      var newCompArray = Util.getNewComponentArray(compArray);
      while (count > 0 && compArray.data.length > 0) {
        newCompArray.push(RemoveFunction[action](compArray));
        count--;
      }
      return newCompArray;
    }
    return Core;
  }(Core || (Core = {}));
  var Core = function(Core, ComponentType) {
    "use strict";
    Core.reset = function(parms) {
      var compArray = parms.compArray;
      var ids = parms.ids;
      if (compArray.type === ComponentType.MAP) {
        compArray.obj.fitBounds(compArray.init.bounds);
        return _reset(compArray);
      }
      if ($.isArray(ids)) {
        return _multiReset(compArray, ids);
      }
      var comp = compArray.findByID(ids);
      if (comp) {
        return _reset(comp);
      }
    };
    function _reset(comp) {
      comp.obj.setOptions(comp.init.options);
      return comp;
    }
    function _multiReset(compArray, ids) {
      var newCompArray = Util.getNewComponentArray(compArray);
      for (var i = 0, i_end = ids.length; i < i_end; i++) {
        var comp = compArray.findById(ids[i]);
        if (comp) {
          newCompArray.push(_reset(comp));
        }
      }
      return newCompArray;
    }
    return Core;
  }(Core || (Core = {}), Const.ComponentType);
  var Core = function(Core) {
    "use strict";
    Core.search = function(parms) {
      var ids = parms.ids;
      var map = parms.map;
      var matching = parms.matching;
      var type = parms.type;
      var compArray = map.components[type];
      var newCompArray = Util.getNewComponentArray(compArray);
      newCompArray.data = ids !== undefined ? _getDataByIds(compArray, Util.toArray(ids), matching) : compArray.data.slice(0);
      return newCompArray;
    };
    function _getDataByIds(compArray, ids, matching) {
      return compArray.data.filter(function(comp) {
        return matching === true ? ids.indexOf(comp.id) !== -1 : ids.indexOf(comp.id) === -1;
      });
    }
    return Core;
  }(Core || (Core = {}));
  !function(ComponentType) {
    "use strict";
    gmap.prototype = {
      add: function add(type, compOptions) {
        return Core.addComponent({
          compOptions: compOptions,
          map: this,
          type: type
        });
      },
      circles: function circles(ids) {
        return Core.search({
          ids: ids,
          map: this,
          matching: true,
          type: ComponentType.CIRCLE
        });
      },
      fitBounds: function fitBounds(comps) {
        return Core.fitBounds({
          map: this,
          comps: comps
        });
      },
      geolocate: function geolocate(options) {
        return Core.geolocate({
          map: this,
          options: options
        });
      },
      getBounds: function getBounds() {
        return this.obj.getBounds();
      },
      getCenter: function getCenter() {
        return this.obj.getCenter();
      },
      getCenterString: function getCenterString() {
        return Util.toString(this.getCenter());
      },
      getOptions: function getOptions(compOption) {
        return Core.getOptions({
          compArray: this,
          compOption: compOption,
          compType: this.type
        });
      },
      getDiv: function getDiv() {
        return this.obj.getDiv();
      },
      getProjection: function getProjection() {
        return this.obj.getProjection();
      },
      getZoom: function getZoom() {
        return this.obj.getZoom();
      },
      labels: function labels(ids) {
        return Core.search({
          ids: ids,
          map: this,
          matching: true,
          type: ComponentType.LABEL
        });
      },
      markers: function markers(ids) {
        return Core.search({
          ids: ids,
          map: this,
          matching: true,
          type: ComponentType.MARKER
        });
      },
      off: function off(type) {
        return Core.removeListener({
          compArray: this,
          type: type
        });
      },
      on: function on(type, func) {
        return Core.addListener({
          compArray: this,
          func: func,
          type: type
        });
      },
      polygons: function polygons(ids) {
        return Core.search({
          ids: ids,
          map: this,
          matching: true,
          type: ComponentType.POLYGON
        });
      },
      polylines: function polylines(ids) {
        return Core.search({
          ids: ids,
          map: this,
          matching: true,
          type: ComponentType.POLYLINE
        });
      },
      rectangles: function rectangles(ids) {
        return Core.search({
          ids: ids,
          map: this,
          matching: true,
          type: ComponentType.RECTANGLE
        });
      },
      remove: function remove(type, ids) {
        return Core.remove({
          ids: ids,
          map: this,
          type: type
        });
      },
      reset: function reset() {
        return Core.reset({
          compArray: this
        });
      },
      setCenter: function setCenter(center) {
        if (center !== undefined) {
          this.obj.setCenter(Util.toLatLng(center));
        }
        return this;
      },
      setOptions: function setOptions(compOptions, value) {
        return Core.setOptions({
          compArray: this,
          compOptions: compOptions,
          compType: this.type,
          value: value
        });
      },
      setZoom: function setZoom(zoom) {
        if (zoom !== undefined) {
          this.obj.setZoom(zoom);
        }
        return this;
      },
      trigger: function trigger(type) {
        return Core.triggerListener({
          compArray: this,
          type: type
        });
      }
    };
    return gmap;
  }(Const.ComponentType);
  !function(gmap) {
    "use strict";
    var Shape = [ "decagon", "hexagon", "pentagon", "rectangle", "square", "triangle" ];
    var ShapeDegrees = {
      decagon: [ 36, 72, 108, 144, 180, 216, 252, 288, 324, 360 ],
      hexagon: [ 30, 90, 150, 210, 270, 330 ],
      pentagon: [ 72, 144, 216, 288, 360 ],
      rectangle: [ 60, 120, 240, 300 ],
      square: [ 45, 135, 225, 315 ],
      triangle: [ 120, 240, 360 ]
    };
    gmap.prototype.shape = function(type, parms) {
      if (_validShapeType(type)) {
        return _getShapePath(this, parms, type);
      } else {
        return Util.throwError({
          method: "shape",
          message: type + " is not a valid shape",
          obj: {
            type: type
          }
        });
      }
    };
    function _getShapePath(map, parms, type) {
      parms = $.isPlainObject(parms) ? parms : {};
      parms.center = parms.center || map.getCenter();
      parms.size = parms.size || Util.getSizeFromZoom(map.getZoom());
      if ($.type(parms.center) === "string") {
        parms.center = Util.toLatLng(parms.center);
      }
      var path = [];
      for (var i = 0, i_end = ShapeDegrees[type].length; i < i_end; i++) {
        path.push(Util.getDestinationPoint({
          bearing: ShapeDegrees[type][i],
          distance: parms.size,
          latLng: parms.center
        }));
      }
      return path;
    }
    function _validShapeType(type) {
      type = Util.toLowerCase(type);
      return Shape.includes(type);
    }
    return gmap;
  }(gmap);
  var Util = function(Util) {
    "use strict";
    Util.getDestinationPoint = function(parms) {
      var bearing = _toRad(parms.bearing);
      var distance = parms.distance / 6371;
      var latLng = parms.latLng;
      var src_lat = _toRad(latLng.lat());
      var src_lng = _toRad(latLng.lng());
      var dest_lat = Math.asin(Math.sin(src_lat) * Math.cos(distance) + Math.cos(src_lat) * Math.sin(distance) * Math.cos(bearing));
      var dest_lng = src_lng + Math.atan2(Math.sin(bearing) * Math.sin(distance) * Math.cos(src_lat), Math.cos(distance) - Math.sin(src_lat) * Math.sin(dest_lat));
      if (isNaN(src_lng) || isNaN(dest_lng)) {
        return null;
      }
      return new google.maps.LatLng(_toDeg(dest_lat), _toDeg(dest_lng));
    };
    Util.getSizeFromZoom = function(zoom) {
      var minZoom = 5;
      var size = 500;
      return zoom <= minZoom ? size : size / Math.pow(2, zoom - minZoom);
    };
    function _toRad(val) {
      return val * Math.PI / 180;
    }
    function _toDeg(val) {
      return val * 180 / Math.PI;
    }
    return Util;
  }(Util || (Util = {}));
  var Components = function(Components) {
    "use strict";
    var BaseComponent = function BaseComponent(parms) {
      _classCallCheck(this, BaseComponent);
      var id = parms.id;
      var map = parms.options.map.gmaps.parent;
      var obj = parms.obj;
      var options = parms.options;
      var type = parms.type;
      this.id = id;
      this.init = {
        options: options
      };
      this.map = map;
      this.obj = obj;
      this.obj["gmaps"] = {
        id: id,
        map: map,
        parent: this,
        version: gmap.version
      };
      this.type = type;
    };
    Components.BaseComponent = BaseComponent;
    return Components;
  }(Components || (Components = {}));
  var Components = function(Components) {
    "use strict";
    var BaseComponentArray = function() {
      function BaseComponentArray(parms) {
        _classCallCheck(this, BaseComponentArray);
        this.data = [];
        this.map = parms.map;
        this.seed = 0;
        this.type = parms.type;
      }
      BaseComponentArray.prototype.copy = function copy() {
        return Util.copy({
          compArray: this
        });
      };
      BaseComponentArray.prototype.filter = function filter(fn) {
        return this.data.filter(fn);
      };
      BaseComponentArray.prototype.find = function find(fn) {
        return this.data.find(fn);
      };
      BaseComponentArray.prototype.findById = function findById(id) {
        return this.data.find(function(comp) {
          return comp.id === id;
        });
      };
      BaseComponentArray.prototype.getBounds = function getBounds() {
        return Core.getBounds({
          compArray: this,
          ids: this.getIds()
        });
      };
      BaseComponentArray.prototype.getCenter = function getCenter() {
        return Core.getCenter({
          compArray: this,
          ids: this.getIds()
        });
      };
      BaseComponentArray.prototype.getCenterString = function getCenterString() {
        return Util.toString(this.getCenter());
      };
      BaseComponentArray.prototype.getChildType = function getChildType() {
        return this.type.replace("Array", "");
      };
      BaseComponentArray.prototype.getGoogleObjects = function getGoogleObjects() {
        return this.data.map(function(comp) {
          return comp.obj;
        });
      };
      BaseComponentArray.prototype.getIds = function getIds() {
        return this.data.map(function(comp) {
          return comp.id;
        });
      };
      BaseComponentArray.prototype.getOptions = function getOptions(compOption) {
        return Core.getOptions({
          compArray: this,
          compOption: compOption,
          compType: this.getChildType(),
          ids: this.getIds()
        });
      };
      BaseComponentArray.prototype.hide = function hide() {
        return Core.hide({
          compArray: this,
          ids: this.getIds()
        });
      };
      BaseComponentArray.prototype.includes = function includes(id) {
        return this.findById(id) !== undefined;
      };
      BaseComponentArray.prototype.others = function others() {
        return Core.search({
          ids: this.getIds(),
          map: this.map,
          matching: false,
          type: this.getChildType()
        });
      };
      BaseComponentArray.prototype.pop = function pop(count) {
        return Core.pop({
          count: count,
          map: this.map,
          type: this.getChildType()
        });
      };
      BaseComponentArray.prototype.push = function push(comp) {
        return this.data.push(comp);
      };
      BaseComponentArray.prototype.reset = function reset() {
        return Core.reset({
          compArray: this,
          ids: this.getIds()
        });
      };
      BaseComponentArray.prototype.shift = function shift(count) {
        return Core.shift({
          count: count,
          map: this.map,
          type: this.getChildType()
        });
      };
      BaseComponentArray.prototype.show = function show() {
        return Core.show({
          compArray: this,
          ids: this.getIds()
        });
      };
      BaseComponentArray.prototype.setOptions = function setOptions(compOptions, value) {
        return Core.setOptions({
          compArray: this,
          compOptions: compOptions,
          compType: this.getChildType(),
          ids: this.getIds(),
          value: value
        });
      };
      BaseComponentArray.prototype.toggle = function toggle() {
        return Core.toggle({
          compArray: this,
          ids: this.getIds()
        });
      };
      BaseComponentArray.prototype.zoom = function zoom() {
        var comps = {};
        comps[this.getChildType()] = this.getIds();
        Core.fitBounds({
          map: this.map,
          comps: comps
        });
        return this;
      };
      return BaseComponentArray;
    }();
    Components.BaseComponentArray = BaseComponentArray;
    return Components;
  }(Components || (Components = {}));
  var Components = function(Components) {
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
      var _this2 = this;
      Object.keys(Default).forEach(function(key) {
        _this2.set(Property[key], Default[key]);
      });
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
      if (latLng instanceof google.maps.LatLng === false) {
        latLng = new google.maps.LatLng(latLng);
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
      if (this["gmaps"]) {
        if (this.getVisible()) {
          this.setMap(this["gmaps"].map.obj);
        } else {
          this.setMap(null);
        }
      }
    };
    Components.GoogleLabel = googleLabel;
    return Components;
  }(Components || (Components = {}));
  var Components = function(Components, ComponentType) {
    "use strict";
    var Circle = function(_Components$BaseCompo) {
      _inherits(Circle, _Components$BaseCompo);
      function Circle(parms) {
        _classCallCheck(this, Circle);
        return _possibleConstructorReturn(this, _Components$BaseCompo.call(this, {
          id: parms.id,
          obj: new google.maps.Circle(parms.options),
          options: parms.options,
          type: ComponentType.CIRCLE
        }));
      }
      return Circle;
    }(Components.BaseComponent);
    Components.Circle = Circle;
    return Components;
  }(Components || (Components = {}), Const.ComponentType);
  var Components = function(Components, ComponentType) {
    "use strict";
    var CircleArray = function(_Components$BaseCompo2) {
      _inherits(CircleArray, _Components$BaseCompo2);
      function CircleArray(parms) {
        _classCallCheck(this, CircleArray);
        return _possibleConstructorReturn(this, _Components$BaseCompo2.call(this, {
          map: parms.map,
          type: ComponentType.CIRCLE_ARRAY
        }));
      }
      CircleArray.prototype.off = function off(type) {
        return Core.removeListener({
          compArray: this,
          ids: this.getIds(),
          type: type
        });
      };
      CircleArray.prototype.on = function on(type, func) {
        return Core.addListener({
          compArray: this,
          func: func,
          ids: this.getIds(),
          type: type
        });
      };
      CircleArray.prototype.trigger = function trigger(type) {
        return Core.triggerListener({
          compArray: this,
          ids: this.getIds(),
          type: type
        });
      };
      return CircleArray;
    }(Components.BaseComponentArray);
    Components.CircleArray = CircleArray;
    return Components;
  }(Components || (Components = {}), Const.ComponentType);
  var Components = function(Components, ComponentType) {
    "use strict";
    var Label = function(_Components$BaseCompo3) {
      _inherits(Label, _Components$BaseCompo3);
      function Label(parms) {
        _classCallCheck(this, Label);
        return _possibleConstructorReturn(this, _Components$BaseCompo3.call(this, {
          id: parms.id,
          obj: new Components.GoogleLabel(parms.options),
          options: parms.options,
          type: ComponentType.LABEL
        }));
      }
      return Label;
    }(Components.BaseComponent);
    Components.Label = Label;
    return Components;
  }(Components || (Components = {}), Const.ComponentType);
  var Components = function(Components, ComponentType) {
    "use strict";
    var LabelArray = function(_Components$BaseCompo4) {
      _inherits(LabelArray, _Components$BaseCompo4);
      function LabelArray(parms) {
        _classCallCheck(this, LabelArray);
        return _possibleConstructorReturn(this, _Components$BaseCompo4.call(this, {
          map: parms.map,
          type: ComponentType.LABEL_ARRAY
        }));
      }
      LabelArray.prototype.getPosition = function getPosition() {
        return Core.getCoordinates({
          compArray: this,
          ids: this.getIds()
        });
      };
      LabelArray.prototype.getPositionString = function getPositionString() {
        return Core.getCoordinates({
          compArray: this,
          stringify: true,
          ids: this.getIds()
        });
      };
      return LabelArray;
    }(Components.BaseComponentArray);
    Components.LabelArray = LabelArray;
    return Components;
  }(Components || (Components = {}), Const.ComponentType);
  var Components = function(Components, ComponentType) {
    "use strict";
    var Marker = function(_Components$BaseCompo5) {
      _inherits(Marker, _Components$BaseCompo5);
      function Marker(parms) {
        _classCallCheck(this, Marker);
        return _possibleConstructorReturn(this, _Components$BaseCompo5.call(this, {
          id: parms.id,
          obj: new google.maps.Marker(parms.options),
          options: parms.options,
          type: ComponentType.MARKER
        }));
      }
      return Marker;
    }(Components.BaseComponent);
    Components.Marker = Marker;
    return Components;
  }(Components || (Components = {}), Const.ComponentType);
  var Components = function(Components, ComponentType) {
    "use strict";
    var MarkerArray = function(_Components$BaseCompo6) {
      _inherits(MarkerArray, _Components$BaseCompo6);
      function MarkerArray(parms) {
        _classCallCheck(this, MarkerArray);
        return _possibleConstructorReturn(this, _Components$BaseCompo6.call(this, {
          map: parms.map,
          type: ComponentType.MARKER_ARRAY
        }));
      }
      MarkerArray.prototype.getPosition = function getPosition() {
        return Core.getCoordinates({
          compArray: this,
          ids: this.getIds()
        });
      };
      MarkerArray.prototype.getPositionString = function getPositionString() {
        return Core.getCoordinates({
          compArray: this,
          stringify: true,
          ids: this.getIds()
        });
      };
      MarkerArray.prototype.off = function off(type) {
        return Core.removeListener({
          compArray: this,
          ids: this.getIds(),
          type: type
        });
      };
      MarkerArray.prototype.on = function on(type, func) {
        return Core.addListener({
          compArray: this,
          func: func,
          ids: this.getIds(),
          type: type
        });
      };
      MarkerArray.prototype.trigger = function trigger(type) {
        return Core.triggerListener({
          compArray: this,
          ids: this.getIds(),
          type: type
        });
      };
      return MarkerArray;
    }(Components.BaseComponentArray);
    Components.MarkerArray = MarkerArray;
    return Components;
  }(Components || (Components = {}), Const.ComponentType);
  var Components = function(Components, ComponentType) {
    "use strict";
    var Polygon = function(_Components$BaseCompo7) {
      _inherits(Polygon, _Components$BaseCompo7);
      function Polygon(parms) {
        _classCallCheck(this, Polygon);
        return _possibleConstructorReturn(this, _Components$BaseCompo7.call(this, {
          id: parms.id,
          obj: new google.maps.Polygon(parms.options),
          options: parms.options,
          type: ComponentType.POLYGON
        }));
      }
      return Polygon;
    }(Components.BaseComponent);
    Components.Polygon = Polygon;
    return Components;
  }(Components || (Components = {}), Const.ComponentType);
  var Components = function(Components, ComponentType) {
    "use strict";
    var PolygonArray = function(_Components$BaseCompo8) {
      _inherits(PolygonArray, _Components$BaseCompo8);
      function PolygonArray(parms) {
        _classCallCheck(this, PolygonArray);
        return _possibleConstructorReturn(this, _Components$BaseCompo8.call(this, {
          map: parms.map,
          type: ComponentType.POLYGON_ARRAY
        }));
      }
      PolygonArray.prototype.getPath = function getPath() {
        return Core.getCoordinates({
          compArray: this,
          ids: this.getIds()
        });
      };
      PolygonArray.prototype.getPathString = function getPathString() {
        return Core.getCoordinates({
          compArray: this,
          stringify: true,
          ids: this.getIds()
        });
      };
      PolygonArray.prototype.off = function off(type) {
        return Core.removeListener({
          compArray: this,
          ids: this.getIds(),
          type: type
        });
      };
      PolygonArray.prototype.on = function on(type, func) {
        return Core.addListener({
          compArray: this,
          func: func,
          ids: this.getIds(),
          type: type
        });
      };
      PolygonArray.prototype.trigger = function trigger(type) {
        return Core.triggerListener({
          compArray: this,
          ids: this.getIds(),
          type: type
        });
      };
      return PolygonArray;
    }(Components.BaseComponentArray);
    Components.PolygonArray = PolygonArray;
    return Components;
  }(Components || (Components = {}), Const.ComponentType);
  var Components = function(Components, ComponentType) {
    "use strict";
    var Polyline = function(_Components$BaseCompo9) {
      _inherits(Polyline, _Components$BaseCompo9);
      function Polyline(parms) {
        _classCallCheck(this, Polyline);
        return _possibleConstructorReturn(this, _Components$BaseCompo9.call(this, {
          id: parms.id,
          obj: new google.maps.Polyline(parms.options),
          options: parms.options,
          type: ComponentType.POLYLINE
        }));
      }
      return Polyline;
    }(Components.BaseComponent);
    Components.Polyline = Polyline;
    return Components;
  }(Components || (Components = {}), Const.ComponentType);
  var Components = function(Components, ComponentType) {
    "use strict";
    var PolylineArray = function(_Components$BaseCompo10) {
      _inherits(PolylineArray, _Components$BaseCompo10);
      function PolylineArray(parms) {
        _classCallCheck(this, PolylineArray);
        return _possibleConstructorReturn(this, _Components$BaseCompo10.call(this, {
          map: parms.map,
          type: ComponentType.POLYLINE_ARRAY
        }));
      }
      PolylineArray.prototype.getPath = function getPath() {
        return Core.getCoordinates({
          compArray: this,
          ids: this.getIds()
        });
      };
      PolylineArray.prototype.getPathString = function getPathString() {
        return Core.getCoordinates({
          compArray: this,
          stringify: true,
          ids: this.getIds()
        });
      };
      PolylineArray.prototype.off = function off(type) {
        return Core.removeListener({
          compArray: this,
          ids: this.getIds(),
          type: type
        });
      };
      PolylineArray.prototype.on = function on(type, func) {
        return Core.addListener({
          compArray: this,
          func: func,
          ids: this.getIds(),
          type: type
        });
      };
      PolylineArray.prototype.trigger = function trigger(type) {
        return Core.triggerListener({
          compArray: this,
          ids: this.getIds(),
          type: type
        });
      };
      return PolylineArray;
    }(Components.BaseComponentArray);
    Components.PolylineArray = PolylineArray;
    return Components;
  }(Components || (Components = {}), Const.ComponentType);
  var Components = function(Components, ComponentType) {
    "use strict";
    var Rectangle = function(_Components$BaseCompo11) {
      _inherits(Rectangle, _Components$BaseCompo11);
      function Rectangle(parms) {
        _classCallCheck(this, Rectangle);
        return _possibleConstructorReturn(this, _Components$BaseCompo11.call(this, {
          id: parms.id,
          obj: new google.maps.Rectangle(parms.options),
          options: parms.options,
          type: ComponentType.RECTANGLE
        }));
      }
      return Rectangle;
    }(Components.BaseComponent);
    Components.Rectangle = Rectangle;
    return Components;
  }(Components || (Components = {}), Const.ComponentType);
  var Components = function(Components, ComponentType) {
    "use strict";
    var RectangleArray = function(_Components$BaseCompo12) {
      _inherits(RectangleArray, _Components$BaseCompo12);
      function RectangleArray(parms) {
        _classCallCheck(this, RectangleArray);
        return _possibleConstructorReturn(this, _Components$BaseCompo12.call(this, {
          map: parms.map,
          type: ComponentType.RECTANGLE_ARRAY
        }));
      }
      RectangleArray.prototype.off = function off(type) {
        return Core.removeListener({
          compArray: this,
          ids: this.getIds(),
          type: type
        });
      };
      RectangleArray.prototype.on = function on(type, func) {
        return Core.addListener({
          compArray: this,
          func: func,
          ids: this.getIds(),
          type: type
        });
      };
      RectangleArray.prototype.trigger = function trigger(type) {
        return Core.triggerListener({
          compArray: this,
          ids: this.getIds(),
          type: type
        });
      };
      return RectangleArray;
    }(Components.BaseComponentArray);
    Components.RectangleArray = RectangleArray;
    return Components;
  }(Components || (Components = {}), Const.ComponentType);
  gmap.version = "1.0.0-alpha.6";
}();