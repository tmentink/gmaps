// ------------------------------------------------------------------------
// gmaps: constants/components.js
// ------------------------------------------------------------------------

var Const = ((Const) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Component Constants
  // ----------------------------------------------------------------------

  const Option = {
    ALIGN                       : "align",
    ANCHOR_POINT                : "anchorPoint",
    ANIMATION                   : "animation",
    BACKGROUND_COLOR            : "backgroundColor",
    BOUNDS                      : "bounds",
    CENTER                      : "center",
    CLICKABLE                   : "clickable",
    CLICKABLE_ICONS             : "clickableIcons",
    CONTENT                     : "content",
    CROSS_ON_DRAG               : "crossOnDrag",
    CURSOR                      : "cursor",
    DISABLE_AUTO_PAN            : "disableAutoPan",
    DISABLE_DEFAULT_UI          : "disableDefaultUI",
    DISABLE_DOUBLE_CLICK_ZOOM   : "disableDoubleClickZoom",
    DRAGGABLE                   : "draggable",
    DRAGGABLE_CURSOR            : "draggableCursor",
    DRAGGING_CURSOR             : "draggingCursor",
    EDITABLE                    : "editable",
    FILL_COLOR                  : "fillColor",
    FILL_OPACITY                : "fillOpacity",
    FONT_COLOR                  : "fontColor",
    FONT_FAMILY                 : "fontFamily",
    FONT_SIZE                   : "fontSize",
    FULLSCREEN_CONTROL          : "fullscreenControl",
    FULLSCREEN_CONTROL_OPTIONS  : "fullscreenControlOptions",
    GEODESIC                    : "geodesic",
    GESTURE_HANDLING            : "gestureHandling",
    HEADING                     : "heading",
    ICON                        : "icon",
    ICONS                       : "icons",
    KEYBOARD_SHORTCUTS          : "keyboardShortcuts",
    LABEL                       : "label",
    MAP                         : "map",
    MAP_TYPE_CONTROL            : "mapTypeControl",
    MAP_TYPE_CONTROL_OPTIONS    : "mapTypeControlOptions",
    MAP_TYPE_ID                 : "mapTypeId",
    MAX_WIDTH                   : "maxWidth",
    MAX_ZOOM                    : "maxZoom",
    MIN_ZOOM                    : "minZoom",
    NO_CLEAR                    : "noClear",
    OPACITY                     : "opacity",
    OPTIMIZED                   : "optimized",
    PAN_CONTROL                 : "panControl",
    PAN_CONTROL_OPTIONS         : "panControlOptions",
    PATH                        : "path",
    PATHS                       : "paths",
    PIXEL_OFFSET                : "pixelOffset",
    PLACE                       : "place",
    POSITION                    : "position",
    RADIUS                      : "radius",
    ROTATE_CONTROL              : "rotateControl",
    ROTATE_CONTROL_OPTIONS      : "rotateControlOptions",
    SCALE_CONTROL               : "scaleControl",
    SCALE_CONTROL_OPTIONS       : "scaleControlOptions",
    SCROLL_WHEEL                : "scrollWheel",
    SHAPE                       : "shape",
    STREET_VIEW                 : "streetView",
    STREET_VIEW_CONTROL         : "streetViewControl",
    STREET_VIEW_CONTROL_OPTIONS : "streetViewControlOptions",
    STROKE_COLOR                : "strokeColor",
    STROKE_OPACITY              : "strokeOpacity",
    STROKE_POSITION             : "strokePosition",
    STROKE_WEIGHT               : "strokeWeight",
    STYLES                      : "styles",
    TILT                        : "tilt",
    TITLE                       : "title",
    TEXT                        : "text",
    VISIBLE                     : "visible",
    ZOOM                        : "zoom",
    ZOOM_CONTROL                : "zoomControl",
    ZOOM_CONTROL_OPTIONS        : "zoomControlOptions",
    Z_INDEX                     : "zIndex"
  }

  const Type = {
    CIRCLE          : "Circle",
    CIRCLE_ARRAY    : "CircleArray",
    LABEL           : "Label",
    LABEL_ARRAY     : "LabelArray",
    MAP             : "Map",
    MARKER          : "Marker",
    MARKER_ARRAY    : "MarkerArray",
    POLYGON         : "Polygon",
    POLYGON_ARRAY   : "PolygonArray",
    POLYLINE        : "Polyline",
    POLYLINE_ARRAY  : "PolylineArray",
    RECTANGLE       : "Rectangle",
    RECTANGLE_ARRAY : "RectangleArray"
  }

  const Components = {}
  Components[Type.CIRCLE] = {
    options : [
      {
        name        : Option.CENTER,
        convertable : true,
        required    : true
      },
      { name : Option.CLICKABLE },
      { name : Option.DRAGGABLE },
      { name : Option.EDITABLE },
      { name : Option.FILL_COLOR },
      { name : Option.FILL_OPACITY },
      { name : Option.MAP },
      { name : Option.RADIUS },
      { name : Option.STROKE_COLOR },
      { name : Option.STROKE_OPACITY },
      { name : Option.STROKE_POSITION },
      { name : Option.STROKE_WEIGHT },
      { name : Option.VISIBLE },
      { name : Option.Z_INDEX }
    ]
  }
  Components[Type.LABEL] = {
    options : [
      { name : Option.ALIGN },
      { name : Option.FONT_COLOR },
      { name : Option.FONT_FAMILY },
      { name : Option.FONT_SIZE },
      { name : Option.MAX_ZOOM },
      { name : Option.MIN_ZOOM },
      {
        name        : Option.POSITION,
        convertable : true,
        required    : true
      },
      { name : Option.STROKE_WEIGHT },
      { name : Option.STROKE_COLOR },
      { name : Option.VISIBLE },
      {
        name        : Option.TEXT,
        required    : true
      },
      { name : Option.Z_INDEX }
    ]
  }
  Components[Type.MAP] = {
    options : [
      { name : Option.BACKGROUND_COLOR },
      {
        name : Option.CENTER,
        convertable : true,
        required    : true
      },
      { name : Option.CLICKABLE_ICONS },
      { name : Option.DISABLE_DEFAULT_UI },
      { name : Option.DISABLE_DOUBLE_CLICK_ZOOM },
      { name : Option.DRAGGABLE },
      { name : Option.DRAGGABLE_CURSOR },
      { name : Option.DRAGGING_CURSOR },
      { name : Option.FULLSCREEN_CONTROL },
      { name : Option.FULLSCREEN_CONTROL_OPTIONS },
      { name : Option.GESTURE_HANDLING },
      { name : Option.HEADING },
      { name : Option.KEYBOARD_SHORTCUTS },
      { name : Option.MAP_TYPE_CONTROL },
      { name : Option.MAP_TYPE_CONTROL_OPTIONS },
      { name : Option.MAP_TYPE_ID },
      { name : Option.MAX_ZOOM },
      { name : Option.NO_CLEAR },
      { name : Option.PAN_CONTROL },
      { name : Option.PAN_CONTROL_OPTIONS },
      { name : Option.ROTATE_CONTROL },
      { name : Option.ROTATE_CONTROL_OPTIONS },
      { name : Option.SCALE_CONTROL },
      { name : Option.SCALE_CONTROL_OPTIONS },
      { name : Option.SCROLL_WHEEL },
      { name : Option.STREET_VIEW },
      { name : Option.STREET_VIEW_CONTROL },
      { name : Option.STREET_VIEW_CONTROL_OPTIONS },
      { name : Option.STYLES },
      { name : Option.TILT },
      {
        name     : Option.ZOOM,
        required : true
      },
      { name : Option.ZOOM_CONTROL },
      { name : Option.ZOOM_CONTROL_OPTIONS }
    ]
  }
  Components[Type.MARKER] = {
    options : [
      { name : Option.ANCHOR_POINT },
      { name : Option.ANIMATION },
      { name : Option.CLICKABLE },
      { name : Option.CROSS_ON_DRAG },
      { name : Option.CURSOR },
      { name : Option.DRAGGABLE },
      { name : Option.ICON },
      { name : Option.LABEL },
      { name : Option.MAP },
      { name : Option.OPACITY },
      { name : Option.OPTIMIZED },
      { name : Option.PLACE },
      {
        name        : Option.POSITION,
        convertable : true,
        required    : true
      },
      { name : Option.SHAPE },
      { name : Option.TITLE },
      { name : Option.VISIBLE },
      { name : Option.Z_INDEX }
    ]
  }
  Components[Type.POLYGON] = {
    options : [
      { name : Option.CLICKABLE },
      { name : Option.DRAGGABLE },
      { name : Option.EDITABLE },
      { name : Option.FILL_COLOR },
      { name : Option.FILL_OPACITY },
      { name : Option.GEODESIC },
      { name : Option.MAP },
      {
        name        : Option.PATHS,
        convertable : true,
        required    : true
      },
      { name : Option.STROKE_COLOR },
      { name : Option.STROKE_OPACITY },
      { name : Option.STROKE_POSITION },
      { name : Option.STROKE_WEIGHT },
      { name : Option.VISIBLE },
      { name : Option.Z_INDEX }
    ]
  }
  Components[Type.POLYLINE] = {
    options : [
      { name : Option.CLICKABLE },
      { name : Option.DRAGGABLE },
      { name : Option.EDITABLE },
      { name : Option.GEODESIC },
      { name : Option.ICONS },
      { name : Option.MAP },
      {
        name        : Option.PATH,
        convertable : true,
        required    : true
      },
      { name : Option.STROKE_COLOR },
      { name : Option.STROKE_OPACITY },
      { name : Option.STROKE_WEIGHT },
      { name : Option.VISIBLE },
      { name : Option.Z_INDEX }
    ]
  }
  Components[Type.RECTANGLE] = {
    options : [
      {
        name        : Option.BOUNDS,
        convertable : true,
        required    : true
      },
      { name : Option.CLICKABLE },
      { name : Option.DRAGGABLE },
      { name : Option.EDITABLE },
      { name : Option.FILL_COLOR },
      { name : Option.FILL_OPACITY },
      { name : Option.MAP },
      { name : Option.STROKE_COLOR },
      { name : Option.STROKE_OPACITY },
      { name : Option.STROKE_POSITION },
      { name : Option.STROKE_WEIGHT },
      { name : Option.VISIBLE },
      { name : Option.Z_INDEX }
    ]
  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Const.Components      = Components
  Const.ComponentOption = Option
  Const.ComponentType   = Type

  return Const
})(Const || (Const = {}))
