// ------------------------------------------------------------------------
// gmaps: constants/overlays.js
// ------------------------------------------------------------------------

var Const = ((Const) => {
  "use strict"


  const Options = {
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

  const Types = {
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
  Overlays[Types.CIRCLE] = {
    options : [
      {
        name        : Options.CENTER,
        convertable : true,
        required    : true
      },
      { name : Options.CLICKABLE },
      { name : Options.DRAGGABLE },
      { name : Options.EDITABLE },
      { name : Options.FILL_COLOR },
      { name : Options.FILL_OPACITY },
      { name : Options.MAP },
      {
        name        : Options.RADIUS,
        required    : true
      },
      { name : Options.STROKE_COLOR },
      { name : Options.STROKE_OPACITY },
      { name : Options.STROKE_POSITION },
      { name : Options.STROKE_WEIGHT },
      { name : Options.VISIBLE },
      { name : Options.Z_INDEX }
    ]
  }
  Overlays[Types.LABEL] = {
    options : [
      { name : Options.ALIGN },
      { name : Options.FONT_COLOR },
      { name : Options.FONT_FAMILY },
      { name : Options.FONT_SIZE },
      { name : Options.MAX_ZOOM },
      { name : Options.MIN_ZOOM },
      {
        name        : Options.POSITION,
        convertable : true,
        required    : true
      },
      { name : Options.STROKE_WEIGHT },
      { name : Options.STROKE_COLOR },
      { name : Options.VISIBLE },
      {
        name        : Options.TEXT,
        required    : true
      },
      { name : Options.Z_INDEX }
    ]
  }
  Overlays[Types.MARKER] = {
    options : [
      { name : Options.ANCHOR_POINT },
      { name : Options.ANIMATION },
      { name : Options.CLICKABLE },
      { name : Options.CROSS_ON_DRAG },
      { name : Options.CURSOR },
      { name : Options.DRAGGABLE },
      { name : Options.ICON },
      { name : Options.LABEL },
      { name : Options.MAP },
      { name : Options.OPACITY },
      { name : Options.OPTIMIZED },
      { name : Options.PLACE },
      {
        name        : Options.POSITION,
        convertable : true,
        required    : true
      },
      { name : Options.SHAPE },
      { name : Options.TITLE },
      { name : Options.VISIBLE },
      { name : Options.Z_INDEX }
    ]
  }
  Overlays[Types.POLYGON] = {
    options : [
      { name : Options.CLICKABLE },
      { name : Options.DRAGGABLE },
      { name : Options.EDITABLE },
      { name : Options.FILL_COLOR },
      { name : Options.FILL_OPACITY },
      { name : Options.GEODESIC },
      { name : Options.MAP },
      {
        name        : Options.PATHS,
        convertable : true,
        required    : true
      },
      { name : Options.STROKE_COLOR },
      { name : Options.STROKE_OPACITY },
      { name : Options.STROKE_POSITION },
      { name : Options.STROKE_WEIGHT },
      { name : Options.VISIBLE },
      { name : Options.Z_INDEX }
    ]
  }
  Overlays[Types.POLYLINE] = {
    options : [
      { name : Options.CLICKABLE },
      { name : Options.DRAGGABLE },
      { name : Options.EDITABLE },
      { name : Options.GEODESIC },
      { name : Options.ICONS },
      { name : Options.MAP },
      {
        name        : Options.PATH,
        convertable : true,
        required    : true
      },
      { name : Options.STROKE_COLOR },
      { name : Options.STROKE_OPACITY },
      { name : Options.STROKE_WEIGHT },
      { name : Options.VISIBLE },
      { name : Options.Z_INDEX }
    ]
  }
  Overlays[Types.RECTANGLE] = {
    options : [
      {
        name        : Options.BOUNDS,
        convertable : true,
        required    : true
      },
      { name : Options.CLICKABLE },
      { name : Options.DRAGGABLE },
      { name : Options.EDITABLE },
      { name : Options.FILL_COLOR },
      { name : Options.FILL_OPACITY },
      { name : Options.MAP },
      { name : Options.STROKE_COLOR },
      { name : Options.STROKE_OPACITY },
      { name : Options.STROKE_POSITION },
      { name : Options.STROKE_WEIGHT },
      { name : Options.VISIBLE },
      { name : Options.Z_INDEX }
    ]
  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Const.Overlays       = Overlays
  Const.OverlayOptions = Options
  Const.OverlayTypes   = Types


  return Const
})(Const || (Const = {}))
