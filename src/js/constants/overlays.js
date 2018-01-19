// ------------------------------------------------------------------------
// gmaps: constants/overlays.js
// ------------------------------------------------------------------------

var Const = ((Const) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Overlay Constants
  // ----------------------------------------------------------------------

  const Option = {
    ALIGN            : "align",
    ANCHOR_POINT     : "anchorPoint",
    ANIMATION        : "animation",
    BOUNDS           : "bounds",
    CENTER           : "center",
    CLICKABLE        : "clickable",
    CONTENT          : "content",
    CROSS_ON_DRAG    : "crossOnDrag",
    CURSOR           : "cursor",
    DISABLE_AUTO_PAN : "disableAutoPan",
    DRAGGABLE        : "draggable",
    EDITABLE         : "editable",
    FILL_COLOR       : "fillColor",
    FILL_OPACITY     : "fillOpacity",
    FONT_COLOR       : "fontColor",
    FONT_FAMILY      : "fontFamily",
    FONT_SIZE        : "fontSize",
    GEODESIC         : "geodesic",
    ICON             : "icon",
    ICONS            : "icons",
    LABEL            : "label",
    MAP              : "map",
    MAX_WIDTH        : "maxWidth",
    MAX_ZOOM         : "maxZoom",
    MIN_ZOOM         : "minZoom",
    OPACITY          : "opacity",
    OPTIMIZED        : "optimized",
    PATH             : "path",
    PATHS            : "paths",
    PIXEL_OFFSET     : "pixelOffset",
    PLACE            : "place",
    POSITION         : "position",
    RADIUS           : "radius",
    SHAPE            : "shape",
    STROKE_COLOR     : "strokeColor",
    STROKE_OPACITY   : "strokeOpacity",
    STROKE_POSITION  : "strokePosition",
    STROKE_WEIGHT    : "strokeWeight",
    TITLE            : "title",
    TEXT             : "text",
    VISIBLE          : "visible",
    Z_INDEX          : "zIndex"
  }

  const Type = {
    CIRCLE          : "Circle",
    CIRCLE_ARRAY    : "CircleArray",
    LABEL           : "Label",
    LABEL_ARRAY     : "LabelArray",
    MARKER          : "Marker",
    MARKER_ARRAY    : "MarkerArray",
    POLYGON         : "Polygon",
    POLYGON_ARRAY   : "PolygonArray",
    POLYLINE        : "Polyline",
    POLYLINE_ARRAY  : "PolylineArray",
    RECTANGLE       : "Rectangle",
    RECTANGLE_ARRAY : "RectangleArray"
  }

  const Overlays = {}
  Overlays[Type.CIRCLE] = {
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
      {
        name        : Option.RADIUS,
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
  Overlays[Type.LABEL] = {
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
  Overlays[Type.MARKER] = {
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
  Overlays[Type.POLYGON] = {
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
  Overlays[Type.POLYLINE] = {
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
  Overlays[Type.RECTANGLE] = {
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

  Const.Overlays      = Overlays
  Const.OverlayOption = Option
  Const.OverlayType   = Type


  return Const
})(Const || (Const = {}))
