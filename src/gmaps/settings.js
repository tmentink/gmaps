/* eslint-disable max-len */

!((GlobalSettings, MapOpts, OvlOpts, Settings) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Global Settings
  // ----------------------------------------------------------------------

  const CircleOptions = {}
  CircleOptions[OvlOpts.CLICKABLE]       = true
  CircleOptions[OvlOpts.DRAGGABLE]       = false
  CircleOptions[OvlOpts.EDITABLE]        = false
  CircleOptions[OvlOpts.FILL_COLOR]      = "#2196f3"
  CircleOptions[OvlOpts.FILL_OPACITY]    = 0.75
  CircleOptions[OvlOpts.STROKE_COLOR]    = "#000"
  CircleOptions[OvlOpts.STROKE_OPACITY]  = 0.75
  CircleOptions[OvlOpts.STROKE_POSITION] = google.maps.StrokePosition.CENTER
  CircleOptions[OvlOpts.STROKE_WEIGHT]   = 1
  CircleOptions[OvlOpts.VISIBLE]         = true

  const Delimiter = {
    latLng       : "|",
    latLngArray  : "~",
    latLngBounds : "|"
  }

  const LabelOptions = {}
  LabelOptions[OvlOpts.ALIGN]         = "center"
  LabelOptions[OvlOpts.FONT_COLOR]    = "#000"
  LabelOptions[OvlOpts.FONT_SIZE]     = 14
  LabelOptions[OvlOpts.STROKE_COLOR]  = "#FFF"
  LabelOptions[OvlOpts.STROKE_WEIGHT] = 1
  LabelOptions[OvlOpts.VISIBLE]       = true

  const MapOptions = {}
  MapOptions[MapOpts.CENTER]                    = { lat: 37.5, lng: -120 }
  MapOptions[MapOpts.CLICKABLE_ICONS]           = false
  MapOptions[MapOpts.DISABLE_DOUBLE_CLICK_ZOOM] = false
  MapOptions[MapOpts.GESTURE_HANDLING]          = "auto"
  MapOptions[MapOpts.KEYBOARD_SHORTCUTS]        = true
  MapOptions[MapOpts.MAP_TYPE_CONTROL]          = false
  MapOptions[MapOpts.MAP_TYPE_ID]               = google.maps.MapTypeId.ROADMAP
  MapOptions[MapOpts.SCROLL_WHEEL]              = true
  MapOptions[MapOpts.STREET_VIEW_CONTROL]       = false
  MapOptions[MapOpts.ZOOM]                      = 6
  MapOptions[MapOpts.ZOOM_CONTROL]              = true

  const MarkerOptions = {}
  MarkerOptions[OvlOpts.CLICKABLE]     = true
  MarkerOptions[OvlOpts.CROSS_ON_DRAG] = true
  MarkerOptions[OvlOpts.DRAGGABLE]     = false
  MarkerOptions[OvlOpts.OPACITY]       = 1
  MarkerOptions[OvlOpts.OPTIMIZED]     = true
  MarkerOptions[OvlOpts.VISIBLE]       = true

  const PolygonOptions = {}
  PolygonOptions[OvlOpts.CLICKABLE]      = true
  PolygonOptions[OvlOpts.DRAGGABLE]      = false
  PolygonOptions[OvlOpts.EDITABLE]       = false
  PolygonOptions[OvlOpts.FILL_COLOR]     = "#2196f3"
  PolygonOptions[OvlOpts.FILL_OPACITY]   = 0.75
  PolygonOptions[OvlOpts.GEODESIC]       = false
  PolygonOptions[OvlOpts.STROKE_COLOR]   = "#000"
  PolygonOptions[OvlOpts.STROKE_OPACITY] = 0.75
  PolygonOptions[OvlOpts.STROKE_WEIGHT]  = 1
  PolygonOptions[OvlOpts.VISIBLE]        = true

  const PolylineOptions = {}
  PolylineOptions[OvlOpts.CLICKABLE]      = true
  PolylineOptions[OvlOpts.DRAGGABLE]      = false
  PolylineOptions[OvlOpts.EDITABLE]       = false
  PolylineOptions[OvlOpts.GEODESIC]       = false
  PolylineOptions[OvlOpts.STROKE_COLOR]   = "#000"
  PolylineOptions[OvlOpts.STROKE_OPACITY] = 0.75
  PolylineOptions[OvlOpts.STROKE_WEIGHT]  = 3
  PolylineOptions[OvlOpts.VISIBLE]        = true

  const RectangleOptions = {}
  RectangleOptions[OvlOpts.CLICKABLE]       = true
  RectangleOptions[OvlOpts.DRAGGABLE]       = false
  RectangleOptions[OvlOpts.EDITABLE]        = false
  RectangleOptions[OvlOpts.FILL_COLOR]      = "#2196f3"
  RectangleOptions[OvlOpts.FILL_OPACITY]    = 0.75
  RectangleOptions[OvlOpts.STROKE_COLOR]    = "#000"
  RectangleOptions[OvlOpts.STROKE_OPACITY]  = 0.75
  RectangleOptions[OvlOpts.STROKE_POSITION] = google.maps.StrokePosition.CENTER
  RectangleOptions[OvlOpts.STROKE_WEIGHT]   = 1
  RectangleOptions[OvlOpts.VISIBLE]         = true


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  GlobalSettings[Settings.CIRCLE_OPTIONS]    = CircleOptions
  GlobalSettings[Settings.DELIMITED_STRINGS] = false
  GlobalSettings[Settings.DELIMITER]         = Delimiter
  GlobalSettings[Settings.LABEL_OPTIONS]     = LabelOptions
  GlobalSettings[Settings.MAP_ID]            = "gmap"
  GlobalSettings[Settings.MAP_OPTIONS]       = MapOptions
  GlobalSettings[Settings.MARKER_OPTIONS]    = MarkerOptions
  GlobalSettings[Settings.ON_LOAD]           = function() {}
  GlobalSettings[Settings.POLYGON_OPTIONS]   = PolygonOptions
  GlobalSettings[Settings.POLYLINE_OPTIONS]  = PolylineOptions
  GlobalSettings[Settings.RECTANGLE_OPTIONS] = RectangleOptions
  GlobalSettings[Settings.URL_PRECISION]     = 5


  return GlobalSettings
})(gmap.settings || (gmap.settings = {}), Const.MapOptions, Const.OverlayOptions, Const.Settings)
