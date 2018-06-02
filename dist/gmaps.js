/*!
 * gmaps v1.0.0-alpha.9 (https://github.com/tmentink/gmaps)
 * Copyright 2018 Trent Mentink
 * Licensed under MIT
 */

if (typeof google === "undefined" || typeof google.maps === "undefined") {
  throw new Error("gmaps requires Google Maps JavaScript API v3.");
}

!function() {
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
  !function() {
    "use strict";
    var gmap = function gmap(settings) {
      var _this = this;
      if (Is.Object(settings)) {
        settings = Get.renamedSettings({
          settings: settings
        });
      }
      settings = Get.mergedSettings({
        convert: true,
        settings: settings
      });
      var mapId = settings[Const.Settings.MAP_ID];
      var mapContainer = document.getElementById(mapId);
      var mapOptions = settings[Const.Settings.MAP_OPTIONS];
      if (!mapContainer) {
        return Error.throw({
          method: "new gmap",
          msg: "Could not find an element with an Id of " + mapId,
          args: settings
        });
      }
      this.init = {
        bounds: undefined,
        options: mapOptions
      };
      this.obj = new google.maps[Const.GoogleClasses.MAP](mapContainer, mapOptions);
      this.obj["gmaps"] = {
        id: mapId,
        map: this,
        parent: this,
        version: gmap.version
      };
      this.overlays = {
        Circle: new Overlays.CircleArray({
          map: this
        }),
        Label: new Overlays.LabelArray({
          map: this
        }),
        Marker: new Overlays.MarkerArray({
          map: this
        }),
        Polygon: new Overlays.PolygonArray({
          map: this
        }),
        Polyline: new Overlays.PolylineArray({
          map: this
        }),
        Rectangle: new Overlays.RectangleArray({
          map: this
        })
      };
      this.settings = settings;
      this.type = "Map";
      this.version = gmap.version;
      google.maps.event.addListenerOnce(this.obj, Const.EventTypes.TILES_LOADED, function() {
        _this.controls = _this.obj.controls;
        _this.data = _this.obj.data;
        _this.init.bounds = _this.obj.getBounds();
        var onLoad = settings[Const.Settings.ON_LOAD];
        if (Is.Function(onLoad)) onLoad(_this);
      });
    };
    window.gmap = gmap;
  }();
  var Const = function(Const) {
    "use strict";
    Const.EventTypes = {
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
  var Const = function(Const) {
    "use strict";
    Const.GoogleClasses = {
      CIRCLE: "Circle",
      INFO_WINDOW: "InfoWindow",
      LAT_LNG: "LatLng",
      LAT_LNG_BOUNDS: "LatLngBounds",
      MAP: "Map",
      MARKER: "Marker",
      MVC_ARRAY: "MVCArray",
      POLYLINE: "Polyline",
      POLYGON: "Polygon",
      RECTANGLE: "Rectangle"
    };
    return Const;
  }(Const || (Const = {}));
  var Const = function(Const) {
    "use strict";
    var Options = {
      BACKGROUND_COLOR: "backgroundColor",
      CENTER: "center",
      CLICKABLE_ICONS: "clickableIcons",
      DISABLE_DEFAULT_UI: "disableDefaultUI",
      DISABLE_DOUBLE_CLICK_ZOOM: "disableDoubleClickZoom",
      DRAGGABLE: "draggable",
      DRAGGABLE_CURSOR: "draggableCursor",
      DRAGGING_CURSOR: "draggingCursor",
      FULLSCREEN_CONTROL: "fullscreenControl",
      FULLSCREEN_CONTROL_OPTIONS: "fullscreenControlOptions",
      GESTURE_HANDLING: "gestureHandling",
      HEADING: "heading",
      KEYBOARD_SHORTCUTS: "keyboardShortcuts",
      MAP_TYPE_CONTROL: "mapTypeControl",
      MAP_TYPE_CONTROL_OPTIONS: "mapTypeControlOptions",
      MAP_TYPE_ID: "mapTypeId",
      MAX_ZOOM: "maxZoom",
      MIN_ZOOM: "minZoom",
      NO_CLEAR: "noClear",
      PAN_CONTROL: "panControl",
      PAN_CONTROL_OPTIONS: "panControlOptions",
      ROTATE_CONTROL: "rotateControl",
      ROTATE_CONTROL_OPTIONS: "rotateControlOptions",
      SCALE_CONTROL: "scaleControl",
      SCALE_CONTROL_OPTIONS: "scaleControlOptions",
      SCROLL_WHEEL: "scrollWheel",
      STREET_VIEW: "streetView",
      STREET_VIEW_CONTROL: "streetViewControl",
      STREET_VIEW_CONTROL_OPTIONS: "streetViewControlOptions",
      STYLES: "styles",
      TILT: "tilt",
      ZOOM: "zoom",
      ZOOM_CONTROL: "zoomControl",
      ZOOM_CONTROL_OPTIONS: "zoomControlOptions"
    };
    var Map = {
      options: [ {
        name: Options.BACKGROUND_COLOR
      }, {
        name: Options.CENTER,
        convertable: true,
        required: true
      }, {
        name: Options.CLICKABLE_ICONS
      }, {
        name: Options.DISABLE_DEFAULT_UI
      }, {
        name: Options.DISABLE_DOUBLE_CLICK_ZOOM
      }, {
        name: Options.DRAGGABLE
      }, {
        name: Options.DRAGGABLE_CURSOR
      }, {
        name: Options.DRAGGING_CURSOR
      }, {
        name: Options.FULLSCREEN_CONTROL
      }, {
        name: Options.FULLSCREEN_CONTROL_OPTIONS
      }, {
        name: Options.GESTURE_HANDLING
      }, {
        name: Options.HEADING
      }, {
        name: Options.KEYBOARD_SHORTCUTS
      }, {
        name: Options.MAP_TYPE_CONTROL
      }, {
        name: Options.MAP_TYPE_CONTROL_OPTIONS
      }, {
        name: Options.MAP_TYPE_ID
      }, {
        name: Options.MAX_ZOOM
      }, {
        name: Options.MIN_ZOOM
      }, {
        name: Options.NO_CLEAR
      }, {
        name: Options.PAN_CONTROL
      }, {
        name: Options.PAN_CONTROL_OPTIONS
      }, {
        name: Options.ROTATE_CONTROL
      }, {
        name: Options.ROTATE_CONTROL_OPTIONS
      }, {
        name: Options.SCALE_CONTROL
      }, {
        name: Options.SCALE_CONTROL_OPTIONS
      }, {
        name: Options.SCROLL_WHEEL
      }, {
        name: Options.STREET_VIEW
      }, {
        name: Options.STREET_VIEW_CONTROL
      }, {
        name: Options.STREET_VIEW_CONTROL_OPTIONS
      }, {
        name: Options.STYLES
      }, {
        name: Options.TILT
      }, {
        name: Options.ZOOM,
        required: true
      }, {
        name: Options.ZOOM_CONTROL
      }, {
        name: Options.ZOOM_CONTROL_OPTIONS
      } ]
    };
    Const.Map = Map;
    Const.MapOptions = Options;
    return Const;
  }(Const || (Const = {}));
  var Const = function(Const) {
    "use strict";
    var Options = {
      ALIGN: "align",
      ANCHOR_POINT: "anchorPoint",
      ANIMATION: "animation",
      BOUNDS: "bounds",
      CENTER: "center",
      CLICKABLE: "clickable",
      CONTENT: "content",
      CROSS_ON_DRAG: "crossOnDrag",
      CURSOR: "cursor",
      DISABLE_AUTO_PAN: "disableAutoPan",
      DRAGGABLE: "draggable",
      EDITABLE: "editable",
      FILL_COLOR: "fillColor",
      FILL_OPACITY: "fillOpacity",
      FONT_COLOR: "fontColor",
      FONT_FAMILY: "fontFamily",
      FONT_SIZE: "fontSize",
      GEODESIC: "geodesic",
      ICON: "icon",
      ICONS: "icons",
      LABEL: "label",
      MAP: "map",
      MAX_WIDTH: "maxWidth",
      MAX_ZOOM: "maxZoom",
      MIN_ZOOM: "minZoom",
      OPACITY: "opacity",
      OPTIMIZED: "optimized",
      PATH: "path",
      PATHS: "paths",
      PIXEL_OFFSET: "pixelOffset",
      PLACE: "place",
      POSITION: "position",
      RADIUS: "radius",
      SHAPE: "shape",
      STROKE_COLOR: "strokeColor",
      STROKE_OPACITY: "strokeOpacity",
      STROKE_POSITION: "strokePosition",
      STROKE_WEIGHT: "strokeWeight",
      TITLE: "title",
      TEXT: "text",
      VISIBLE: "visible",
      Z_INDEX: "zIndex"
    };
    var Types = {
      CIRCLE: "Circle",
      CIRCLE_ARRAY: "CircleArray",
      LABEL: "Label",
      LABEL_ARRAY: "LabelArray",
      MARKER: "Marker",
      MARKER_ARRAY: "MarkerArray",
      POLYGON: "Polygon",
      POLYGON_ARRAY: "PolygonArray",
      POLYLINE: "Polyline",
      POLYLINE_ARRAY: "PolylineArray",
      RECTANGLE: "Rectangle",
      RECTANGLE_ARRAY: "RectangleArray"
    };
    var Overlays = {};
    Overlays[Types.CIRCLE] = {
      options: [ {
        name: Options.CENTER,
        convertable: true,
        required: true
      }, {
        name: Options.CLICKABLE
      }, {
        name: Options.DRAGGABLE
      }, {
        name: Options.EDITABLE
      }, {
        name: Options.FILL_COLOR
      }, {
        name: Options.FILL_OPACITY
      }, {
        name: Options.MAP
      }, {
        name: Options.RADIUS,
        required: true
      }, {
        name: Options.STROKE_COLOR
      }, {
        name: Options.STROKE_OPACITY
      }, {
        name: Options.STROKE_POSITION
      }, {
        name: Options.STROKE_WEIGHT
      }, {
        name: Options.VISIBLE
      }, {
        name: Options.Z_INDEX
      } ]
    };
    Overlays[Types.LABEL] = {
      options: [ {
        name: Options.ALIGN
      }, {
        name: Options.FONT_COLOR
      }, {
        name: Options.FONT_FAMILY
      }, {
        name: Options.FONT_SIZE
      }, {
        name: Options.MAX_ZOOM
      }, {
        name: Options.MIN_ZOOM
      }, {
        name: Options.POSITION,
        convertable: true,
        required: true
      }, {
        name: Options.STROKE_WEIGHT
      }, {
        name: Options.STROKE_COLOR
      }, {
        name: Options.VISIBLE
      }, {
        name: Options.TEXT,
        required: true
      }, {
        name: Options.Z_INDEX
      } ]
    };
    Overlays[Types.MARKER] = {
      options: [ {
        name: Options.ANCHOR_POINT
      }, {
        name: Options.ANIMATION
      }, {
        name: Options.CLICKABLE
      }, {
        name: Options.CROSS_ON_DRAG
      }, {
        name: Options.CURSOR
      }, {
        name: Options.DRAGGABLE
      }, {
        name: Options.ICON
      }, {
        name: Options.LABEL
      }, {
        name: Options.MAP
      }, {
        name: Options.OPACITY
      }, {
        name: Options.OPTIMIZED
      }, {
        name: Options.PLACE
      }, {
        name: Options.POSITION,
        convertable: true,
        required: true
      }, {
        name: Options.SHAPE
      }, {
        name: Options.TITLE
      }, {
        name: Options.VISIBLE
      }, {
        name: Options.Z_INDEX
      } ]
    };
    Overlays[Types.POLYGON] = {
      options: [ {
        name: Options.CLICKABLE
      }, {
        name: Options.DRAGGABLE
      }, {
        name: Options.EDITABLE
      }, {
        name: Options.FILL_COLOR
      }, {
        name: Options.FILL_OPACITY
      }, {
        name: Options.GEODESIC
      }, {
        name: Options.MAP
      }, {
        name: Options.PATHS,
        convertable: true,
        required: true
      }, {
        name: Options.STROKE_COLOR
      }, {
        name: Options.STROKE_OPACITY
      }, {
        name: Options.STROKE_POSITION
      }, {
        name: Options.STROKE_WEIGHT
      }, {
        name: Options.VISIBLE
      }, {
        name: Options.Z_INDEX
      } ]
    };
    Overlays[Types.POLYLINE] = {
      options: [ {
        name: Options.CLICKABLE
      }, {
        name: Options.DRAGGABLE
      }, {
        name: Options.EDITABLE
      }, {
        name: Options.GEODESIC
      }, {
        name: Options.ICONS
      }, {
        name: Options.MAP
      }, {
        name: Options.PATH,
        convertable: true,
        required: true
      }, {
        name: Options.STROKE_COLOR
      }, {
        name: Options.STROKE_OPACITY
      }, {
        name: Options.STROKE_WEIGHT
      }, {
        name: Options.VISIBLE
      }, {
        name: Options.Z_INDEX
      } ]
    };
    Overlays[Types.RECTANGLE] = {
      options: [ {
        name: Options.BOUNDS,
        convertable: true,
        required: true
      }, {
        name: Options.CLICKABLE
      }, {
        name: Options.DRAGGABLE
      }, {
        name: Options.EDITABLE
      }, {
        name: Options.FILL_COLOR
      }, {
        name: Options.FILL_OPACITY
      }, {
        name: Options.MAP
      }, {
        name: Options.STROKE_COLOR
      }, {
        name: Options.STROKE_OPACITY
      }, {
        name: Options.STROKE_POSITION
      }, {
        name: Options.STROKE_WEIGHT
      }, {
        name: Options.VISIBLE
      }, {
        name: Options.Z_INDEX
      } ]
    };
    Const.Overlays = Overlays;
    Const.OverlayOptions = Options;
    Const.OverlayTypes = Types;
    return Const;
  }(Const || (Const = {}));
  var Const = function(Const) {
    "use strict";
    Const.Settings = {
      CIRCLE_OPTIONS: "circleOptions",
      DELIMITED_STRINGS: "delimitedStrings",
      DELIMITER: "delimiter",
      LABEL_OPTIONS: "labelOptions",
      MAP_ID: "mapId",
      MAP_OPTIONS: "mapOptions",
      MARKER_OPTIONS: "markerOptions",
      ON_LOAD: "onLoad",
      POLYGON_OPTIONS: "polygonOptions",
      POLYLINE_OPTIONS: "polylineOptions",
      RECTANGLE_OPTIONS: "rectangleOptions",
      URL_PRECISION: "urlPrecision"
    };
    return Const;
  }(Const || (Const = {}));
  !function(GlobalSettings, MapOpts, OvlOpts, Settings) {
    "use strict";
    var CircleOptions = {};
    CircleOptions[OvlOpts.CLICKABLE] = true;
    CircleOptions[OvlOpts.DRAGGABLE] = false;
    CircleOptions[OvlOpts.EDITABLE] = false;
    CircleOptions[OvlOpts.FILL_COLOR] = "#2196f3";
    CircleOptions[OvlOpts.FILL_OPACITY] = .75;
    CircleOptions[OvlOpts.STROKE_COLOR] = "#000";
    CircleOptions[OvlOpts.STROKE_OPACITY] = .75;
    CircleOptions[OvlOpts.STROKE_POSITION] = google.maps.StrokePosition.CENTER;
    CircleOptions[OvlOpts.STROKE_WEIGHT] = 1;
    CircleOptions[OvlOpts.VISIBLE] = true;
    var Delimiter = {
      latLng: "|",
      latLngArray: "~",
      latLngBounds: "|"
    };
    var LabelOptions = {};
    LabelOptions[OvlOpts.ALIGN] = "center";
    LabelOptions[OvlOpts.FONT_COLOR] = "#000";
    LabelOptions[OvlOpts.FONT_SIZE] = 14;
    LabelOptions[OvlOpts.STROKE_COLOR] = "#FFF";
    LabelOptions[OvlOpts.STROKE_WEIGHT] = 1;
    LabelOptions[OvlOpts.VISIBLE] = true;
    var MapOptions = {};
    MapOptions[MapOpts.CENTER] = {
      lat: 37.5,
      lng: -120
    };
    MapOptions[MapOpts.CLICKABLE_ICONS] = false;
    MapOptions[MapOpts.DISABLE_DOUBLE_CLICK_ZOOM] = false;
    MapOptions[MapOpts.GESTURE_HANDLING] = "auto";
    MapOptions[MapOpts.KEYBOARD_SHORTCUTS] = true;
    MapOptions[MapOpts.MAP_TYPE_CONTROL] = false;
    MapOptions[MapOpts.MAP_TYPE_ID] = google.maps.MapTypeId.ROADMAP;
    MapOptions[MapOpts.SCROLL_WHEEL] = true;
    MapOptions[MapOpts.STREET_VIEW_CONTROL] = false;
    MapOptions[MapOpts.ZOOM] = 6;
    MapOptions[MapOpts.ZOOM_CONTROL] = true;
    var MarkerOptions = {};
    MarkerOptions[OvlOpts.CLICKABLE] = true;
    MarkerOptions[OvlOpts.CROSS_ON_DRAG] = true;
    MarkerOptions[OvlOpts.DRAGGABLE] = false;
    MarkerOptions[OvlOpts.OPACITY] = 1;
    MarkerOptions[OvlOpts.OPTIMIZED] = true;
    MarkerOptions[OvlOpts.VISIBLE] = true;
    var PolygonOptions = {};
    PolygonOptions[OvlOpts.CLICKABLE] = true;
    PolygonOptions[OvlOpts.DRAGGABLE] = false;
    PolygonOptions[OvlOpts.EDITABLE] = false;
    PolygonOptions[OvlOpts.FILL_COLOR] = "#2196f3";
    PolygonOptions[OvlOpts.FILL_OPACITY] = .75;
    PolygonOptions[OvlOpts.GEODESIC] = false;
    PolygonOptions[OvlOpts.STROKE_COLOR] = "#000";
    PolygonOptions[OvlOpts.STROKE_OPACITY] = .75;
    PolygonOptions[OvlOpts.STROKE_WEIGHT] = 1;
    PolygonOptions[OvlOpts.VISIBLE] = true;
    var PolylineOptions = {};
    PolylineOptions[OvlOpts.CLICKABLE] = true;
    PolylineOptions[OvlOpts.DRAGGABLE] = false;
    PolylineOptions[OvlOpts.EDITABLE] = false;
    PolylineOptions[OvlOpts.GEODESIC] = false;
    PolylineOptions[OvlOpts.STROKE_COLOR] = "#000";
    PolylineOptions[OvlOpts.STROKE_OPACITY] = .75;
    PolylineOptions[OvlOpts.STROKE_WEIGHT] = 3;
    PolylineOptions[OvlOpts.VISIBLE] = true;
    var RectangleOptions = {};
    RectangleOptions[OvlOpts.CLICKABLE] = true;
    RectangleOptions[OvlOpts.DRAGGABLE] = false;
    RectangleOptions[OvlOpts.EDITABLE] = false;
    RectangleOptions[OvlOpts.FILL_COLOR] = "#2196f3";
    RectangleOptions[OvlOpts.FILL_OPACITY] = .75;
    RectangleOptions[OvlOpts.STROKE_COLOR] = "#000";
    RectangleOptions[OvlOpts.STROKE_OPACITY] = .75;
    RectangleOptions[OvlOpts.STROKE_POSITION] = google.maps.StrokePosition.CENTER;
    RectangleOptions[OvlOpts.STROKE_WEIGHT] = 1;
    RectangleOptions[OvlOpts.VISIBLE] = true;
    GlobalSettings[Settings.CIRCLE_OPTIONS] = CircleOptions;
    GlobalSettings[Settings.DELIMITED_STRINGS] = false;
    GlobalSettings[Settings.DELIMITER] = Delimiter;
    GlobalSettings[Settings.LABEL_OPTIONS] = LabelOptions;
    GlobalSettings[Settings.MAP_ID] = "gmap";
    GlobalSettings[Settings.MAP_OPTIONS] = MapOptions;
    GlobalSettings[Settings.MARKER_OPTIONS] = MarkerOptions;
    GlobalSettings[Settings.ON_LOAD] = function() {};
    GlobalSettings[Settings.POLYGON_OPTIONS] = PolygonOptions;
    GlobalSettings[Settings.POLYLINE_OPTIONS] = PolylineOptions;
    GlobalSettings[Settings.RECTANGLE_OPTIONS] = RectangleOptions;
    GlobalSettings[Settings.URL_PRECISION] = 5;
    return GlobalSettings;
  }(gmap.settings || (gmap.settings = {}), Const.MapOptions, Const.OverlayOptions, Const.Settings);
  !function(OverlayTypes) {
    "use strict";
    gmap.prototype = {
      addOverlay: function addOverlay(type, options) {
        return Core.addOverlay({
          map: this,
          options: options,
          type: type
        });
      },
      circles: function circles(ids) {
        return Core.search({
          ids: ids,
          matching: true,
          ovlArray: this.overlays[OverlayTypes.CIRCLE]
        });
      },
      fitBounds: function fitBounds(ovls) {
        return Core.fitBounds({
          map: this,
          ovls: ovls
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
        return Convert.toString({
          map: this,
          val: this.getCenter()
        });
      },
      getOptions: function getOptions(option) {
        return Core.getMapOptions({
          map: this,
          option: option
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
          matching: true,
          ovlArray: this.overlays[OverlayTypes.LABEL]
        });
      },
      markers: function markers(ids) {
        return Core.search({
          ids: ids,
          matching: true,
          ovlArray: this.overlays[OverlayTypes.MARKER]
        });
      },
      off: function off(type) {
        return Core.removeListener({
          ovl: this,
          type: type
        });
      },
      on: function on(type, func) {
        return Core.addListener({
          ovl: this,
          func: func,
          type: type
        });
      },
      polygons: function polygons(ids) {
        return Core.search({
          ids: ids,
          matching: true,
          ovlArray: this.overlays[OverlayTypes.POLYGON]
        });
      },
      polylines: function polylines(ids) {
        return Core.search({
          ids: ids,
          matching: true,
          ovlArray: this.overlays[OverlayTypes.POLYLINE]
        });
      },
      rectangles: function rectangles(ids) {
        return Core.search({
          ids: ids,
          matching: true,
          ovlArray: this.overlays[OverlayTypes.RECTANGLE]
        });
      },
      reset: function reset() {
        return Core.resetMap({
          map: this
        });
      },
      setCenter: function setCenter(center) {
        if (center !== undefined) {
          this.obj.setCenter(Convert.toLatLng({
            map: this,
            val: center
          }));
        }
        return this;
      },
      setOptions: function setOptions(option, value) {
        return Core.setMapOptions({
          map: this,
          option: option,
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
          ovl: this,
          type: type
        });
      }
    };
    return gmap;
  }(Const.OverlayTypes);
  var Core = function(Core) {
    "use strict";
    Core.addOverlay = function(_ref) {
      var map = _ref.map, options = _ref.options, type = _ref.type;
      var args = arguments[0];
      type = Lookup.overlayType(type);
      if (IsValid.overlayType(type) === false) {
        return Error.throw({
          method: "addOverlay",
          msg: args.type + " is not a valid overlay type",
          args: args
        });
      }
      args.type = type;
      return Is.Array(options) ? multiAdd(args) : add(args);
    };
    function add(_ref2) {
      var map = _ref2.map, options = _ref2.options, type = _ref2.type;
      var args = arguments[0];
      args.convert = true;
      options.id = Get.formattedId(args);
      options = Get.mergedOptions(args);
      if (IsValid.overlayOptions({
        map: map,
        options: options,
        type: type
      })) {
        return new Overlays[type]({
          map: map,
          options: options
        });
      }
    }
    function multiAdd(_ref3) {
      var map = _ref3.map, options = _ref3.options, type = _ref3.type;
      var args = arguments[0];
      var newOvlArray = Get.newOverlayArray(args);
      for (var i = 0, i_end = options.length; i < i_end; i++) {
        args.options = options[i];
        var ovl = add(args);
        if (ovl) newOvlArray.push(ovl);
      }
      return newOvlArray;
    }
    return Core;
  }(Core || (Core = {}));
  var Core = function(Core, GoogleClasses) {
    "use strict";
    Core.fitBounds = function(_ref4) {
      var map = _ref4.map, ovls = _ref4.ovls;
      if (Is.LatLngBounds(ovls)) {
        map.obj.fitBounds(ovls);
      } else if (Is.Object(ovls)) {
        map.obj.fitBounds(Get.boundsByOverlayObject({
          map: map,
          ovls: ovls
        }));
      } else if (ovls === "init" || ovls === "initial") {
        map.obj.fitBounds(map.init.bounds);
        map.obj.setZoom(map.init.options.zoom);
      }
      return map;
    };
    Core.getBounds = function(_ref5) {
      var ids = _ref5.ids, ovl = _ref5.ovl, ovlArray = _ref5.ovlArray;
      var args = arguments[0];
      args.bounds = new google.maps[GoogleClasses.LAT_LNG_BOUNDS]();
      return ovlArray ? multiGetBounds(args) : getBounds(args);
    };
    Core.getCenter = function(_ref6) {
      var ovl = _ref6.ovl, ovlArray = _ref6.ovlArray;
      var bounds = Core.getBounds(arguments[0]);
      return bounds.getCenter();
    };
    var BoundsFunction = {
      Circle: function Circle(_ref7) {
        var ovl = _ref7.ovl;
        return ovl.obj.getBounds();
      },
      Label: function Label(_ref8) {
        var bounds = _ref8.bounds, ovl = _ref8.ovl;
        return Get.boundsByPosition({
          bounds: bounds,
          ovl: ovl
        });
      },
      Marker: function Marker(_ref9) {
        var bounds = _ref9.bounds, ovl = _ref9.ovl;
        return Get.boundsByPosition({
          bounds: bounds,
          ovl: ovl
        });
      },
      Polygon: function Polygon(_ref10) {
        var bounds = _ref10.bounds, ovl = _ref10.ovl;
        return Get.boundsByPaths({
          bounds: bounds,
          ovl: ovl
        });
      },
      Polyline: function Polyline(_ref11) {
        var bounds = _ref11.bounds, ovl = _ref11.ovl;
        return Get.boundsByPath({
          bounds: bounds,
          ovl: ovl
        });
      },
      Rectangle: function Rectangle(_ref12) {
        var ovl = _ref12.ovl;
        return ovl.obj.getBounds();
      }
    };
    function getBounds(_ref13) {
      var bounds = _ref13.bounds, ovl = _ref13.ovl;
      return bounds.union(BoundsFunction[ovl.type](arguments[0]));
    }
    function multiGetBounds(_ref14) {
      var bounds = _ref14.bounds, ids = _ref14.ids, ovlArray = _ref14.ovlArray;
      var args = arguments[0];
      ids = ids || ovlArray.getIds();
      for (var i = 0, i_end = ids.length; i < i_end; i++) {
        args.ovl = ovlArray.findById(ids[i]);
        if (args.ovl) bounds.union(BoundsFunction[args.ovl.type](args));
      }
      return bounds;
    }
    return Core;
  }(Core || (Core = {}), Const.GoogleClasses);
  var Core = function(Core) {
    "use strict";
    Core.getCoordinates = function(_ref15) {
      var index = _ref15.index, ovl = _ref15.ovl, ovlArray = _ref15.ovlArray, stringify = _ref15.stringify;
      var args = arguments[0];
      return ovlArray ? multiGetCoords(args) : getCoords(args);
    };
    var Coordinates = {
      Label: function Label(_ref16) {
        var ovl = _ref16.ovl;
        return ovl.obj.getPosition();
      },
      Marker: function Marker(_ref17) {
        var ovl = _ref17.ovl;
        return ovl.obj.getPosition();
      },
      Polygon: function Polygon(_ref18) {
        var index = _ref18.index, ovl = _ref18.ovl;
        return index >= 0 ? ovl.obj.getPaths().getAt(index) : ovl.obj.getPaths();
      },
      Polyline: function Polyline(_ref19) {
        var ovl = _ref19.ovl;
        return ovl.obj.getPath();
      }
    };
    function formatCoords(_ref20) {
      var val = _ref20.val, map = _ref20.map, stringify = _ref20.stringify;
      return stringify ? Convert.toString(arguments[0]) : val;
    }
    function formatRetVal(retVal) {
      var keys = Object.keys(retVal);
      return keys.length === 1 ? retVal[keys[0]] : retVal;
    }
    function getCoords(_ref21) {
      var index = _ref21.index, ovl = _ref21.ovl, stringify = _ref21.stringify;
      var args = arguments[0];
      args.map = ovl.map;
      args.val = Coordinates[ovl.type](args);
      return formatCoords(args);
    }
    function multiGetCoords(_ref22) {
      var index = _ref22.index, ovlArray = _ref22.ovlArray, stringify = _ref22.stringify;
      var args = arguments[0];
      var ids = ovlArray.getIds();
      var retVal = {};
      for (var i = 0, i_end = ids.length; i < i_end; i++) {
        args.ovl = ovlArray.findById(ids[i]);
        if (args.ovl) retVal[ids[i]] = getCoords(args);
      }
      return formatRetVal(retVal);
    }
    return Core;
  }(Core || (Core = {}));
  var Core = function(Core) {
    "use strict";
    Core.hide = function(_ref23) {
      var ovl = _ref23.ovl, ovlArray = _ref23.ovlArray;
      var args = arguments[0];
      args.action = Action.HIDE;
      return ovlArray ? multiDisplay(args) : display(args);
    };
    Core.show = function(_ref24) {
      var ovl = _ref24.ovl, ovlArray = _ref24.ovlArray;
      var args = arguments[0];
      args.action = Action.SHOW;
      return ovlArray ? multiDisplay(args) : display(args);
    };
    Core.toggle = function(_ref25) {
      var condition = _ref25.condition, ovl = _ref25.ovl, ovlArray = _ref25.ovlArray;
      var args = arguments[0];
      args.action = Action.TOGGLE;
      if (Is.Boolean(condition)) {
        args.action = condition ? Action.SHOW : Action.HIDE;
      }
      return ovlArray ? multiDisplay(args) : display(args);
    };
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
      toggle: function toggle(ovl) {
        return !ovl.obj.getVisible();
      }
    };
    function display(_ref26) {
      var action = _ref26.action, ovl = _ref26.ovl;
      ovl.obj.setOptions({
        visible: Visibility[action](ovl)
      });
      return ovl;
    }
    function multiDisplay(_ref27) {
      var action = _ref27.action, ovlArray = _ref27.ovlArray;
      var args = arguments[0];
      var ids = ovlArray.getIds();
      var newOvlArray = Get.newOverlayArray({
        ovlArray: ovlArray
      });
      for (var i = 0, i_end = ids.length; i < i_end; i++) {
        args.ovl = ovlArray.findById(ids[i]);
        if (args.ovl) newOvlArray.push(display(args));
      }
      return newOvlArray;
    }
    return Core;
  }(Core || (Core = {}));
  var Core = function(Core, OverlayTypes) {
    "use strict";
    Core.geolocate = function(_ref28) {
      var map = _ref28.map, _ref28$options = _ref28.options, options = _ref28$options === undefined ? {} : _ref28$options;
      if (!window.navigator.geolocation) return false;
      options = Object.assign({}, DefaultOptions, options);
      navigator.geolocation.getCurrentPosition(function(position) {
        var center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        addUpdateMarkers(map, center, options.showMarkers);
        return map.setOptions({
          center: center,
          zoom: options.zoom
        });
      }, error, options);
    };
    var DefaultOptions = {
      enableHighAccuracy: false,
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
    function addUpdateMarkers(map, position, showMarkers) {
      if (showMarkers === true && markerExists(map) === false) {
        map.addOverlay(OverlayTypes.MARKER, [ getMarkerOptions(MarkerIds[1], position), getMarkerOptions(MarkerIds[0], position) ]);
      }
      map.markers(MarkerIds).setOptions({
        position: position,
        visible: showMarkers
      });
    }
    function error(error) {
      return Error.throw({
        method: "geoLocate",
        msg: error.message
      });
    }
    function getMarkerOptions(id, position) {
      return {
        id: id,
        position: position,
        icon: IconOptions[id]
      };
    }
    function markerExists(map) {
      var markers = map.overlays[OverlayTypes.MARKER];
      return markers.includes(MarkerIds[0]) === true || markers.includes(MarkerIds[1]) === true;
    }
    return Core;
  }(Core || (Core = {}), Const.OverlayTypes);
  var Core = function(Core) {
    "use strict";
    Core.getMapOptions = function(_ref29) {
      var map = _ref29.map, option = _ref29.option;
      option = Lookup.mapOption(option);
      return option !== undefined ? map.obj[option] : getAllObjectsOptions({
        map: map
      });
    };
    Core.getOptions = function(_ref30) {
      var option = _ref30.option, ovl = _ref30.ovl, ovlArray = _ref30.ovlArray;
      var args = arguments[0];
      args.option = Lookup.overlayOption(option);
      return ovlArray ? multiGetOptions(args) : getOptions(args);
    };
    function formatMultiReturn(retVal) {
      var keys = Object.keys(retVal);
      return keys.length === 1 ? retVal[keys[0]] : retVal;
    }
    function getAllObjectsOptions(_ref31) {
      var map = _ref31.map, ovl = _ref31.ovl;
      var obj = ovl !== undefined ? ovl.obj : map.obj;
      var options = ovl !== undefined ? Const.Overlays[ovl.type].options.map(function(opt) {
        return opt.name;
      }) : Const.Map.options.map(function(opt) {
        return opt.name;
      });
      var retVal = {};
      for (var i = 0, i_end = options.length; i < i_end; i++) {
        var key = options[i];
        if (obj[key] !== undefined) {
          retVal[key] = obj[key];
        }
      }
      return retVal;
    }
    function getOptions(_ref32) {
      var option = _ref32.option, ovl = _ref32.ovl;
      return option !== undefined ? ovl.obj[option] : getAllObjectsOptions({
        ovl: ovl
      });
    }
    function multiGetOptions(_ref33) {
      var option = _ref33.option, ovlArray = _ref33.ovlArray;
      var args = arguments[0];
      var ids = ovlArray.getIds();
      var retVal = {};
      for (var i = 0, i_end = ids.length; i < i_end; i++) {
        args.ovl = ovlArray.findById(ids[i]);
        if (args.ovl) retVal[ids[i]] = getOptions(args);
      }
      return formatMultiReturn(retVal);
    }
    return Core;
  }(Core || (Core = {}));
  var Core = function(Core) {
    "use strict";
    Core.addListener = function(_ref34) {
      var func = _ref34.func, ovl = _ref34.ovl, ovlArray = _ref34.ovlArray, type = _ref34.type;
      var args = arguments[0];
      args.action = Action.ADD;
      return listener(args);
    };
    Core.removeListener = function(_ref35) {
      var func = _ref35.func, ovl = _ref35.ovl, ovlArray = _ref35.ovlArray, type = _ref35.type;
      var args = arguments[0];
      args.action = type !== "all" ? Action.REMOVE_TYPE : Action.REMOVE_ALL;
      return listener(args);
    };
    Core.triggerListener = function(_ref36) {
      var func = _ref36.func, ovl = _ref36.ovl, ovlArray = _ref36.ovlArray, type = _ref36.type;
      var args = arguments[0];
      args.action = Action.TRIGGER;
      return listener(args);
    };
    var Action = {
      ADD: "add",
      REMOVE_ALL: "remove_all",
      REMOVE_TYPE: "remove_type",
      TRIGGER: "trigger"
    };
    var Execute = {
      add: function add(_ref37) {
        var func = _ref37.func, ovl = _ref37.ovl, type = _ref37.type;
        google.maps.event.addListener(ovl.obj, type, func);
        return ovl;
      },
      remove_all: function remove_all(_ref38) {
        var ovl = _ref38.ovl;
        google.maps.event.clearInstanceListeners(ovl.obj);
        return ovl;
      },
      remove_type: function remove_type(_ref39) {
        var ovl = _ref39.ovl, type = _ref39.type;
        google.maps.event.clearListeners(ovl.obj, type);
        return ovl;
      },
      trigger: function trigger(_ref40) {
        var ovl = _ref40.ovl, type = _ref40.type;
        google.maps.event.trigger(ovl.obj, type, {});
        return ovl;
      }
    };
    function listener(_ref41) {
      var action = _ref41.action, func = _ref41.func, ovl = _ref41.ovl, ovlArray = _ref41.ovlArray, type = _ref41.type;
      var args = arguments[0];
      args.type = Lookup.eventType(type);
      return ovlArray ? multiListener(args) : Execute[action](args);
    }
    function multiListener(_ref42) {
      var action = _ref42.action, func = _ref42.func, ovlArray = _ref42.ovlArray, type = _ref42.type;
      var args = arguments[0];
      var ids = ovlArray.getIds();
      var newOvlArray = Get.newOverlayArray({
        ovlArray: ovlArray
      });
      for (var i = 0, i_end = ids.length; i < i_end; i++) {
        args.ovl = ovlArray.findById(ids[i]);
        if (args.ovl) newOvlArray.push(Execute[action](args));
      }
      return newOvlArray;
    }
    return Core;
  }(Core || (Core = {}));
  var Core = function(Core) {
    "use strict";
    Core.pop = function(_ref43) {
      var count = _ref43.count, ovlArray = _ref43.ovlArray;
      var args = arguments[0];
      args.action = Action.POP;
      return pop(args);
    };
    Core.remove = function(_ref44) {
      var ovl = _ref44.ovl, ovlArray = _ref44.ovlArray;
      var args = arguments[0];
      return ovlArray ? multiRemove(ovlArray) : remove(ovl);
    };
    Core.shift = function(_ref45) {
      var count = _ref45.count, ovlArray = _ref45.ovlArray;
      var args = arguments[0];
      args.action = Action.SHIFT;
      return pop(args);
    };
    var Action = {
      POP: "pop",
      SHIFT: "shift"
    };
    var RemoveFunction = {
      pop: function pop(ovlArray) {
        var ovl = ovlArray.data.pop();
        ovl.obj.setMap(null);
        return ovl;
      },
      shift: function shift(ovlArray) {
        var ovl = ovlArray.data.shift();
        ovl.obj.setMap(null);
        return ovl;
      }
    };
    function remove(ovl) {
      var ovlArray = ovl.map.overlays[ovl.type];
      var index = ovlArray.data.indexOf(ovl);
      ovl.obj.setMap(null);
      return ovlArray.data.splice(index, 1)[0];
    }
    function multiRemove(ovlArray) {
      var args = arguments[0];
      var ids = ovlArray.getIds();
      var newOvlArray = Get.newOverlayArray({
        ovlArray: ovlArray
      });
      for (var i = 0, i_end = ids.length; i < i_end; i++) {
        var ovl = ovlArray.findById(ids[i]);
        if (ovl) newOvlArray.push(remove(ovl));
      }
      return newOvlArray;
    }
    function pop(_ref46) {
      var action = _ref46.action, _ref46$count = _ref46.count, count = _ref46$count === undefined ? 1 : _ref46$count, ovlArray = _ref46.ovlArray;
      var newOvlArray = Get.newOverlayArray({
        ovlArray: ovlArray
      });
      while (count > 0 && ovlArray.data.length > 0) {
        newOvlArray.push(RemoveFunction[action](ovlArray));
        count--;
      }
      return newOvlArray;
    }
    return Core;
  }(Core || (Core = {}));
  var Core = function(Core) {
    "use strict";
    Core.reset = function(_ref47) {
      var ovl = _ref47.ovl, ovlArray = _ref47.ovlArray;
      var args = arguments[0];
      return ovlArray ? multiReset(ovlArray) : reset(ovl);
    };
    Core.resetMap = function(_ref48) {
      var map = _ref48.map;
      map.obj.fitBounds(map.init.bounds);
      map.obj.setOptions(map.init.options);
      return map;
    };
    function reset(ovl) {
      ovl.obj.setOptions(ovl.init.options);
      return ovl;
    }
    function multiReset(ovlArray) {
      var args = arguments[0];
      var ids = ovlArray.getIds();
      var newOvlArray = Get.newOverlayArray({
        ovlArray: ovlArray
      });
      for (var i = 0, i_end = ids.length; i < i_end; i++) {
        var ovl = ovlArray.findById(ids[i]);
        if (ovl) newOvlArray.push(reset(ovl));
      }
      return newOvlArray;
    }
    return Core;
  }(Core || (Core = {}));
  var Core = function(Core) {
    "use strict";
    Core.search = function(_ref49) {
      var ids = _ref49.ids, matching = _ref49.matching, ovlArray = _ref49.ovlArray;
      var args = arguments[0];
      var map = ovlArray.map;
      var newOvlArray = Get.newOverlayArray({
        ovlArray: ovlArray
      });
      newOvlArray.data = ids === undefined ? ovlArray.data.slice(0) : getDataByIds(args);
      return newOvlArray;
    };
    function formatIds(ids) {
      return Convert.toArray(ids).map(function(id) {
        return id.toString();
      });
    }
    function getDataByIds(_ref50) {
      var ids = _ref50.ids, matching = _ref50.matching, ovlArray = _ref50.ovlArray;
      ids = formatIds(ids);
      return ovlArray.data.filter(function(ovl) {
        return matching === true ? ids.indexOf(ovl.id) !== -1 : ids.indexOf(ovl.id) === -1;
      });
    }
    return Core;
  }(Core || (Core = {}));
  var Core = function(Core) {
    "use strict";
    Core.setOptions = function(_ref51) {
      var option = _ref51.option, ovl = _ref51.ovl, ovlArray = _ref51.ovlArray, value = _ref51.value;
      var args = arguments[0];
      args.option = formatOverlayOptions(args);
      return ovlArray ? multiSetOptions(args) : setOptions(args);
    };
    Core.setMapOptions = function(_ref52) {
      var map = _ref52.map, option = _ref52.option, value = _ref52.value;
      return setOptions({
        option: formatMapOptions(arguments[0]),
        ovl: map
      });
    };
    function formatMapOptions(_ref53) {
      var map = _ref53.map, option = _ref53.option, value = _ref53.value;
      var Format = {
        object: function object(_ref54) {
          var option = _ref54.option;
          return Get.renamedMapOptions({
            options: option
          });
        },
        string: function string(_ref55) {
          var _ref56;
          var option = _ref55.option, value = _ref55.value;
          return _ref56 = {}, _ref56[option] = value, _ref56;
        }
      };
      return Get.convertedMapOptions({
        map: map,
        options: Format[Get.type(option)](arguments[0])
      });
    }
    function formatOverlayOptions(_ref57) {
      var option = _ref57.option, ovl = _ref57.ovl, ovlArray = _ref57.ovlArray, value = _ref57.value;
      var Format = {
        object: function object(_ref58) {
          var option = _ref58.option;
          return Get.renamedOptions({
            options: option
          });
        },
        string: function string(_ref59) {
          var _ref60;
          var option = _ref59.option, value = _ref59.value;
          return _ref60 = {}, _ref60[option] = value, _ref60;
        }
      };
      return Get.convertedOptions({
        map: ovlArray ? ovlArray.map : ovl.map,
        options: Format[Get.type(option)](arguments[0]),
        type: ovlArray ? ovlArray.getChildType() : ovl.type
      });
    }
    function multiSetOptions(_ref61) {
      var option = _ref61.option, ovlArray = _ref61.ovlArray;
      var args = arguments[0];
      var ids = ovlArray.getIds();
      var newOvlArray = Get.newOverlayArray({
        ovlArray: ovlArray
      });
      for (var i = 0, i_end = ids.length; i < i_end; i++) {
        args.ovl = ovlArray.findById(ids[i]);
        if (args.ovl) newOvlArray.push(setOptions(args));
      }
      return newOvlArray;
    }
    function setOptions(_ref62) {
      var option = _ref62.option, ovl = _ref62.ovl;
      ovl.obj.setOptions(option);
      return ovl;
    }
    return Core;
  }(Core || (Core = {}));
  var Overlays = function(Overlays) {
    "use strict";
    var BaseOverlay = function() {
      function BaseOverlay(_ref63) {
        var map = _ref63.map, obj = _ref63.obj, options = _ref63.options, type = _ref63.type;
        _classCallCheck(this, BaseOverlay);
        this.id = options.id;
        this.init = {
          options: options
        };
        this.map = map;
        this.obj = obj;
        this.obj["gmaps"] = {
          id: this.id,
          map: map,
          parent: this,
          version: gmap.version
        };
        this.parent = map.overlays[type];
        this.type = type;
        this.map.overlays[type].push(this);
      }
      BaseOverlay.prototype.getBounds = function getBounds() {
        return Core.getBounds({
          ovl: this
        });
      };
      BaseOverlay.prototype.getCenter = function getCenter() {
        return Core.getCenter({
          ovl: this
        });
      };
      BaseOverlay.prototype.getCenterString = function getCenterString() {
        return Convert.toString({
          map: this.map,
          val: this.getCenter()
        });
      };
      BaseOverlay.prototype.getOptions = function getOptions(option) {
        return Core.getOptions({
          option: option,
          ovl: this
        });
      };
      BaseOverlay.prototype.hide = function hide() {
        return Core.hide({
          ovl: this
        });
      };
      BaseOverlay.prototype.others = function others() {
        return Core.search({
          ids: [ this.id ],
          matching: false,
          ovlArray: this.parent
        });
      };
      BaseOverlay.prototype.remove = function remove() {
        return Core.remove({
          ovl: this
        });
      };
      BaseOverlay.prototype.reset = function reset() {
        return Core.reset({
          ovl: this
        });
      };
      BaseOverlay.prototype.setOptions = function setOptions(option, value) {
        return Core.setOptions({
          option: option,
          ovl: this,
          value: value
        });
      };
      BaseOverlay.prototype.show = function show() {
        return Core.show({
          ovl: this
        });
      };
      BaseOverlay.prototype.toggle = function toggle(condition) {
        return Core.toggle({
          condition: condition,
          ovl: this
        });
      };
      BaseOverlay.prototype.zoom = function zoom() {
        var ovls = {};
        ovls[this.type] = this.id;
        Core.fitBounds({
          map: this.map,
          ovls: ovls
        });
        return this;
      };
      return BaseOverlay;
    }();
    Overlays.BaseOverlay = BaseOverlay;
    return Overlays;
  }(Overlays || (Overlays = {}));
  var Overlays = function(Overlays) {
    "use strict";
    var BaseOverlayArray = function() {
      function BaseOverlayArray(_ref64) {
        var map = _ref64.map, type = _ref64.type;
        _classCallCheck(this, BaseOverlayArray);
        this.data = [];
        this.map = map;
        this.seed = 0;
        this.type = type;
      }
      BaseOverlayArray.prototype.filter = function filter(fn) {
        return this.data.filter(fn);
      };
      BaseOverlayArray.prototype.find = function find(fn) {
        return this.data.find(fn);
      };
      BaseOverlayArray.prototype.findById = function findById(id) {
        return this.data.find(function(ovl) {
          return id != null ? ovl.id === id.toString() : false;
        });
      };
      BaseOverlayArray.prototype.forEach = function forEach(fn) {
        this.data.forEach(fn);
        return this;
      };
      BaseOverlayArray.prototype.getBounds = function getBounds() {
        return Core.getBounds({
          ids: this.getIds(),
          ovlArray: this
        });
      };
      BaseOverlayArray.prototype.getCenter = function getCenter() {
        return Core.getCenter({
          ids: this.getIds(),
          ovlArray: this
        });
      };
      BaseOverlayArray.prototype.getCenterString = function getCenterString() {
        return Convert.toString({
          map: this.map,
          val: this.getCenter()
        });
      };
      BaseOverlayArray.prototype.getChildType = function getChildType() {
        return this.type.replace("Array", "");
      };
      BaseOverlayArray.prototype.getGoogleObjects = function getGoogleObjects() {
        return this.data.map(function(ovl) {
          return ovl.obj;
        });
      };
      BaseOverlayArray.prototype.getIds = function getIds() {
        return this.data.map(function(ovl) {
          return ovl.id;
        });
      };
      BaseOverlayArray.prototype.getOptions = function getOptions(option) {
        return Core.getOptions({
          option: option,
          ovlArray: this
        });
      };
      BaseOverlayArray.prototype.hide = function hide() {
        return Core.hide({
          ids: this.getIds(),
          ovlArray: this
        });
      };
      BaseOverlayArray.prototype.includes = function includes(id) {
        return this.findById(id) !== undefined;
      };
      BaseOverlayArray.prototype.others = function others() {
        return Core.search({
          ids: this.getIds(),
          matching: false,
          ovlArray: this
        });
      };
      BaseOverlayArray.prototype.pop = function pop(count) {
        return Core.pop({
          count: count,
          ovlArray: this.map
        });
      };
      BaseOverlayArray.prototype.push = function push(ovl) {
        return this.data.push(ovl);
      };
      BaseOverlayArray.prototype.remove = function remove() {
        return Core.remove({
          ovlArray: this
        });
      };
      BaseOverlayArray.prototype.reset = function reset() {
        return Core.reset({
          ids: this.getIds(),
          ovlArray: this
        });
      };
      BaseOverlayArray.prototype.shift = function shift(count) {
        return Core.shift({
          count: count,
          ovlArray: this.map
        });
      };
      BaseOverlayArray.prototype.show = function show() {
        return Core.show({
          ids: this.getIds(),
          ovlArray: this
        });
      };
      BaseOverlayArray.prototype.setOptions = function setOptions(option, value) {
        return Core.setOptions({
          option: option,
          ovlArray: this,
          value: value
        });
      };
      BaseOverlayArray.prototype.toggle = function toggle(condition) {
        return Core.toggle({
          condition: condition,
          ids: this.getIds(),
          ovlArray: this
        });
      };
      BaseOverlayArray.prototype.zoom = function zoom() {
        var ovls = {};
        ovls[this.getChildType()] = this.getIds();
        Core.fitBounds({
          map: this.map,
          ovls: ovls
        });
        return this;
      };
      return BaseOverlayArray;
    }();
    Overlays.BaseOverlayArray = BaseOverlayArray;
    return Overlays;
  }(Overlays || (Overlays = {}));
  var Overlays = function(Overlays, OverlayTypes, GoogleClasses) {
    "use strict";
    var Circle = function(_Overlays$BaseOverlay) {
      _inherits(Circle, _Overlays$BaseOverlay);
      function Circle(_ref65) {
        var map = _ref65.map, options = _ref65.options;
        _classCallCheck(this, Circle);
        return _possibleConstructorReturn(this, _Overlays$BaseOverlay.call(this, {
          map: map,
          obj: new google.maps[GoogleClasses.CIRCLE](options),
          options: options,
          type: OverlayTypes.CIRCLE
        }));
      }
      Circle.prototype.off = function off(type) {
        return Core.removeListener({
          ovl: this,
          type: type
        });
      };
      Circle.prototype.on = function on(type, func) {
        return Core.addListener({
          ovl: this,
          func: func,
          type: type
        });
      };
      Circle.prototype.trigger = function trigger(type) {
        return Core.triggerListener({
          ovl: this,
          type: type
        });
      };
      return Circle;
    }(Overlays.BaseOverlay);
    Overlays.Circle = Circle;
    return Overlays;
  }(Overlays || (Overlays = {}), Const.OverlayTypes, Const.GoogleClasses);
  var Overlays = function(Overlays, OverlayTypes) {
    "use strict";
    var CircleArray = function(_Overlays$BaseOverlay2) {
      _inherits(CircleArray, _Overlays$BaseOverlay2);
      function CircleArray(_ref66) {
        var map = _ref66.map;
        _classCallCheck(this, CircleArray);
        return _possibleConstructorReturn(this, _Overlays$BaseOverlay2.call(this, {
          map: map,
          type: OverlayTypes.CIRCLE_ARRAY
        }));
      }
      CircleArray.prototype.off = function off(type) {
        return Core.removeListener({
          ids: this.getIds(),
          ovlArray: this,
          type: type
        });
      };
      CircleArray.prototype.on = function on(type, func) {
        return Core.addListener({
          func: func,
          ids: this.getIds(),
          ovlArray: this,
          type: type
        });
      };
      CircleArray.prototype.trigger = function trigger(type) {
        return Core.triggerListener({
          ids: this.getIds(),
          ovlArray: this,
          type: type
        });
      };
      return CircleArray;
    }(Overlays.BaseOverlayArray);
    Overlays.CircleArray = CircleArray;
    return Overlays;
  }(Overlays || (Overlays = {}), Const.OverlayTypes);
  var Overlays = function(Overlays) {
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
      var _this4 = this;
      Object.keys(Default).forEach(function(key) {
        _this4.set(Property[key], Default[key]);
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
    Overlays.GoogleLabel = googleLabel;
    return Overlays;
  }(Overlays || (Overlays = {}));
  var Overlays = function(Overlays, OverlayTypes) {
    "use strict";
    var Label = function(_Overlays$BaseOverlay3) {
      _inherits(Label, _Overlays$BaseOverlay3);
      function Label(_ref67) {
        var map = _ref67.map, options = _ref67.options;
        _classCallCheck(this, Label);
        return _possibleConstructorReturn(this, _Overlays$BaseOverlay3.call(this, {
          map: map,
          obj: new Overlays.GoogleLabel(options),
          options: options,
          type: OverlayTypes.LABEL
        }));
      }
      return Label;
    }(Overlays.BaseOverlay);
    Overlays.Label = Label;
    return Overlays;
  }(Overlays || (Overlays = {}), Const.OverlayTypes);
  var Overlays = function(Overlays, OverlayTypes) {
    "use strict";
    var LabelArray = function(_Overlays$BaseOverlay4) {
      _inherits(LabelArray, _Overlays$BaseOverlay4);
      function LabelArray(_ref68) {
        var map = _ref68.map;
        _classCallCheck(this, LabelArray);
        return _possibleConstructorReturn(this, _Overlays$BaseOverlay4.call(this, {
          map: map,
          type: OverlayTypes.LABEL_ARRAY
        }));
      }
      LabelArray.prototype.getPosition = function getPosition() {
        return Core.getCoordinates({
          ovlArray: this
        });
      };
      LabelArray.prototype.getPositionString = function getPositionString() {
        return Core.getCoordinates({
          ovlArray: this,
          stringify: true
        });
      };
      return LabelArray;
    }(Overlays.BaseOverlayArray);
    Overlays.LabelArray = LabelArray;
    return Overlays;
  }(Overlays || (Overlays = {}), Const.OverlayTypes);
  var Overlays = function(Overlays, OverlayTypes, GoogleClasses) {
    "use strict";
    var Marker = function(_Overlays$BaseOverlay5) {
      _inherits(Marker, _Overlays$BaseOverlay5);
      function Marker(_ref69) {
        var map = _ref69.map, options = _ref69.options;
        _classCallCheck(this, Marker);
        return _possibleConstructorReturn(this, _Overlays$BaseOverlay5.call(this, {
          map: map,
          obj: new google.maps[GoogleClasses.MARKER](options),
          options: options,
          type: OverlayTypes.MARKER
        }));
      }
      Marker.prototype.getPosition = function getPosition() {
        return Core.getCoordinates({
          ovl: this
        });
      };
      Marker.prototype.getPositionString = function getPositionString() {
        return Core.getCoordinates({
          ovl: this,
          stringify: true
        });
      };
      Marker.prototype.off = function off(type) {
        return Core.removeListener({
          ovl: this,
          type: type
        });
      };
      Marker.prototype.on = function on(type, func) {
        return Core.addListener({
          func: func,
          ovl: this,
          type: type
        });
      };
      Marker.prototype.trigger = function trigger(type) {
        return Core.triggerListener({
          ovl: this,
          type: type
        });
      };
      return Marker;
    }(Overlays.BaseOverlay);
    Overlays.Marker = Marker;
    return Overlays;
  }(Overlays || (Overlays = {}), Const.OverlayTypes, Const.GoogleClasses);
  var Overlays = function(Overlays, OverlayTypes) {
    "use strict";
    var MarkerArray = function(_Overlays$BaseOverlay6) {
      _inherits(MarkerArray, _Overlays$BaseOverlay6);
      function MarkerArray(_ref70) {
        var map = _ref70.map;
        _classCallCheck(this, MarkerArray);
        return _possibleConstructorReturn(this, _Overlays$BaseOverlay6.call(this, {
          map: map,
          type: OverlayTypes.MARKER_ARRAY
        }));
      }
      MarkerArray.prototype.getPosition = function getPosition() {
        return Core.getCoordinates({
          ovlArray: this
        });
      };
      MarkerArray.prototype.getPositionString = function getPositionString() {
        return Core.getCoordinates({
          ovlArray: this,
          stringify: true
        });
      };
      MarkerArray.prototype.off = function off(type) {
        return Core.removeListener({
          ids: this.getIds(),
          ovlArray: this,
          type: type
        });
      };
      MarkerArray.prototype.on = function on(type, func) {
        return Core.addListener({
          func: func,
          ids: this.getIds(),
          ovlArray: this,
          type: type
        });
      };
      MarkerArray.prototype.trigger = function trigger(type) {
        return Core.triggerListener({
          ids: this.getIds(),
          ovlArray: this,
          type: type
        });
      };
      return MarkerArray;
    }(Overlays.BaseOverlayArray);
    Overlays.MarkerArray = MarkerArray;
    return Overlays;
  }(Overlays || (Overlays = {}), Const.OverlayTypes);
  var Overlays = function(Overlays, OverlayTypes, GoogleClasses) {
    "use strict";
    var Polygon = function(_Overlays$BaseOverlay7) {
      _inherits(Polygon, _Overlays$BaseOverlay7);
      function Polygon(_ref71) {
        var map = _ref71.map, options = _ref71.options;
        _classCallCheck(this, Polygon);
        return _possibleConstructorReturn(this, _Overlays$BaseOverlay7.call(this, {
          map: map,
          obj: new google.maps[GoogleClasses.POLYGON](options),
          options: options,
          type: OverlayTypes.POLYGON
        }));
      }
      Polygon.prototype.getPath = function getPath(index) {
        return Core.getCoordinates({
          index: index,
          ovl: this
        });
      };
      Polygon.prototype.getPathString = function getPathString(index) {
        return Core.getCoordinates({
          index: index,
          ovl: this,
          stringify: true
        });
      };
      Polygon.prototype.off = function off(type) {
        return Core.removeListener({
          ovl: this,
          type: type
        });
      };
      Polygon.prototype.on = function on(type, func) {
        return Core.addListener({
          func: func,
          ovl: this,
          type: type
        });
      };
      Polygon.prototype.trigger = function trigger(type) {
        return Core.triggerListener({
          ovl: this,
          type: type
        });
      };
      return Polygon;
    }(Overlays.BaseOverlay);
    Overlays.Polygon = Polygon;
    return Overlays;
  }(Overlays || (Overlays = {}), Const.OverlayTypes, Const.GoogleClasses);
  var Overlays = function(Overlays, OverlayTypes) {
    "use strict";
    var PolygonArray = function(_Overlays$BaseOverlay8) {
      _inherits(PolygonArray, _Overlays$BaseOverlay8);
      function PolygonArray(_ref72) {
        var map = _ref72.map;
        _classCallCheck(this, PolygonArray);
        return _possibleConstructorReturn(this, _Overlays$BaseOverlay8.call(this, {
          map: map,
          type: OverlayTypes.POLYGON_ARRAY
        }));
      }
      PolygonArray.prototype.getPath = function getPath(index) {
        return Core.getCoordinates({
          index: index,
          ovlArray: this
        });
      };
      PolygonArray.prototype.getPathString = function getPathString(index) {
        return Core.getCoordinates({
          index: index,
          ovlArray: this,
          stringify: true
        });
      };
      PolygonArray.prototype.off = function off(type) {
        return Core.removeListener({
          ids: this.getIds(),
          ovlArray: this,
          type: type
        });
      };
      PolygonArray.prototype.on = function on(type, func) {
        return Core.addListener({
          func: func,
          ids: this.getIds(),
          ovlArray: this,
          type: type
        });
      };
      PolygonArray.prototype.trigger = function trigger(type) {
        return Core.triggerListener({
          ids: this.getIds(),
          ovlArray: this,
          type: type
        });
      };
      return PolygonArray;
    }(Overlays.BaseOverlayArray);
    Overlays.PolygonArray = PolygonArray;
    return Overlays;
  }(Overlays || (Overlays = {}), Const.OverlayTypes);
  var Overlays = function(Overlays, OverlayTypes, GoogleClasses) {
    "use strict";
    var Polyline = function(_Overlays$BaseOverlay9) {
      _inherits(Polyline, _Overlays$BaseOverlay9);
      function Polyline(_ref73) {
        var map = _ref73.map, options = _ref73.options;
        _classCallCheck(this, Polyline);
        return _possibleConstructorReturn(this, _Overlays$BaseOverlay9.call(this, {
          map: map,
          obj: new google.maps[GoogleClasses.POLYLINE](options),
          options: options,
          type: OverlayTypes.POLYLINE
        }));
      }
      Polyline.prototype.getPath = function getPath() {
        return Core.getCoordinates({
          ovl: this
        });
      };
      Polyline.prototype.getPathString = function getPathString() {
        return Core.getCoordinates({
          ovl: this,
          stringify: true
        });
      };
      Polyline.prototype.off = function off(type) {
        return Core.removeListener({
          ovl: this,
          type: type
        });
      };
      Polyline.prototype.on = function on(type, func) {
        return Core.addListener({
          func: func,
          ovl: this,
          type: type
        });
      };
      Polyline.prototype.trigger = function trigger(type) {
        return Core.triggerListener({
          ovl: this,
          type: type
        });
      };
      return Polyline;
    }(Overlays.BaseOverlay);
    Overlays.Polyline = Polyline;
    return Overlays;
  }(Overlays || (Overlays = {}), Const.OverlayTypes, Const.GoogleClasses);
  var Overlays = function(Overlays, OverlayTypes) {
    "use strict";
    var PolylineArray = function(_Overlays$BaseOverlay10) {
      _inherits(PolylineArray, _Overlays$BaseOverlay10);
      function PolylineArray(_ref74) {
        var map = _ref74.map;
        _classCallCheck(this, PolylineArray);
        return _possibleConstructorReturn(this, _Overlays$BaseOverlay10.call(this, {
          map: map,
          type: OverlayTypes.POLYLINE_ARRAY
        }));
      }
      PolylineArray.prototype.getPath = function getPath() {
        return Core.getCoordinates({
          ovlArray: this
        });
      };
      PolylineArray.prototype.getPathString = function getPathString() {
        return Core.getCoordinates({
          ovlArray: this,
          stringify: true
        });
      };
      PolylineArray.prototype.off = function off(type) {
        return Core.removeListener({
          ids: this.getIds(),
          ovlArray: this,
          type: type
        });
      };
      PolylineArray.prototype.on = function on(type, func) {
        return Core.addListener({
          func: func,
          ids: this.getIds(),
          ovlArray: this,
          type: type
        });
      };
      PolylineArray.prototype.trigger = function trigger(type) {
        return Core.triggerListener({
          ids: this.getIds(),
          ovlArray: this,
          type: type
        });
      };
      return PolylineArray;
    }(Overlays.BaseOverlayArray);
    Overlays.PolylineArray = PolylineArray;
    return Overlays;
  }(Overlays || (Overlays = {}), Const.OverlayTypes);
  var Overlays = function(Overlays, OverlayTypes, GoogleClasses) {
    "use strict";
    var Rectangle = function(_Overlays$BaseOverlay11) {
      _inherits(Rectangle, _Overlays$BaseOverlay11);
      function Rectangle(_ref75) {
        var map = _ref75.map, options = _ref75.options;
        _classCallCheck(this, Rectangle);
        return _possibleConstructorReturn(this, _Overlays$BaseOverlay11.call(this, {
          map: map,
          obj: new google.maps[GoogleClasses.RECTANGLE](options),
          options: options,
          type: OverlayTypes.RECTANGLE
        }));
      }
      Rectangle.prototype.off = function off(type) {
        return Core.removeListener({
          ovl: this,
          type: type
        });
      };
      Rectangle.prototype.on = function on(type, func) {
        return Core.addListener({
          func: func,
          ovl: this,
          type: type
        });
      };
      Rectangle.prototype.trigger = function trigger(type) {
        return Core.triggerListener({
          ovl: this,
          type: type
        });
      };
      return Rectangle;
    }(Overlays.BaseOverlay);
    Overlays.Rectangle = Rectangle;
    return Overlays;
  }(Overlays || (Overlays = {}), Const.OverlayTypes, Const.GoogleClasses);
  var Overlays = function(Overlays, OverlayTypes) {
    "use strict";
    var RectangleArray = function(_Overlays$BaseOverlay12) {
      _inherits(RectangleArray, _Overlays$BaseOverlay12);
      function RectangleArray(_ref76) {
        var map = _ref76.map;
        _classCallCheck(this, RectangleArray);
        return _possibleConstructorReturn(this, _Overlays$BaseOverlay12.call(this, {
          map: map,
          type: OverlayTypes.RECTANGLE_ARRAY
        }));
      }
      RectangleArray.prototype.off = function off(type) {
        return Core.removeListener({
          ids: this.getIds(),
          ovlArray: this,
          type: type
        });
      };
      RectangleArray.prototype.on = function on(type, func) {
        return Core.addListener({
          func: func,
          ids: this.getIds(),
          ovlArray: this,
          type: type
        });
      };
      RectangleArray.prototype.trigger = function trigger(type) {
        return Core.triggerListener({
          ids: this.getIds(),
          ovlArray: this,
          type: type
        });
      };
      return RectangleArray;
    }(Overlays.BaseOverlayArray);
    Overlays.RectangleArray = RectangleArray;
    return Overlays;
  }(Overlays || (Overlays = {}), Const.OverlayTypes);
  !function(gmap) {
    "use strict";
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
    var Shape = [ "decagon", "hexagon", "pentagon", "rectangle", "square", "triangle" ];
    var ShapeDegrees = {
      decagon: [ 36, 72, 108, 144, 180, 216, 252, 288, 324, 360 ],
      hexagon: [ 30, 90, 150, 210, 270, 330 ],
      pentagon: [ 72, 144, 216, 288, 360 ],
      rectangle: [ 60, 120, 240, 300 ],
      square: [ 45, 135, 225, 315 ],
      triangle: [ 120, 240, 360 ]
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
  var Convert = function(Convert) {
    "use strict";
    Convert.toArray = function(val) {
      return Is.Array(val) ? val : [ val ];
    };
    Convert.toLowerCase = function(val) {
      var regex = /\s+|_+/g;
      return Is.String(val) ? val.toLowerCase().replace(regex, "") : undefined;
    };
    return Convert;
  }(Convert || (Convert = {}));
  var Convert = function(Convert, Settings) {
    "use strict";
    Convert.toLatLng = function(_ref77) {
      var map = _ref77.map, val = _ref77.val;
      if (Is.LatLng(val) || Is.Object(val)) return val;
      if (Is.String(val)) {
        return map.settings[Settings.DELIMITED_STRINGS] ? strToLatLng(val) : JSON.parse(val);
      }
    };
    Convert.toLatLngArray = function(_ref78) {
      var map = _ref78.map, val = _ref78.val;
      if (Is.MVCArray(val) || Is.Array(val)) return val;
      if (Is.String(val)) {
        return map.settings[Settings.DELIMITED_STRINGS] ? strToLatLngArray(arguments[0]) : JSON.parse(val);
      }
    };
    Convert.toLatLngBounds = function(_ref79) {
      var map = _ref79.map, val = _ref79.val;
      if (Is.LatLngBounds(val) || Is.Object(val)) return val;
      if (Is.String(val)) {
        return map.settings[Settings.DELIMITED_STRINGS] ? strToLatLngBounds(arguments[0]) : JSON.parse(val);
      }
    };
    function strToLatLng(str) {
      var points = str.split(",");
      return new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]));
    }
    function strToLatLngArray(_ref80) {
      var map = _ref80.map, val = _ref80.val;
      var delimiter = map.settings[Settings.DELIMITER].latLng;
      var latLngs = val.split(delimiter);
      var latLngArray = [];
      for (var i = 0, i_end = latLngs.length; i < i_end; i++) {
        latLngArray.push(strToLatLng(latLngs[i]));
      }
      return latLngArray;
    }
    function strToLatLngBounds(_ref81) {
      var map = _ref81.map, val = _ref81.val;
      var delimiter = map.settings[Settings.DELIMITER].latLngBounds;
      var latLngs = val.split(delimiter);
      return {
        north: Number(latLngs[0]),
        east: Number(latLngs[1]),
        south: Number(latLngs[2]),
        west: Number(latLngs[3])
      };
    }
    return Convert;
  }(Convert || (Convert = {}), Const.Settings);
  var Convert = function(Convert, Settings, GoogleClasses) {
    "use strict";
    Convert.toString = function(_ref82) {
      var map = _ref82.map, val = _ref82.val;
      var args = arguments[0];
      args.delimited = map.settings[Settings.DELIMITED_STRINGS];
      args.precision = map.settings[Settings.URL_PRECISION];
      return Conversions[Get.googleClass(val)](args);
    };
    var Conversions = {
      LatLng: function LatLng(_ref83) {
        var map = _ref83.map, val = _ref83.val, delimited = _ref83.delimited;
        var args = arguments[0];
        return delimited ? toDelimited(args) : toJSON(args);
      },
      MVCArray: function MVCArray(_ref84) {
        var map = _ref84.map, val = _ref84.val, delimited = _ref84.delimited;
        var args = arguments[0];
        if (Is.MVCArray(val.getAt(0))) {
          return Conversions.NestedMVCArray(args);
        }
        return delimited ? toDelimited(args) : toJSON(args);
      },
      NestedMVCArray: function NestedMVCArray(_ref85) {
        var map = _ref85.map, val = _ref85.val, delimited = _ref85.delimited;
        var args = arguments[0];
        return delimited ? toMultiDelimited(args) : toMultiJSON(args);
      }
    };
    function toDelimited(_ref86) {
      var map = _ref86.map, val = _ref86.val, precision = _ref86.precision;
      var str = "";
      if (Is.MVCArray(val)) {
        val.forEach(function(el, i) {
          if (i > 0) str += map.settings[Settings.DELIMITER].latLng;
          str += el.toUrlValue(precision);
        });
      } else {
        str += val.toUrlValue(precision);
      }
      return str;
    }
    function toJSON(_ref87) {
      var map = _ref87.map, val = _ref87.val, precision = _ref87.precision;
      if (Is.MVCArray(val)) val = val.getArray();
      return JSON.stringify(val, function(key, value) {
        return key === "lat" || key === "lng" ? Number(value.toFixed(precision)) : value;
      });
    }
    function toMultiDelimited(_ref88) {
      var map = _ref88.map, val = _ref88.val, precision = _ref88.precision;
      var args = arguments[0];
      var str = "";
      val.forEach(function(el, i) {
        if (i > 0) str += map.settings[Settings.DELIMITER].latLngArray;
        args.val = el;
        str += toDelimited(args);
      });
      return str;
    }
    function toMultiJSON(_ref89) {
      var map = _ref89.map, val = _ref89.val, precision = _ref89.precision;
      var args = arguments[0];
      var arr = new google.maps[GoogleClasses.MVC_ARRAY]();
      val.forEach(function(el) {
        arr.push(el.getArray());
      });
      args.val = arr;
      return toJSON(args);
    }
    return Convert;
  }(Convert || (Convert = {}), Const.Settings, Const.GoogleClasses);
  var Error = function(Error) {
    "use strict";
    Error.throw = function(_ref90) {
      var method = _ref90.method, msg = _ref90.msg, args = _ref90.args;
      console.error(method + ": " + msg, args);
      return false;
    };
    return Error;
  }(Error || (Error = {}));
  var Get = function(Get, GoogleClasses) {
    "use strict";
    Get.boundsByOverlayObject = function(_ref91) {
      var map = _ref91.map, ovls = _ref91.ovls;
      var bounds = new google.maps[GoogleClasses.LAT_LNG_BOUNDS]();
      var types = Object.keys(ovls);
      for (var i = 0, i_end = types.length; i < i_end; i++) {
        var type = Lookup.overlayType(types[i]);
        var ids = getIds(map.overlays[type], ovls[types[i]]);
        bounds.union(Core.getBounds({
          ids: ids,
          ovlArray: map.overlays[type]
        }));
      }
      return bounds;
    };
    Get.boundsByPath = function(_ref92) {
      var bounds = _ref92.bounds, ovl = _ref92.ovl;
      var path = ovl.obj.getPath();
      for (var i = 0, i_end = path.length; i < i_end; i++) {
        bounds.extend(path.getAt(i));
      }
      return bounds;
    };
    Get.boundsByPaths = function(_ref93) {
      var bounds = _ref93.bounds, ovl = _ref93.ovl;
      var paths = ovl.obj.getPaths();
      for (var i = 0, i_end = paths.length; i < i_end; i++) {
        var path = paths.getAt(i);
        for (var j = 0, j_end = path.getLength(); j < j_end; j++) {
          bounds.extend(path.getAt(j));
        }
      }
      return bounds;
    };
    Get.boundsByPosition = function(_ref94) {
      var bounds = _ref94.bounds, ovl = _ref94.ovl;
      bounds.extend(ovl.obj.getPosition());
      return bounds;
    };
    function getIds(ovlArray, ids) {
      return ids === null || ids === "all" ? ovlArray.getIds() : ids;
    }
    return Get;
  }(Get || (Get = {}), Const.GoogleClasses);
  var Get = function(Get) {
    "use strict";
    Get.convertedMapOptions = function(_ref95) {
      var map = _ref95.map, options = _ref95.options;
      var mapOptions = Const.Map.options;
      var convertableOpts = mapOptions.filter(function(opt) {
        return opt["convertable"] === true;
      });
      return convertOptions({
        convertableOpts: convertableOpts,
        map: map,
        options: options
      });
    };
    Get.convertedOptions = function(_ref96) {
      var map = _ref96.map, options = _ref96.options, type = _ref96.type;
      var convertableOpts = Get.filteredOptions({
        filter: "convertable",
        type: type
      });
      return convertOptions({
        convertableOpts: convertableOpts,
        map: map,
        options: options
      });
    };
    Get.renamedMapOptions = function(_ref97) {
      var options = _ref97.options;
      Object.keys(options).forEach(function(key) {
        Util.renameProperty({
          newName: Lookup.mapOption(key),
          obj: options,
          oldName: key
        });
      });
      return options;
    };
    Get.renamedOptions = function(_ref98) {
      var options = _ref98.options;
      Object.keys(options).forEach(function(key) {
        Util.renameProperty({
          newName: Lookup.overlayOption(key),
          obj: options,
          oldName: key
        });
      });
      return options;
    };
    var Conversions = {
      bounds: function bounds(_ref99) {
        var options = _ref99.options, map = _ref99.map;
        if (options.bounds) {
          options.bounds = Convert.toLatLngBounds({
            map: map,
            val: options.bounds
          });
        }
      },
      center: function center(_ref100) {
        var options = _ref100.options, map = _ref100.map;
        if (options.center) {
          options.center = Convert.toLatLng({
            map: map,
            val: options.center
          });
        }
      },
      path: function path(_ref101) {
        var options = _ref101.options, map = _ref101.map;
        if (options.path) {
          options.path = Convert.toLatLngArray({
            map: map,
            val: options.path
          });
        }
      },
      paths: function paths(_ref102) {
        var options = _ref102.options, map = _ref102.map;
        if (options.paths || options.path) {
          options.paths = Convert.toLatLngArray({
            map: map,
            val: options.paths || options.path
          });
          delete options.path;
        }
      },
      position: function position(_ref103) {
        var options = _ref103.options, map = _ref103.map;
        if (options.position) {
          options.position = Convert.toLatLng({
            map: map,
            val: options.position
          });
        }
      }
    };
    function convertOptions(_ref104) {
      var convertableOpts = _ref104.convertableOpts, map = _ref104.map, options = _ref104.options;
      for (var i = 0, i_end = convertableOpts.length; i < i_end; i++) {
        var opt = convertableOpts[i];
        Conversions[opt.name]({
          map: map,
          options: options
        });
      }
      return options;
    }
    return Get;
  }(Get || (Get = {}));
  var Get = function(Get, GlobalSettings) {
    "use strict";
    Get.mergedSettings = function(_ref105) {
      var convert = _ref105.convert, settings = _ref105.settings;
      settings = Object.assign({}, GlobalSettings, settings);
      if (convert) {
        var map = {
          settings: settings
        };
        var options = settings[Const.Settings.MAP_OPTIONS];
        settings[Const.Settings.MAP_OPTIONS] = Get.convertedMapOptions({
          map: map,
          options: options
        });
      }
      return settings;
    };
    Get.renamedSettings = function(_ref106) {
      var settings = _ref106.settings;
      Object.keys(settings).forEach(function(key) {
        Util.renameProperty({
          newName: Lookup.setting(key),
          obj: settings,
          oldName: key
        });
      });
      return settings;
    };
    return Get;
  }(Get || (Get = {}), gmap.settings);
  var Get = function(Get) {
    "use strict";
    Get.googleClass = function(obj) {
      var key = Object.keys(Const.GoogleClasses).find(function(k) {
        return obj instanceof google.maps[Const.GoogleClasses[k]];
      });
      return Const.GoogleClasses[key];
    };
    Get.newOverlayArray = function(_ref107) {
      var map = _ref107.map, ovlArray = _ref107.ovlArray, type = _ref107.type;
      type = type + "Array";
      if (ovlArray !== undefined) {
        map = ovlArray.map;
        type = ovlArray.type;
      }
      return new Overlays[type]({
        map: map
      });
    };
    Get.type = function(val) {
      return Object.prototype.toString.call(val).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
    };
    return Get;
  }(Get || (Get = {}));
  var Get = function(Get) {
    "use strict";
    Get.filteredOptions = function(_ref108) {
      var type = _ref108.type, filter = _ref108.filter;
      var options = Const.Overlays[type].options;
      var filterType = {
        string: function string(opt) {
          return opt[filter] === true;
        },
        function: filter
      };
      return options.filter(filterType[$.type(filter)]);
    };
    Get.formattedId = function(_ref109) {
      var map = _ref109.map, options = _ref109.options, type = _ref109.type;
      var id = options.id;
      return FormatID[$.type(id)](id) || FormatID["auto"](arguments[0]);
    };
    Get.mergedOptions = function(_ref110) {
      var map = _ref110.map, options = _ref110.options, type = _ref110.type, convert = _ref110.convert;
      var args = arguments[0];
      var namespace = Lookup.setting(type + "Options");
      var defaults = map.settings[namespace] || {};
      args.options = $.extend({}, defaults, options);
      args.options.map = map.obj;
      return convert ? Get.convertedOptions(args) : args.options;
    };
    var FormatID = {
      auto: function auto(_ref111) {
        var map = _ref111.map, type = _ref111.type;
        return "__" + map.overlays[type].seed++ + "__";
      },
      number: function number(id) {
        return id.toString();
      },
      string: function string(id) {
        return id;
      }
    };
    return Get;
  }(Get || (Get = {}));
  var Is = function(Is, Google) {
    "use strict";
    Is.LatLng = function(val) {
      return val instanceof google.maps[Google.LAT_LNG];
    };
    Is.LatLngBounds = function(val) {
      return val instanceof google.maps[Google.LAT_LNG_BOUNDS];
    };
    Is.MVCArray = function(val) {
      return val instanceof google.maps[Google.MVC_ARRAY];
    };
    return Is;
  }(Is || (Is = {}), Const.GoogleClasses);
  var Is = function(Is) {
    "use strict";
    Is.Array = function(val) {
      return Get.type(val) === "array";
    };
    Is.Boolean = function(val) {
      return Get.type(val) === "boolean";
    };
    Is.Function = function(val) {
      return Get.type(val) === "function";
    };
    Is.Number = function(val) {
      return Get.type(val) === "number";
    };
    Is.Object = function(val) {
      return Get.type(val) === "object";
    };
    Is.String = function(val) {
      return Get.type(val) === "string";
    };
    return Is;
  }(Is || (Is = {}));
  var IsValid = function(IsValid) {
    "use strict";
    IsValid.overlayOptions = function(_ref112) {
      var map = _ref112.map, options = _ref112.options, type = _ref112.type;
      var args = arguments[0];
      args.id = options.id;
      if (isExistingId(args)) {
        return Error.throw({
          method: "addOverlay",
          msg: "A " + type + " with an id of " + args.id + " already exists",
          args: args
        });
      }
      var reqOptions = Get.filteredOptions({
        filter: "requried",
        type: type
      });
      for (var i = 0, i_end = reqOptions.length; i < i_end; i++) {
        var opt = reqOptions[i].name;
        if (isEmpty(options[opt])) {
          return Error.throw({
            method: "addOverlay",
            msg: opt + " must have a value",
            args: args
          });
        }
      }
      return true;
    };
    IsValid.overlayType = function(type) {
      return Object.keys(Const.Overlays).includes(type);
    };
    function isEmpty(val) {
      return val === "" || val === null || val === undefined;
    }
    function isExistingId(_ref113) {
      var map = _ref113.map, type = _ref113.type, id = _ref113.id;
      return map.overlays[type].includes(id);
    }
    return IsValid;
  }(IsValid || (IsValid = {}));
  var Util = function(Util) {
    "use strict";
    Util.renameProperty = function(_ref114) {
      var obj = _ref114.obj, oldName = _ref114.oldName, newName = _ref114.newName;
      if (oldName === newName) return;
      if (obj.hasOwnProperty(oldName)) {
        obj[newName] = obj[oldName];
        delete obj[oldName];
      }
    };
    return Util;
  }(Util || (Util = {}));
  var Lookup = function(Lookup) {
    "use strict";
    Lookup.eventType = function(value) {
      return lookup(Const.EventTypes, value) || value;
    };
    Lookup.mapOption = function(value) {
      return lookup(Const.MapOptions, value) || value;
    };
    Lookup.overlayOption = function(value) {
      return lookup(Const.OverlayOptions, value) || value;
    };
    Lookup.overlayType = function(value) {
      return lookup(Const.OverlayTypes, value, true) || value;
    };
    Lookup.setting = function(value) {
      return lookup(Const.Settings, value) || value;
    };
    function lookup(constant, value, plural) {
      value = Convert.toLowerCase(value);
      var key = Object.keys(constant).find(function(k) {
        k = Convert.toLowerCase(k);
        return k === value || plural && k + "s" === value;
      });
      return constant[key];
    }
    return Lookup;
  }(Lookup || (Lookup = {}));
  gmap.version = "1.0.0-alpha.9";
}();