// ------------------------------------------------------------------------
// GMaps: settings.js
// ------------------------------------------------------------------------

!((Settings) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Global Settings
  // ----------------------------------------------------------------------

  Settings.DelimitedStrings = true

  Settings.Delimiter = {
    LatLng      : "|",
    LatLngArray : "~"
  }

  Settings.LabelOptions = {
    align        : "center",
    fontColor    : "#000",
    fontSize     : 14,
    strokeColor  : "#FFF",
    strokeWeight : 1,
    visible      : true
  }

  Settings.MapId = "gmap"

  Settings.MapOptions = {
    center            : { lat: 37.5, lng: -120 },
    clickableIcons    : false,
    draggable         : true,
    gestureHandling   : "auto",
    mapTypeControl    : false,
    mapTypeId         : google.maps.MapTypeId.ROADMAP,
    streetViewControl : false,
    zoom              : 6
  }

  Settings.MarkerOptions = {
    clickable : true,
    draggable : false,
    opacity   : 1,
    visible   : true
  }

  Settings.PolygonOptions = {
    clickable     : true,
    editable      : false,
    draggable     : false,
    fillColor     : "#2185D0",
    fillOpacity   : 0.8,
    geodesic      : false,
    strokeColor   : "#000",
    strokeOpacity : 0.8,
    strokeWeight  : 1,
    visible       : true
  }

  Settings.UrlPrecision = 5


  return Settings
})(gmap.Settings || (gmap.Settings = {}))
