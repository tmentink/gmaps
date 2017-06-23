// ------------------------------------------------------------------------
// GMaps: config.js
// ------------------------------------------------------------------------

!((Config) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Configuration Options
  // ----------------------------------------------------------------------

  Config.DelimitedStrings = true

  Config.Delimiter = {
    LatLng      : "|",
    LatLngArray : "~"
  }

  Config.LabelOptions = {
    align        : "center",
    fontColor    : "#000",
    fontSize     : 14,
    strokeColor  : "#FFF",
    strokeWeight : 1,
    visible      : true
  }

  Config.MapId = "gmap"

  Config.MapOptions = {
    center            : { lat: 37.5, lng: -120 },
    clickableIcons    : false,
    draggable         : true,
    gestureHandling   : "auto",
    mapTypeControl    : false,
    mapTypeId         : google.maps.MapTypeId.ROADMAP,
    streetViewControl : false,
    zoom              : 6
  }

  Config.MarkerOptions = {
    clickable : true,
    draggable : false,
    opacity   : 1,
    visible   : true
  }

  Config.PolygonOptions = {
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

  Config.UrlPrecision = 5


  return Config
})(gmap.Config || (gmap.Config = {}))
