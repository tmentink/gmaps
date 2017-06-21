/*!
 * GMaps v2.1.0-alpha (https://github.com/tmentink/gmaps)
 * Copyright 2017 Trent Mentink
 * Licensed under MIT
 */

if (typeof google === "undefined" || typeof google.maps === "undefined") {
  throw new Error("gmaps.js requires Google Maps JavaScript API v3.");
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
    var gmap = function gmap(config) {
      var _this = this;
      if ($.isPlainObject(config)) {
        Util.renameConfigOptions(config);
      }
      config = Util.mergeWithGlobalConfig(config);
      config.MapOptions = Util.convertCompOptions({
        compType: Const.ComponentType.MAP,
        compOptions: config.MapOptions
      });
      var mapContainer = document.getElementById(config.MapId);
      if (!mapContainer) {
        return Util.throwError({
          method: "new gmap",
          message: "Could not find an element with an Id of " + config.MapId,
          obj: config
        });
      }
      this.Components = {
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
      this.Config = config;
      this.Init = {
        Bounds: undefined,
        Options: config.MapOptions
      };
      this.Obj = new google.maps.Map(mapContainer, config.MapOptions);
      this.Obj["gmaps"] = {
        id: config.MapId,
        map: this,
        parent: this,
        version: gmap.version
      };
      this.Type = Const.ComponentType.MAP;
      this.Version = gmap.version;
      google.maps.event.addListenerOnce(this.Obj, Const.EventType.TILES_LOADED, function() {
        _this.Init.Bounds = _this.Obj.getBounds();
      });
    };
    window.gmap = gmap;
  }();
  !function(Config) {
    "use strict";
    Config.Delimiter = {
      LatLng: "|",
      LatLngArray: "~"
    };
    Config.DelimitedStrings = true;
    Config.LabelOptions = {
      align: "center",
      fontColor: "#000",
      fontSize: 14,
      strokeColor: "#FFF",
      strokeWeight: 1,
      visible: true
    };
    Config.MapId = "gmap";
    Config.MapOptions = {
      center: {
        lat: 37.5,
        lng: -120
      },
      clickableIcons: false,
      draggable: true,
      gestureHandling: "auto",
      mapTypeControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControl: false,
      zoom: 6
    };
    Config.MarkerOptions = {
      clickable: true,
      draggable: false,
      opacity: 1,
      visible: true
    };
    Config.PolygonOptions = {
      clickable: true,
      editable: false,
      draggable: false,
      fillColor: "#2185D0",
      fillOpacity: .8,
      geodesic: false,
      strokeColor: "#000",
      strokeOpacity: .8,
      strokeWeight: 1,
      visible: true
    };
    Config.UrlPrecision = 5;
    return Config;
  }(gmap.Config || (gmap.Config = {}));
  var Const = function(Const) {
    "use strict";
    Const.Config = {
      DELIMITER: "Delimiter",
      LABEL_OPTIONS: "LabelOptions",
      MAP_ID: "MapId",
      MAP_OPTIONS: "MapOptions",
      MARKER_OPTIONS: "MarkerOptions",
      POLYGON_OPTIONS: "PolygonOptions",
      URL_PRECISION: "UrlPrecision"
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
    return Const;
  }(Const || (Const = {}));
  var Util = function(Util) {
    "use strict";
    var Conversions = {
      center: function center(parms) {
        parms.center = Util.toLatLng(parms.center);
      },
      path: function path(parms) {
        if (parms.paths || parms.path) {
          parms.paths = Util.toLatLngArray(parms.paths || parms.path);
          delete parms.path;
        }
      },
      position: function position(parms) {
        parms.position = Util.toLatLng(parms.position);
      },
      text: function text(parms) {
        parms.text = parms.text || parms.id;
      }
    };
    var ConvertableOptions = {
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
        path: Conversions.path,
        paths: Conversions.path
      }
    };
    Util.convertCompOptions = function(parms) {
      var compOptions = parms.compOptions;
      var compType = parms.compType.replace("Array", "");
      Object.keys(ConvertableOptions[compType]).forEach(function(key) {
        ConvertableOptions[compType][key](compOptions);
      });
      return compOptions;
    };
    Util.copy = function(parms) {
      var compArray = parms.compArray;
      var new_comp = new Components[compArray.Type]({
        map: compArray.Map
      });
      var proto = _getPrototypes(compArray);
      var copy = $.extend(true, new_comp, compArray);
      for (var i = 0, i_end = proto.length; i < i_end; i++) {
        delete copy[proto[i]];
      }
      return copy;
    };
    Util.getGoogleObjects = function(parms) {
      return parms.compArray.Data.map(function(comp) {
        return comp.Obj;
      });
    };
    Util.getIds = function(parms) {
      return parms.compArray.Data.map(function(comp) {
        return comp.Id;
      });
    };
    function _getPrototypes(compArray) {
      var proto = Object.keys(Object.getPrototypeOf(compArray));
      var base_proto = Object.keys(Object.getPrototypeOf(new Components.BaseComponentArray({})));
      return proto.concat(base_proto);
    }
    return Util;
  }(Util || (Util = {}));
  var Util = function(Util, GlobalConfig) {
    "use strict";
    var LocalConfig = [ Const.Config.LABEL_OPTIONS, Const.Config.MAP_ID, Const.Config.MAP_OPTIONS, Const.Config.MARKER_OPTIONS, Const.Config.POLYGON_OPTIONS ];
    Util.renameConfigOptions = function(userConfig) {
      Object.keys(userConfig).forEach(function(key) {
        Util.renameProperty({
          newName: Util.getConfigOption(key),
          obj: userConfig,
          oldName: key
        });
      });
      return userConfig;
    };
    Util.mergeWithGlobalConfig = function(userConfig) {
      userConfig = $.extend(true, {}, GlobalConfig, userConfig);
      Object.keys(userConfig).forEach(function(key) {
        if (LocalConfig.indexOf(key) === -1) {
          delete userConfig[key];
        }
      });
      return userConfig;
    };
    return Util;
  }(Util || (Util = {}), gmap.Config);
  var Util = function(Util, Config) {
    "use strict";
    Util.toArray = function(val) {
      if ($.isArray(val) === false) {
        return [ val ];
      }
      return val;
    };
    Util.toLatLng = function(val) {
      if ($.type(val) === "string") {
        return Config.DelimitedStrings ? _strToLatLng(val) : JSON.parse(val);
      }
      return val;
    };
    Util.toLatLngArray = function(val) {
      if ($.type(val) === "string") {
        return Config.DelimitedStrings ? _strToLatLngArray(val) : JSON.parse(val);
      }
      return val;
    };
    Util.toString = function(val) {
      if (val instanceof google.maps.LatLng) {
        return Config.DelimitedStrings ? val.toUrlValue(Config.UrlPrecision) : JSON.stringify(val);
      }
      if (val instanceof google.maps.MVCArray) {
        if (val.getAt(0) instanceof google.maps.MVCArray) {
          return Config.DelimitedStrings ? _toMultiDelimitedString(val) : _toMultiJSONString(val);
        } else {
          return Config.DelimitedStrings ? _toDelimitedString(val) : JSON.stringify(val.getArray());
        }
      }
      return null;
    };
    Util.toLowerCase = function(val) {
      var regex = /\s+|\_+/g;
      return val.toLowerCase().replace(regex, "");
    };
    function _strToLatLng(str) {
      var points = str.split(",");
      return new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]));
    }
    function _strToLatLngArray(str) {
      var latLngArray = [];
      var coordPairs = str.split(Config.Delimiter.LatLng || "|");
      for (var i = 0, i_end = coordPairs.length; i < i_end; i++) {
        latLngArray.push(Util.toLatLng(coordPairs[i]));
      }
      return latLngArray;
    }
    function _toDelimitedString(MVCArray) {
      var str = "";
      MVCArray.forEach(function(el, i) {
        if (i > 0) {
          str += Config.Delimiter.LatLng || "|";
        }
        str += el.toUrlValue(Config.UrlPrecision || 6);
      });
      return str;
    }
    function _toMultiDelimitedString(MVCArray) {
      var str = "";
      MVCArray.forEach(function(el, i) {
        if (i > 0) {
          str += Config.Delimiter.LatLngArray || "~";
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
      return JSON.stringify(arr);
    }
    return Util;
  }(Util || (Util = {}), gmap.Config);
  var Util = function(Util) {
    "use strict";
    var ConfigAlias = {
      delimiter: Const.Config.DELIMITER,
      labeloptions: Const.Config.LABEL_OPTIONS,
      mapid: Const.Config.MAP_ID,
      mapoptions: Const.Config.MAP_OPTIONS,
      markeroptions: Const.Config.MARKER_OPTIONS,
      polygonoptions: Const.Config.POLYGON_OPTIONS,
      urlprecision: Const.Config.URL_PRECISION
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
    Util.getConfigOption = function(option) {
      option = Util.toLowerCase(option);
      return ConfigAlias[option] || option;
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
  var Core = function(Core) {
    "use strict";
    var RequiredParms = {
      Label: [ "id", "position" ],
      Marker: [ "id", "position" ],
      Polygon: [ "id", [ "path", "paths" ] ]
    };
    Core.addComponent = function(parms) {
      var compOptions = parms.compOptions;
      var map = parms.map;
      var type = Util.getComponentType(parms.type);
      if ($.type(compOptions) === "array") {
        return _multiAdd(map, type, compOptions);
      }
      if ($.type(compOptions) === "object") {
        if (_validateParms(map, type, compOptions)) {
          var newCompArray = _createNewCompArray(type, map);
          newCompArray.push(_add(map, type, compOptions));
          return newCompArray;
        }
      }
    };
    function _add(map, type, compOptions) {
      compOptions = Util.convertCompOptions({
        compType: type,
        compOptions: compOptions
      });
      var comp = new Components[type]({
        id: compOptions.id,
        options: _mergeDefaults(map, type, compOptions)
      });
      map.Components[type].push(comp);
      return comp;
    }
    function _multiAdd(map, type, compOptionsArray) {
      var newCompArray = _createNewCompArray(type, map);
      for (var i = 0, i_end = compOptionsArray.length; i < i_end; i++) {
        var compOptions = compOptionsArray[i];
        if (_validateParms(map, type, compOptions)) {
          newCompArray.push(_add(map, type, compOptions));
        }
      }
      return newCompArray;
    }
    function _createNewCompArray(type, map) {
      return new Components[type + "Array"]({
        map: map
      });
    }
    function _mergeDefaults(map, type, parms) {
      var defaults = map.Config[type + "Options"] || {};
      var options = $.extend({}, defaults, parms);
      options.map = map.Obj;
      delete options.id;
      return options;
    }
    function _noParmsFound(reqParms, parms) {
      return reqParms.map(function(key) {
        return parms[key] !== undefined && parms[key] !== "";
      }).indexOf(true) === -1;
    }
    function _validateParms(map, type, parms) {
      for (var i = 0, i_end = RequiredParms[type].length; i < i_end; i++) {
        var reqParm = Util.toArray(RequiredParms[type][i]);
        if (_noParmsFound(reqParm, parms)) {
          return Util.throwError({
            method: "add" + type,
            message: reqParm.join(" or ") + " must have a value",
            obj: parms
          });
        }
      }
      if (map.Components[type].includes(parms.id)) {
        return Util.throwError({
          method: "add" + type,
          message: "A " + type + " with an id of " + parms.id + " already exists",
          obj: parms
        });
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
      if ($.type(comps) === "object") {
        var bounds = _getBoundsByComponents(map.Components, comps);
        map.Obj.fitBounds(bounds);
      } else if (comps === "init" || comps === "initial") {
        map.Obj.fitBounds(map.Init.Bounds);
        map.Obj.setZoom(map.Init.Options.zoom);
      }
      return map;
    };
    Core.getBounds = function(parms) {
      var bounds = new google.maps.LatLngBounds();
      var compArray = parms.compArray;
      var ids = Util.toArray(parms.ids);
      for (var i = 0, i_end = ids.length; i < i_end; i++) {
        var comp = compArray.find(ids[i]);
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
        var comp = compArray.find(id);
        if (comp) {
          var coords = CoordinateFunctions[comp.Type](comp.Obj);
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
        return !comp.Obj.getVisible();
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
      var comp = compArray.find(ids);
      if (comp) {
        return _setVisibility(comp, action);
      }
    }
    function _multiDisplay(compArray, ids, action) {
      var newCompArray = new Components[compArray.Type]({
        map: compArray.Map
      });
      for (var i = 0, i_end = ids.length; i < i_end; i++) {
        var comp = compArray.find(ids[i]);
        if (comp) {
          newCompArray.push(_setVisibility(comp, action));
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
      if (compArray.Type === ComponentType.MAP) {
        return Execute[action](compArray, type, func);
      }
      if ($.isArray(ids)) {
        return _multiListener(compArray, ids, type, func, action);
      }
      var comp = compArray.find(ids);
      if (comp) {
        return Execute[action](comp, type, func);
      }
    }
    function _multiListener(compArray, ids, type, func, action) {
      var newCompArray = new Components[compArray.Type]({
        map: compArray.Map
      });
      for (var i = 0, i_end = ids.length; i < i_end; i++) {
        var comp = compArray.find(ids[i]);
        if (comp) {
          newCompArray.push(Execute[action](comp, type, func));
        }
      }
      return newCompArray;
    }
    function _add(comp, type, func) {
      google.maps.event.addListener(comp.Obj, type, func);
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
  }(Core || (Core = {}), Const.ComponentType);
  var Core = function(Core) {
    "use strict";
    Core.remove = function(parms) {
      var compArray = parms.compArray;
      var ids = parms.ids;
      if ($.isArray(ids)) {
        return _multiRemove(compArray, ids);
      }
      var comp = compArray.find(ids);
      if (comp) {
        return _remove(comp);
      }
    };
    function _remove(comp) {
      var compArray = comp.Map.Components[comp.Type];
      var index = compArray.Data.indexOf(comp);
      comp.Obj.setMap(null);
      return compArray.Data.splice(index, 1);
    }
    function _multiRemove(compArray, ids) {
      var newCompArray = new Components[compArray.Type]({
        map: compArray.Map
      });
      for (var i = 0, i_end = ids.length; i < i_end; i++) {
        var comp = compArray.find(ids[i]);
        if (comp) {
          newCompArray.push(_remove(comp));
        }
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
      if (compArray.Type === ComponentType.MAP) {
        compArray.Obj.fitBounds(compArray.Init.Bounds);
        return _reset(compArray);
      }
      if ($.isArray(ids)) {
        return _multiReset(compArray, ids);
      }
      var comp = compArray.find(ids);
      if (comp) {
        return _reset(comp);
      }
    };
    function _reset(comp) {
      comp.Obj.setOptions(comp.Init.Options);
      return comp;
    }
    function _multiReset(compArray, ids) {
      var newCompArray = new Components[compArray.Type]({
        map: compArray.Map
      });
      for (var i = 0, i_end = ids.length; i < i_end; i++) {
        var comp = compArray.find(ids[i]);
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
      var compArray = map.Components[type];
      if (ids) {
        var newCompArray = new Components[compArray.Type]({
          map: map
        });
        newCompArray.Data = _getDataByIds(compArray, Util.toArray(ids), matching);
        return newCompArray;
      }
      return compArray;
    };
    function _getDataByIds(compArray, ids, matching) {
      return compArray.Data.filter(function(comp) {
        return matching === true ? ids.indexOf(comp.Id) !== -1 : ids.indexOf(comp.Id) === -1;
      });
    }
    return Core;
  }(Core || (Core = {}));
  var Core = function(Core, ComponentType) {
    "use strict";
    Core.update = function(parms) {
      var compArray = parms.compArray;
      var compOptions = parms.compOptions;
      var ids = parms.ids;
      var type = compArray.ChildType || compArray.Type;
      if (compOptions === undefined) {
        return Util.throwError({
          method: "update",
          message: "Must supply " + type + " options"
        });
      }
      compOptions = Util.convertCompOptions({
        compType: type,
        compOptions: compOptions
      });
      if (type === ComponentType.MAP) {
        return _update(compArray, compOptions);
      }
      if ($.isArray(ids)) {
        return _multiUpdate(compArray, ids, compOptions);
      }
      var comp = compArray.find(ids);
      if (comp) {
        return _update(comp, compOptions);
      }
    };
    function _update(comp, options) {
      comp.Obj.setOptions(options);
      return comp;
    }
    function _multiUpdate(compArray, ids, options) {
      var newCompArray = new Components[compArray.Type]({
        map: compArray.Map
      });
      for (var i = 0, i_end = ids.length; i < i_end; i++) {
        var comp = compArray.find(ids[i]);
        if (comp) {
          newCompArray.push(_update(comp, options));
        }
      }
      return newCompArray;
    }
    return Core;
  }(Core || (Core = {}), Const.ComponentType);
  !function(ComponentType) {
    "use strict";
    gmap.prototype = {
      addLabel: function addLabel(compOptions) {
        return Core.addComponent({
          compOptions: compOptions,
          map: this,
          type: ComponentType.LABEL
        });
      },
      addMarker: function addMarker(compOptions) {
        return Core.addComponent({
          compOptions: compOptions,
          map: this,
          type: ComponentType.MARKER
        });
      },
      addPolygon: function addPolygon(compOptions) {
        return Core.addComponent({
          compOptions: compOptions,
          map: this,
          type: ComponentType.POLYGON
        });
      },
      fitBounds: function fitBounds(comps) {
        return Core.fitBounds({
          map: this,
          comps: comps
        });
      },
      getBounds: function getBounds() {
        return this.Obj.getBounds();
      },
      getCenter: function getCenter() {
        return this.Obj.getCenter();
      },
      getZoom: function getZoom() {
        return this.Obj.getZoom();
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
      on: function on(type, func) {
        return Core.addListener({
          compArray: this,
          func: func,
          type: type
        });
      },
      off: function off(type) {
        return Core.removeListener({
          compArray: this,
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
      reset: function reset() {
        return Core.reset({
          compArray: this
        });
      },
      setCenter: function setCenter(center) {
        if (center !== undefined) {
          this.Obj.setCenter(Util.toLatLng(center));
        }
        return this;
      },
      setZoom: function setZoom(zoom) {
        if (zoom !== undefined) {
          this.Obj.setZoom(zoom);
        }
        return this;
      },
      update: function update(compOptions) {
        return Core.update({
          compArray: this,
          compOptions: compOptions
        });
      }
    };
    return gmap;
  }(Const.ComponentType);
  !function(gmap) {
    "use strict";
    var Shape = {
      DECAGON: "Decagon",
      HEXAGON: "Hexagon",
      PENTAGON: "Pentagon",
      RECTANGLE: "Rectangle",
      SQUARE: "Square",
      TRIANGLE: "Triangle"
    };
    var ShapeDegrees = {
      Decagon: [ 36, 72, 108, 144, 180, 216, 252, 288, 324, 360 ],
      Hexagon: [ 30, 90, 150, 210, 270, 330 ],
      Pentagon: [ 72, 144, 216, 288, 360 ],
      Rectangle: [ 60, 120, 240, 300 ],
      Square: [ 45, 135, 225, 315 ],
      Triangle: [ 120, 240, 360 ]
    };
    gmap.prototype.decagonShape = function(parms) {
      return _getShapePath(this, parms, Shape.DECAGON);
    };
    gmap.prototype.hexagonShape = function(parms) {
      return _getShapePath(this, parms, Shape.HEXAGON);
    };
    gmap.prototype.pentagonShape = function(parms) {
      return _getShapePath(this, parms, Shape.PENTAGON);
    };
    gmap.prototype.rectangleShape = function(parms) {
      return _getShapePath(this, parms, Shape.RECTANGLE);
    };
    gmap.prototype.squareShape = function(parms) {
      return _getShapePath(this, parms, Shape.SQUARE);
    };
    gmap.prototype.triangleShape = function(parms) {
      return _getShapePath(this, parms, Shape.TRIANGLE);
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
      this.Id = id;
      this.Init = {
        Options: options
      };
      this.Map = map;
      this.Obj = obj;
      this.Obj["gmaps"] = {
        id: id,
        map: map,
        parent: this,
        version: gmap.version
      };
      this.Type = type;
    };
    Components.BaseComponent = BaseComponent;
    return Components;
  }(Components || (Components = {}));
  var Components = function(Components) {
    "use strict";
    var BaseComponentArray = function() {
      function BaseComponentArray(parms) {
        _classCallCheck(this, BaseComponentArray);
        this.Data = [];
        this.Map = parms.map;
        this.Type = parms.type;
      }
      BaseComponentArray.prototype.copy = function copy() {
        return Util.copy({
          compArray: this
        });
      };
      BaseComponentArray.prototype.find = function find(id) {
        return this.Data.find(function(comp) {
          return comp.Id === id;
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
        return this.Type.replace("Array", "");
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
      BaseComponentArray.prototype.hide = function hide() {
        return Core.hide({
          compArray: this,
          ids: this.getIds()
        });
      };
      BaseComponentArray.prototype.includes = function includes(id) {
        return this.find(id) !== undefined;
      };
      BaseComponentArray.prototype.push = function push(comp) {
        return this.Data.push(comp);
      };
      BaseComponentArray.prototype.others = function others() {
        return Core.search({
          ids: this.getIds(),
          map: this.Map,
          matching: false,
          type: this.getChildType()
        });
      };
      BaseComponentArray.prototype.remove = function remove() {
        return Core.remove({
          compArray: this,
          ids: this.getIds()
        });
      };
      BaseComponentArray.prototype.reset = function reset() {
        return Core.reset({
          compArray: this,
          ids: this.getIds()
        });
      };
      BaseComponentArray.prototype.show = function show() {
        return Core.show({
          compArray: this,
          ids: this.getIds()
        });
      };
      BaseComponentArray.prototype.toggle = function toggle() {
        return Core.toggle({
          compArray: this,
          ids: this.getIds()
        });
      };
      BaseComponentArray.prototype.update = function update(compOptions) {
        return Core.update({
          compArray: this,
          compOptions: compOptions,
          ids: this.getIds()
        });
      };
      BaseComponentArray.prototype.zoom = function zoom() {
        var comps = {};
        comps[this.getChildType()] = this.getIds();
        Core.fitBounds({
          map: this.Map,
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
      MarkerArray.prototype.on = function on(type, func) {
        return Core.addListener({
          compArray: this,
          func: func,
          ids: this.getIds(),
          type: type
        });
      };
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
      PolygonArray.prototype.on = function on(type, func) {
        return Core.addListener({
          compArray: this,
          func: func,
          ids: this.getIds(),
          type: type
        });
      };
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
      return PolygonArray;
    }(Components.BaseComponentArray);
    Components.PolygonArray = PolygonArray;
    return Components;
  }(Components || (Components = {}), Const.ComponentType);
  gmap.version = "2.1.0-alpha";
}();