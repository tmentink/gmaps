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
    center                 : { lat: 37.5, lng: -120 },
    clickableIcons         : false,
    disableDoubleClickZoom : false,
    gestureHandling        : "auto",
    keyboardShortcuts      : true,
    mapTypeControl         : false,
    mapTypeId              : google.maps.MapTypeId.ROADMAP,
    scrollwheel            : true,
    streetViewControl      : false,
    zoom                   : 6,
    zoomControl            : false
  }

  Settings.markerOptions = {
    clickable   : true,
    crossOnDrag : true,
    draggable   : false,
    opacity     : 1,
    optimized   : true,
    visible     : true
  }

  Settings.polygonOptions = {
    clickable     : true,
    draggable     : false,
    editable      : false,
    fillColor     : "#2185D0",
    fillOpacity   : 0.75,
    geodesic      : false,
    strokeColor   : "#000",
    strokeOpacity : 0.75,
    strokeWeight  : 1,
    visible       : true
  }

  Settings.urlPrecision = 5


  return Settings
})(gmap.settings || (gmap.settings = {}))
