/*!
 * gmaps v5.0.1-alpha (https://github.com/tmentink/gmaps)
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
        compOptions: settings[Const.Settings.MAP_OPTIONS]
      });
      var mapId = settings[Const.Settings.MAP_ID];
      var mapContainer = document.getElementById(mapId);
      if (!mapContainer) {
        return Util.throwError({
          method: "new gmap",
          message: "Could not find an element with an Id of " + mapId,
          obj: settings
        });
      }
      this.components = {
        Label: new Components.LabelArray({
          map: this
        }),
        Marker: new Components.MarkerArray({
          map: this
        }),
        Polygon: new Components.PolygonArray({
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
  !function(Settings) {
    "use strict";
    Settings.delimitedStrings = true;
    Settings.delimiter = {
      latLng: "|",
      latLngArray: "~"
    };
    Settings.labelOptions = {
      align: "center",
      fontColor: "#000",
      fontSize: 14,
      strokeColor: "#FFF",
      strokeWeight: 1,
      visible: true
    };
    Settings.mapId = "gmap";
    Settings.mapOptions = {
      center: {
        lat: 37.5,
        lng: -120
      },
      clickableIcons: false,
      disableDoubleClickZoom: false,
      gestureHandling: "auto",
      keyboardShortcuts: true,
      mapTypeControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: true,
      streetViewControl: false,
      zoom: 6,
      zoomControl: false
    };
    Settings.markerOptions = {
      clickable: true,
      crossOnDrag: true,
      draggable: false,
      opacity: 1,
      optimized: true,
      visible: true
    };
    Settings.polygonOptions = {
      clickable: true,
      draggable: false,
      editable: false,
      fillColor: "#2185D0",
      fillOpacity: .75,
      geodesic: false,
      strokeColor: "#000",
      strokeOpacity: .75,
      strokeWeight: 1,
      visible: true
    };
    Settings.urlPrecision = 5;
    return Settings;
  }(gmap.settings || (gmap.settings = {}));
  var Const = function(Const) {
    "use strict";
    Const.ComponentOption = {
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
      VISIBLE: "visible",
      ZOOM: "zoom",
      ZOOM_CONTROL: "zoomControl",
      ZOOM_CONTROL_OPTIONS: "zoomControlOptions",
      Z_INDEX: "zIndex"
    };
    Const.ComponentType = {
      LABEL: "Label",
      LABEL_ARRAY: "LabelArray",
      MAP: "Map",
      MARKER: "Marker",
      MARKER_ARRAY: "MarkerArray",
      POLYGON: "Polygon",
      POLYGON_ARRAY: "PolygonArray"
    };
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
    Const.Settings = {
      DELIMITED_STRINGS: "delimitedStrings",
      DELIMITER: "delimiter",
      LABEL_OPTIONS: "labelOptions",
      MAP_ID: "mapId",
      MAP_OPTIONS: "mapOptions",
      MARKER_OPTIONS: "markerOptions",
      POLYGON_OPTIONS: "polygonOptions",
      URL_PRECISION: "urlPrecision"
    };
    return Const;
  }(Const || (Const = {}));
  var Util = function(Util, ComponentOption) {
    "use strict";
    var Conversions = {
      center: function center(parms) {
        if (parms.center) {
          parms.center = Util.toLatLng(parms.center);
        }
      },
      path: function path(parms) {
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
    var ConvertableOptions = {
      Label: {
        position: Conversions.position
      },
      Map: {
        center: Conversions.center
      },
      Marker: {
        position: Conversions.position
      },
      Polygon: {
        path: Conversions.path,
        paths: Conversions.path
      }
    };
    var ComponentOptions = {
      Circle: [ ComponentOption.CENTER, ComponentOption.CLICKABLE, ComponentOption.DRAGGABLE, ComponentOption.EDITABLE, ComponentOption.FILL_COLOR, ComponentOption.FILL_OPACITY, ComponentOption.MAP, ComponentOption.RADIUS, ComponentOption.STROKE_COLOR, ComponentOption.STROKE_OPACITY, ComponentOption.STROKE_POSITION, ComponentOption.STROKE_WEIGHT, ComponentOption.VISIBLE, ComponentOption.Z_INDEX ],
      GroundOverlay: [ ComponentOption.CLICKABLE, ComponentOption.MAP, ComponentOption.OPACITY ],
      InfoWindow: [ ComponentOption.CONTENT, ComponentOption.DISABLE_AUTO_PAN, ComponentOption.MAX_WIDTH, ComponentOption.PIXEL_OFFSET, ComponentOption.POSITION, ComponentOption.Z_INDEX ],
      Map: [ ComponentOption.BACKGROUND_COLOR, ComponentOption.CENTER, ComponentOption.CLICKABLE_ICONS, ComponentOption.DISABLE_DEFAULT_UI, ComponentOption.DISABLE_DOUBLE_CLICK_ZOOM, ComponentOption.DRAGGABLE, ComponentOption.DRAGGABLE_CURSOR, ComponentOption.DRAGGING_CURSOR, ComponentOption.FULLSCREEN_CONTROL, ComponentOption.FULLSCREEN_CONTROL_OPTIONS, ComponentOption.GESTURE_HANDLING, ComponentOption.HEADING, ComponentOption.KEYBOARD_SHORTCUTS, ComponentOption.MAP_TYPE_CONTROL, ComponentOption.MAP_TYPE_CONTROL_OPTIONS, ComponentOption.MAP_TYPE_ID, ComponentOption.MAX_ZOOM, ComponentOption.NO_CLEAR, ComponentOption.PAN_CONTROL, ComponentOption.PAN_CONTROL_OPTIONS, ComponentOption.ROTATE_CONTROL, ComponentOption.ROTATE_CONTROL_OPTIONS, ComponentOption.SCALE_CONTROL, ComponentOption.SCALE_CONTROL_OPTIONS, ComponentOption.SCROLL_WHEEL, ComponentOption.STREET_VIEW, ComponentOption.STREET_VIEW_CONTROL, ComponentOption.STREET_VIEW_CONTROL_OPTIONS, ComponentOption.STYLES, ComponentOption.TILT, ComponentOption.ZOOM, ComponentOption.ZOOM_CONTROL, ComponentOption.ZOOM_CONTROL_OPTIONS ],
      Marker: [ ComponentOption.ANCHOR_POINT, ComponentOption.ANIMATION, ComponentOption.CLICKABLE, ComponentOption.CROSS_ON_DRAG, ComponentOption.CURSOR, ComponentOption.DRAGGABLE, ComponentOption.ICON, ComponentOption.LABEL, ComponentOption.MAP, ComponentOption.OPACITY, ComponentOption.OPTIMIZED, ComponentOption.PLACE, ComponentOption.POSITION, ComponentOption.SHAPE, ComponentOption.TITLE, ComponentOption.VISIBLE, ComponentOption.Z_INDEX ],
      Polyline: [ ComponentOption.CLICKABLE, ComponentOption.DRAGGABLE, ComponentOption.EDITABLE, ComponentOption.GEODESIC, ComponentOption.ICONS, ComponentOption.MAP, ComponentOption.PATH, ComponentOption.STROKE_COLOR, ComponentOption.STROKE_OPACITY, ComponentOption.STROKE_WEIGHT, ComponentOption.VISIBLE, ComponentOption.Z_INDEX ],
      Polygon: [ ComponentOption.CLICKABLE, ComponentOption.DRAGGABLE, ComponentOption.EDITABLE, ComponentOption.FILL_COLOR, ComponentOption.FILL_OPACITY, ComponentOption.GEODESIC, ComponentOption.MAP, ComponentOption.PATHS, ComponentOption.STROKE_COLOR, ComponentOption.STROKE_OPACITY, ComponentOption.STROKE_POSITION, ComponentOption.STROKE_WEIGHT, ComponentOption.VISIBLE, ComponentOption.Z_INDEX ],
      Rectangle: [ ComponentOption.BOUNDS, ComponentOption.CLICKABLE, ComponentOption.DRAGGABLE, ComponentOption.EDITABLE, ComponentOption.FILL_COLOR, ComponentOption.FILL_OPACITY, ComponentOption.MAP, ComponentOption.STROKE_COLOR, ComponentOption.STROKE_OPACITY, ComponentOption.STROKE_POSITION, ComponentOption.STROKE_WEIGHT, ComponentOption.VISIBLE, ComponentOption.Z_INDEX ]
    };
    var MapComponents = [ Const.ComponentType.LABEL, Const.ComponentType.MARKER, Const.ComponentType.POLYGON ];
    Util.cleanComponentOptions = function(parms) {
      var compOptions = parms.compOptions;
      var compType = parms.compType.replace("Array", "");
      Object.keys(compOptions).forEach(function(key) {
        if (ComponentOptions[compType].indexOf(key) === -1) {
          delete compOptions[key];
        }
      });
      return compOptions;
    };
    Util.convertComponentOptions = function(parms) {
      var compOptions = parms.compOptions;
      var compType = parms.compType.replace("Array", "");
      Object.keys(ConvertableOptions[compType]).forEach(function(key) {
        ConvertableOptions[compType][key](compOptions);
      });
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
    Util.getGoogleObjects = function(parms) {
      return parms.compArray.data.map(function(comp) {
        return comp.obj;
      });
    };
    Util.getIds = function(parms) {
      return parms.compArray.data.map(function(comp) {
        return comp.id;
      });
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
          newName: Util.getComponentOption(key),
          obj: compOptions,
          oldName: key
        });
      });
      return compOptions;
    };
    Util.validComponentOption = function(parms) {
      var compType = parms.compType;
      var compOption = parms.compOption;
      return ComponentOptions[compType].includes(compOption);
    };
    Util.validMapComponent = function(type) {
      return MapComponents.includes(type);
    };
    function _getPrototypes(compArray) {
      var proto = Object.keys(Object.getPrototypeOf(compArray));
      var base_proto = Object.keys(Object.getPrototypeOf(new Components.BaseComponentArray({})));
      return proto.concat(base_proto);
    }
    return Util;
  }(Util || (Util = {}), Const.ComponentOption);
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
    Util.toLowerCase = function(val) {
      var regex = /\s+|\_+/g;
      if ($.type(val) === "string") {
        return val.toLowerCase().replace(regex, "");
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
    var SettingsAlias = {
      delimitedstrings: Const.Settings.DELIMITED_STRINGS,
      delimiter: Const.Settings.DELIMITER,
      labeloptions: Const.Settings.LABEL_OPTIONS,
      mapid: Const.Settings.MAP_ID,
      mapoptions: Const.Settings.MAP_OPTIONS,
      markeroptions: Const.Settings.MARKER_OPTIONS,
      polygonoptions: Const.Settings.POLYGON_OPTIONS,
      urlprecision: Const.Settings.URL_PRECISION
    };
    var ComponentOptionAlias = {
      anchorpoint: Const.ComponentOption.ANCHOR_POINT,
      animation: Const.ComponentOption.ANIMATION,
      backgroundcolor: Const.ComponentOption.BACKGROUND_COLOR,
      bounds: Const.ComponentOption.BOUNDS,
      center: Const.ComponentOption.CENTER,
      clickable: Const.ComponentOption.CLICKABLE,
      clickableicons: Const.ComponentOption.CLICKABLE_ICONS,
      content: Const.ComponentOption.CONTENT,
      crossondrag: Const.ComponentOption.CROSS_ON_DRAG,
      cursor: Const.ComponentOption.CURSOR,
      disableautopan: Const.ComponentOption.DISABLE_AUTO_PAN,
      disabledefaultui: Const.ComponentOption.DISABLE_DEFAULT_UI,
      disabledoubleclickzoom: Const.ComponentOption.DISABLE_DOUBLE_CLICK_ZOOM,
      draggable: Const.ComponentOption.DRAGGABLE,
      draggablecursor: Const.ComponentOption.DRAGGABLE_CURSOR,
      draggingcursor: Const.ComponentOption.DRAGGING_CURSOR,
      editable: Const.ComponentOption.EDITABLE,
      fillcolor: Const.ComponentOption.FILL_COLOR,
      fillopacity: Const.ComponentOption.FILL_OPACITY,
      fullscreencontrol: Const.ComponentOption.FULLSCREEN_CONTROL,
      fullscreencontroloptions: Const.ComponentOption.FULLSCREEN_CONTROL_OPTIONS,
      geodesic: Const.ComponentOption.GEODESIC,
      gesturehandling: Const.ComponentOption.GESTURE_HANDLING,
      heading: Const.ComponentOption.HEADING,
      icon: Const.ComponentOption.ICON,
      icons: Const.ComponentOption.ICONS,
      keyboardshortcuts: Const.ComponentOption.KEYBOARD_SHORTCUTS,
      label: Const.ComponentOption.LABEL,
      map: Const.ComponentOption.MAP,
      maptypecontrol: Const.ComponentOption.MAP_TYPE_CONTROL,
      maptypecontroloptions: Const.ComponentOption.MAP_TYPE_CONTROL_OPTIONS,
      maptypeid: Const.ComponentOption.MAP_TYPE_ID,
      maxwidth: Const.ComponentOption.MAX_WIDTH,
      maxzoom: Const.ComponentOption.MAX_ZOOM,
      noclear: Const.ComponentOption.NO_CLEAR,
      opacity: Const.ComponentOption.OPACITY,
      optimized: Const.ComponentOption.OPTIMIZED,
      pancontrol: Const.ComponentOption.PAN_CONTROL,
      pancontroloptions: Const.ComponentOption.PAN_CONTROL_OPTIONS,
      path: Const.ComponentOption.PATH,
      paths: Const.ComponentOption.PATHS,
      pixeloffset: Const.ComponentOption.PIXEL_OFFSET,
      place: Const.ComponentOption.PLACE,
      position: Const.ComponentOption.POSITION,
      radius: Const.ComponentOption.RADIUS,
      rotatecontrol: Const.ComponentOption.ROTATE_CONTROL,
      rotatecontroloptions: Const.ComponentOption.ROTATE_CONTROL_OPTIONS,
      scalecontrol: Const.ComponentOption.SCALE_CONTROL,
      scalecontroloptions: Const.ComponentOption.SCALE_CONTROL_OPTIONS,
      scrollwheel: Const.ComponentOption.SCROLL_WHEEL,
      shape: Const.ComponentOption.SHAPE,
      streetview: Const.ComponentOption.STREET_VIEW,
      streetviewcontrol: Const.ComponentOption.STREET_VIEW_CONTROL,
      streetviewcontroloptions: Const.ComponentOption.STREET_VIEW_CONTROL_OPTIONS,
      strokecolor: Const.ComponentOption.STROKE_COLOR,
      strokeopacity: Const.ComponentOption.STROKE_OPACITY,
      strokeposition: Const.ComponentOption.STROKE_POSITION,
      strokeweight: Const.ComponentOption.STROKE_WEIGHT,
      styles: Const.ComponentOption.STYLES,
      tilt: Const.ComponentOption.TILT,
      title: Const.ComponentOption.TITLE,
      visible: Const.ComponentOption.VISIBLE,
      zoom: Const.ComponentOption.ZOOM,
      zoomcontrol: Const.ComponentOption.ZOOM_CONTROL,
      zoomcontroloptions: Const.ComponentOption.ZOOM_CONTROL_OPTIONS,
      zindex: Const.ComponentOption.Z_INDEX
    };
    var ComponentTypeAlias = {
      label: Const.ComponentType.LABEL,
      labels: Const.ComponentType.LABEL,
      map: Const.ComponentType.MAP,
      maps: Const.ComponentType.MAP,
      marker: Const.ComponentType.MARKER,
      markers: Const.ComponentType.MARKER,
      polygon: Const.ComponentType.POLYGON,
      polygons: Const.ComponentType.POLYGON
    };
    var EventTypeAlias = {
      animationchanged: Const.EventType.ANIMATION_CHANGED,
      boundschanged: Const.EventType.BOUNDS_CHANGED,
      centerchanged: Const.EventType.CENTER_CHANGED,
      click: Const.EventType.CLICK,
      clickablechanged: Const.EventType.CLICKABLE_CHANGED,
      cursorchanged: Const.EventType.CURSOR_CHANGED,
      doubleclick: Const.EventType.DOUBLE_CLICK,
      drag: Const.EventType.DRAG,
      dragend: Const.EventType.DRAG_END,
      dragstart: Const.EventType.DRAG_START,
      draggablechanged: Const.EventType.DRAGGABLE_CHANGED,
      flatchanged: Const.EventType.FLAT_CHANGED,
      headingchanged: Const.EventType.HEADING_CHANGED,
      iconchanged: Const.EventType.ICON_CHANGED,
      idle: Const.EventType.IDLE,
      maptypeidchanged: Const.EventType.MAP_TYPE_ID_CHANGED,
      mousedown: Const.EventType.MOUSE_DOWN,
      mousemove: Const.EventType.MOUSE_MOVE,
      mouseout: Const.EventType.MOUSE_OUT,
      mouseover: Const.EventType.MOUSE_OVER,
      mouseup: Const.EventType.MOUSE_UP,
      positionchanged: Const.EventType.POSITION_CHANGED,
      projectionchanged: Const.EventType.PROJECTION_CHANGED,
      resize: Const.EventType.RESIZE,
      rightclick: Const.EventType.RIGHT_CLICK,
      shapechanged: Const.EventType.SHAPE_CHANGED,
      tilesloaded: Const.EventType.TILES_LOADED,
      tiltchanged: Const.EventType.TILT_CHANGED,
      titlechanged: Const.EventType.TITLE_CHANGED,
      visiblechanged: Const.EventType.VISIBLE_CHANGED,
      zindexchanged: Const.EventType.ZINDEX_CHANGED,
      zoomchanged: Const.EventType.ZOOM_CHANGED
    };
    Util.getSetting = function(option) {
      option = Util.toLowerCase(option);
      return SettingsAlias[option] || option;
    };
    Util.getComponentOption = function(option) {
      option = Util.toLowerCase(option);
      return ComponentOptionAlias[option] || option;
    };
    Util.getComponentType = function(type) {
      type = Util.toLowerCase(type);
      return ComponentTypeAlias[type] || type;
    };
    Util.getEventType = function(event) {
      event = Util.toLowerCase(event);
      return EventTypeAlias[event] || event;
    };
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
  var Util = function(Util, GlobalSettings) {
    "use strict";
    var LocalSettings = [ Const.Settings.LABEL_OPTIONS, Const.Settings.MAP_ID, Const.Settings.MAP_OPTIONS, Const.Settings.MARKER_OPTIONS, Const.Settings.POLYGON_OPTIONS ];
    Util.renameSettings = function(userSettings) {
      Object.keys(userSettings).forEach(function(key) {
        Util.renameProperty({
          newName: Util.getSetting(key),
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
  }(Util || (Util = {}), gmap.settings);
  var Core = function(Core) {
    "use strict";
    var RequiredParms = {
      Label: [ "position", "text" ],
      Marker: [ "position" ],
      Polygon: [ [ "path", "paths" ] ]
    };
    Core.addComponent = function(parms) {
      var compOptions = parms.compOptions;
      var map = parms.map;
      var type = Util.getComponentType(parms.type);
      if (Util.validMapComponent(type)) {
        if ($.type(compOptions) === "array") {
          return _multiAdd(map, type, compOptions);
        }
        if ($.type(compOptions) === "object") {
          if (_validateParms(map, type, compOptions)) {
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
        if (_validateParms(map, type, compOptions)) {
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
      var namespace = Util.getSetting(type + "Options");
      var defaults = map.settings[namespace] || {};
      var options = $.extend({}, defaults, compOptions);
      options.map = map.obj;
      delete options.id;
      return options;
    }
    function _requiredParmsAreEmpty(reqParms, parms) {
      return reqParms.map(function(key) {
        return parms[key] !== "" && parms[key] !== null && parms[key] !== undefined && parms[key] !== false;
      }).indexOf(true) === -1;
    }
    function _validateParms(map, type, parms) {
      if (map.components[type].includes(parms.id) === true) {
        return Util.throwError({
          method: "add",
          message: "A " + type + " with an id of " + parms.id + " already exists",
          obj: parms
        });
      }
      for (var i = 0, i_end = RequiredParms[type].length; i < i_end; i++) {
        var reqParm = Util.toArray(RequiredParms[type][i]);
        if (_requiredParmsAreEmpty(reqParm, parms)) {
          return Util.throwError({
            method: "add",
            message: reqParm.join(" or ") + " must have a value",
            obj: parms
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
        var type = Util.getComponentType(types[i]);
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
      return ids === null || ids === "all" ? Util.getIds({
        compArray: compArray
      }) : ids;
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
    Core.addListener = function(parms) {
      var compArray = parms.compArray;
      var func = parms.func;
      var ids = parms.ids;
      var type = Util.getEventType(parms.type);
      return _listener(compArray, ids, type, func, Action.ADD);
    };
    Core.removeListener = function(parms) {
      var compArray = parms.compArray;
      var ids = parms.ids;
      var type = Util.getEventType(parms.type);
      var action = type !== "all" ? Action.REMOVE_TYPE : Action.REMOVE_ALL;
      return _listener(compArray, ids, type, null, action);
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
    function _add(comp, type, func) {
      google.maps.event.addListener(comp.obj, type, func);
      return comp;
    }
    function _removeAll(comp) {
      google.maps.event.clearInstanceListeners(comp.obj);
      return comp;
    }
    function _removeType(comp, type) {
      google.maps.event.clearListeners(comp.obj, type);
      return comp;
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
        var optionName = Util.getComponentOption(compOptions);
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
      compOptions = Util.getComponentOption(compOptions);
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
      var type = Util.getComponentType(parms.type);
      return _pop(map.components[type], count, Action.POP);
    };
    Core.remove = function(parms) {
      var ids = parms.ids;
      var map = parms.map;
      var type = Util.getComponentType(parms.type);
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
      var type = Util.getComponentType(parms.type);
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
      fitBounds: function fitBounds(comps) {
        return Core.fitBounds({
          map: this,
          comps: comps
        });
      },
      getBounds: function getBounds() {
        return this.obj.getBounds();
      },
      getCenter: function getCenter() {
        return this.obj.getCenter();
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
      BaseComponentArray.prototype.getChildType = function getChildType() {
        return this.type.replace("Array", "");
      };
      BaseComponentArray.prototype.getGoogleObjects = function getGoogleObjects() {
        return Util.getGoogleObjects({
          compArray: this
        });
      };
      BaseComponentArray.prototype.getIds = function getIds() {
        return Util.getIds({
          compArray: this
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
    var Label = function(_Components$BaseCompo) {
      _inherits(Label, _Components$BaseCompo);
      function Label(parms) {
        _classCallCheck(this, Label);
        return _possibleConstructorReturn(this, _Components$BaseCompo.call(this, {
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
    var LabelArray = function(_Components$BaseCompo2) {
      _inherits(LabelArray, _Components$BaseCompo2);
      function LabelArray(parms) {
        _classCallCheck(this, LabelArray);
        return _possibleConstructorReturn(this, _Components$BaseCompo2.call(this, {
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
    var Marker = function(_Components$BaseCompo3) {
      _inherits(Marker, _Components$BaseCompo3);
      function Marker(parms) {
        _classCallCheck(this, Marker);
        return _possibleConstructorReturn(this, _Components$BaseCompo3.call(this, {
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
    var MarkerArray = function(_Components$BaseCompo4) {
      _inherits(MarkerArray, _Components$BaseCompo4);
      function MarkerArray(parms) {
        _classCallCheck(this, MarkerArray);
        return _possibleConstructorReturn(this, _Components$BaseCompo4.call(this, {
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
      return MarkerArray;
    }(Components.BaseComponentArray);
    Components.MarkerArray = MarkerArray;
    return Components;
  }(Components || (Components = {}), Const.ComponentType);
  var Components = function(Components, ComponentType) {
    "use strict";
    var Polygon = function(_Components$BaseCompo5) {
      _inherits(Polygon, _Components$BaseCompo5);
      function Polygon(parms) {
        _classCallCheck(this, Polygon);
        return _possibleConstructorReturn(this, _Components$BaseCompo5.call(this, {
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
    var PolygonArray = function(_Components$BaseCompo6) {
      _inherits(PolygonArray, _Components$BaseCompo6);
      function PolygonArray(parms) {
        _classCallCheck(this, PolygonArray);
        return _possibleConstructorReturn(this, _Components$BaseCompo6.call(this, {
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
      return PolygonArray;
    }(Components.BaseComponentArray);
    Components.PolygonArray = PolygonArray;
    return Components;
  }(Components || (Components = {}), Const.ComponentType);
  gmap.version = "5.0.1-alpha";
}();