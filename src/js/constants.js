// ------------------------------------------------------------------------
// GMaps: constants.js
// ------------------------------------------------------------------------

var Const = ((Const) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Global Constants
  // ----------------------------------------------------------------------

  Const.Config = {
    DELIMITED_STRINGS : "DelimitedStrings",
    DELIMITER         : "Delimiter",
    LABEL_OPTIONS     : "LabelOptions",
    MAP_ID            : "MapId",
    MAP_OPTIONS       : "MapOptions",
    MARKER_OPTIONS    : "MarkerOptions",
    POLYGON_OPTIONS   : "PolygonOptions",
    URL_PRECISION     : "UrlPrecision"
  }

  Const.ComponentOption = {
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
    VISIBLE                     : "visible",
    ZOOM                        : "zoom",
    ZOOM_CONTROL                : "zoomControl",
    ZOOM_CONTROL_OPTIONS        : "zoomControlOptions",
    Z_INDEX                     : "zIndex"
  }

  Const.ComponentType = {
    LABEL         : "Label",
    LABEL_ARRAY   : "LabelArray",
    MAP           : "Map",
    MARKER        : "Marker",
    MARKER_ARRAY  : "MarkerArray",
    POLYGON       : "Polygon",
    POLYGON_ARRAY : "PolygonArray"
  }

  Const.EventType = {
    ANIMATION_CHANGED   : "animation_changed",
    BOUNDS_CHANGED      : "bounds_changed",
    CENTER_CHANGED      : "center_changed",
    CLICK               : "click",
    CLICKABLE_CHANGED   : "clickable_changed",
    CURSOR_CHANGED      : "cursor_changed",
    DOUBLE_CLICK        : "dblclick",
    DRAG                : "drag",
    DRAG_END            : "dragend",
    DRAG_START          : "dragstart",
    DRAGGABLE_CHANGED   : "draggable_changed",
    FLAT_CHANGED        : "flat_changed",
    HEADING_CHANGED     : "heading_changed",
    ICON_CHANGED        : "icon_changed",
    IDLE                : "idle",
    MAP_TYPE_ID_CHANGED : "maptypeid_changed",
    MOUSE_DOWN          : "mousedown",
    MOUSE_MOVE          : "mousemove",
    MOUSE_OUT           : "mouseout",
    MOUSE_OVER          : "mouseover",
    MOUSE_UP            : "mouseup",
    POSITION_CHANGED    : "position_changed",
    PROJECTION_CHANGED  : "projection_changed",
    RESIZE              : "resize",
    RIGHT_CLICK         : "rightclick",
    SHAPE_CHANGED       : "shape_changed",
    TILES_LOADED        : "tilesloaded",
    TILT_CHANGED        : "tilt_changed",
    TITLE_CHANGED       : "title_changed",
    VISIBLE_CHANGED     : "visible_changed",
    ZINDEX_CHANGED      : "zindex_changed",
    ZOOM_CHANGED        : "zoom_changed"
  }


  return Const
})(Const || (Const = {}))
