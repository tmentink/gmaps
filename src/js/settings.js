// ------------------------------------------------------------------------
// gmaps: settings.js
// ------------------------------------------------------------------------
/* eslint-disable max-len */

!((Settings, MapOption, OvlOption, Type) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Global Settings
  // ----------------------------------------------------------------------

  const CircleOptions = {}
  CircleOptions[OvlOption.CLICKABLE]       = true
  CircleOptions[OvlOption.DRAGGABLE]       = false
  CircleOptions[OvlOption.EDITABLE]        = false
  CircleOptions[OvlOption.FILL_COLOR]      = "#2196f3"
  CircleOptions[OvlOption.FILL_OPACITY]    = 0.75
  CircleOptions[OvlOption.STROKE_COLOR]    = "#000"
  CircleOptions[OvlOption.STROKE_OPACITY]  = 0.75
  CircleOptions[OvlOption.STROKE_POSITION] = google.maps.StrokePosition.CENTER
  CircleOptions[OvlOption.STROKE_WEIGHT]   = 1
  CircleOptions[OvlOption.VISIBLE]         = true

  const Delimiter = {
    latLng       : "|",
    latLngArray  : "~",
    latLngBounds : "|"
  }

  const LabelOptions = {}
  LabelOptions[OvlOption.ALIGN]         = "center"
  LabelOptions[OvlOption.FONT_COLOR]    = "#000"
  LabelOptions[OvlOption.FONT_SIZE]     = 14
  LabelOptions[OvlOption.STROKE_COLOR]  = "#FFF"
  LabelOptions[OvlOption.STROKE_WEIGHT] = 1
  LabelOptions[OvlOption.VISIBLE]       = true

  const MapOptions = {}
  MapOptions[MapOption.CENTER]                    = { lat: 37.5, lng: -120 }
  MapOptions[MapOption.CLICKABLE_ICONS]           = false
  MapOptions[MapOption.DISABLE_DOUBLE_CLICK_ZOOM] = false
  MapOptions[MapOption.GESTURE_HANDLING]          = "auto"
  MapOptions[MapOption.KEYBOARD_SHORTCUTS]        = true
  MapOptions[MapOption.MAP_TYPE_CONTROL]          = false
  MapOptions[MapOption.MAP_TYPE_ID]               = google.maps.MapTypeId.ROADMAP
  MapOptions[MapOption.SCROLL_WHEEL]              = true
  MapOptions[MapOption.STREET_VIEW_CONTROL]       = false
  MapOptions[MapOption.ZOOM]                      = 6
  MapOptions[MapOption.ZOOM_CONTROL]              = true

  const MarkerOptions = {}
  MarkerOptions[OvlOption.CLICKABLE]     = true
  MarkerOptions[OvlOption.CROSS_ON_DRAG] = true
  MarkerOptions[OvlOption.DRAGGABLE]     = false
  MarkerOptions[OvlOption.OPACITY]       = 1
  MarkerOptions[OvlOption.OPTIMIZED]     = true
  MarkerOptions[OvlOption.VISIBLE]       = true

  const PolygonOptions = {}
  PolygonOptions[OvlOption.CLICKABLE]      = true
  PolygonOptions[OvlOption.DRAGGABLE]      = false
  PolygonOptions[OvlOption.EDITABLE]       = false
  PolygonOptions[OvlOption.FILL_COLOR]     = "#2196f3"
  PolygonOptions[OvlOption.FILL_OPACITY]   = 0.75
  PolygonOptions[OvlOption.GEODESIC]       = false
  PolygonOptions[OvlOption.STROKE_COLOR]   = "#000"
  PolygonOptions[OvlOption.STROKE_OPACITY] = 0.75
  PolygonOptions[OvlOption.STROKE_WEIGHT]  = 1
  PolygonOptions[OvlOption.VISIBLE]        = true

  const PolylineOptions = {}
  PolylineOptions[OvlOption.CLICKABLE]      = true
  PolylineOptions[OvlOption.DRAGGABLE]      = false
  PolylineOptions[OvlOption.EDITABLE]       = false
  PolylineOptions[OvlOption.GEODESIC]       = false
  PolylineOptions[OvlOption.STROKE_COLOR]   = "#000"
  PolylineOptions[OvlOption.STROKE_OPACITY] = 0.75
  PolylineOptions[OvlOption.STROKE_WEIGHT]  = 3
  PolylineOptions[OvlOption.VISIBLE]        = true

  const RectangleOptions = {}
  RectangleOptions[OvlOption.CLICKABLE]       = true
  RectangleOptions[OvlOption.DRAGGABLE]       = false
  RectangleOptions[OvlOption.EDITABLE]        = false
  RectangleOptions[OvlOption.FILL_COLOR]      = "#2196f3"
  RectangleOptions[OvlOption.FILL_OPACITY]    = 0.75
  RectangleOptions[OvlOption.STROKE_COLOR]    = "#000"
  RectangleOptions[OvlOption.STROKE_OPACITY]  = 0.75
  RectangleOptions[OvlOption.STROKE_POSITION] = google.maps.StrokePosition.CENTER
  RectangleOptions[OvlOption.STROKE_WEIGHT]   = 1
  RectangleOptions[OvlOption.VISIBLE]         = true


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
})(gmap.settings || (gmap.settings = {}), Const.MapOption, Const.OverlayOption, Const.Setting)
