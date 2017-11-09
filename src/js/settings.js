// ------------------------------------------------------------------------
// gmaps: settings.js
// ------------------------------------------------------------------------

!((Settings, CompOption, Type) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Global Settings
  // ----------------------------------------------------------------------

  const CircleOptions = {}
  CircleOptions[CompOption.CLICKABLE]       = true
  CircleOptions[CompOption.DRAGGABLE]       = false
  CircleOptions[CompOption.EDITABLE]        = false
  CircleOptions[CompOption.FILL_COLOR]      = "#2196f3"
  CircleOptions[CompOption.FILL_OPACITY]    = 0.75
  CircleOptions[CompOption.STROKE_COLOR]    = "#000"
  CircleOptions[CompOption.STROKE_OPACITY]  = 0.75
  CircleOptions[CompOption.STROKE_POSITION] = google.maps.StrokePosition.CENTER
  CircleOptions[CompOption.STROKE_WEIGHT]   = 1
  CircleOptions[CompOption.VISIBLE]         = true

  const Delimiter = {
    latLng       : "|",
    latLngArray  : "~",
    latLngBounds : "|"
  }

  const LabelOptions = {}
  LabelOptions[CompOption.ALIGN]         = "center"
  LabelOptions[CompOption.FONT_COLOR]    = "#000"
  LabelOptions[CompOption.FONT_SIZE]     = 14
  LabelOptions[CompOption.STROKE_COLOR]  = "#FFF"
  LabelOptions[CompOption.STROKE_WEIGHT] = 1
  LabelOptions[CompOption.VISIBLE]       = true

  const MapOptions = {}
  MapOptions[CompOption.CENTER]                    = { lat: 37.5, lng: -120 }
  MapOptions[CompOption.CLICKABLE_ICONS]           = false
  MapOptions[CompOption.DISABLE_DOUBLE_CLICK_ZOOM] = false
  MapOptions[CompOption.GESTURE_HANDLING]          = "auto"
  MapOptions[CompOption.KEYBOARD_SHORTCUTS]        = true
  MapOptions[CompOption.MAP_TYPE_CONTROL]          = false
  MapOptions[CompOption.MAP_TYPE_ID]               = google.maps.MapTypeId.ROADMAP
  MapOptions[CompOption.SCROLL_WHEEL]              = true
  MapOptions[CompOption.STREET_VIEW_CONTROL]       = false
  MapOptions[CompOption.ZOOM]                      = 6
  MapOptions[CompOption.ZOOM_CONTROL]              = true

  const MarkerOptions = {}
  MarkerOptions[CompOption.CLICKABLE]     = true
  MarkerOptions[CompOption.CROSS_ON_DRAG] = true
  MarkerOptions[CompOption.DRAGGABLE]     = false
  MarkerOptions[CompOption.OPACITY]       = 1
  MarkerOptions[CompOption.OPTIMIZED]     = true
  MarkerOptions[CompOption.VISIBLE]       = true

  const PolygonOptions = {}
  PolygonOptions[CompOption.CLICKABLE]      = true
  PolygonOptions[CompOption.DRAGGABLE]      = false
  PolygonOptions[CompOption.EDITABLE]       = false
  PolygonOptions[CompOption.FILL_COLOR]     = "#2196f3"
  PolygonOptions[CompOption.FILL_OPACITY]   = 0.75
  PolygonOptions[CompOption.GEODESIC]       = false
  PolygonOptions[CompOption.STROKE_COLOR]   = "#000"
  PolygonOptions[CompOption.STROKE_OPACITY] = 0.75
  PolygonOptions[CompOption.STROKE_WEIGHT]  = 1
  PolygonOptions[CompOption.VISIBLE]        = true

  const PolylineOptions = {}
  PolylineOptions[CompOption.CLICKABLE]      = true
  PolylineOptions[CompOption.DRAGGABLE]      = false
  PolylineOptions[CompOption.EDITABLE]       = false
  PolylineOptions[CompOption.GEODESIC]       = false
  PolylineOptions[CompOption.STROKE_COLOR]   = "#000"
  PolylineOptions[CompOption.STROKE_OPACITY] = 0.75
  PolylineOptions[CompOption.STROKE_WEIGHT]  = 3
  PolylineOptions[CompOption.VISIBLE]        = true

  const RectangleOptions = {}
  RectangleOptions[CompOption.CLICKABLE]       = true
  RectangleOptions[CompOption.DRAGGABLE]       = false
  RectangleOptions[CompOption.EDITABLE]        = false
  RectangleOptions[CompOption.FILL_COLOR]      = "#2196f3"
  RectangleOptions[CompOption.FILL_OPACITY]    = 0.75
  RectangleOptions[CompOption.STROKE_COLOR]    = "#000"
  RectangleOptions[CompOption.STROKE_OPACITY]  = 0.75
  RectangleOptions[CompOption.STROKE_POSITION] = google.maps.StrokePosition.CENTER
  RectangleOptions[CompOption.STROKE_WEIGHT]   = 1
  RectangleOptions[CompOption.VISIBLE]         = true


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Settings[Type.CIRCLE_OPTIONS]    = CircleOptions
  Settings[Type.DELIMITED_STRINGS] = false
  Settings[Type.DELIMITER]         = Delimiter
  Settings[Type.LABEL_OPTIONS]     = LabelOptions
  Settings[Type.MAP_ID]            = "gmap"
  Settings[Type.MAP_OPTIONS]       = MapOptions
  Settings[Type.MARKER_OPTIONS]    = MarkerOptions
  Settings[Type.ON_LOAD]           = function() {}
  Settings[Type.POLYGON_OPTIONS]   = PolygonOptions
  Settings[Type.POLYLINE_OPTIONS]  = PolylineOptions
  Settings[Type.RECTANGLE_OPTIONS] = RectangleOptions
  Settings[Type.URL_PRECISION]     = 5

  return Settings
})(gmap.settings || (gmap.settings = {}), Const.ComponentOption, Const.Setting)
