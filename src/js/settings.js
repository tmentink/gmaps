// ------------------------------------------------------------------------
// gmaps: settings.js
// ------------------------------------------------------------------------

!((Settings) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Global Settings
  // ----------------------------------------------------------------------

  Settings.delimitedStrings = true

  Settings.delimiter = {
    latLng      : "|",
    latLngArray : "~"
  }

  Settings.labelOptions = {
    align        : "center",
    fontColor    : "#000",
    fontSize     : 14,
    strokeColor  : "#FFF",
    strokeWeight : 1,
    visible      : true
  }

  Settings.mapId = "gmap"

  Settings.mapOptions = {
    center            : { lat: 37.5, lng: -120 },
    clickableIcons    : false,
    draggable         : true,
    gestureHandling   : "auto",
    mapTypeControl    : false,
    mapTypeId         : google.maps.MapTypeId.ROADMAP,
    streetViewControl : false,
    zoom              : 6
  }

  Settings.markerOptions = {
    clickable : true,
    draggable : false,
    opacity   : 1,
    visible   : true
  }

  Settings.polygonOptions = {
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

  Settings.urlPrecision = 5


  return Settings
})(gmap.settings || (gmap.settings = {}))
