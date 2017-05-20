// ------------------------------------------------------------------------
// GMaps: config.js
// ------------------------------------------------------------------------

!((gmap) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Configuration Options
  // ----------------------------------------------------------------------

  gmap.Config = {

    Delimiter: {
      LatLng: "|",
      LatLngArray: "~"
    },
    LabelOptions: {
      fontSize: 14,
      fontColor: "#000",
      strokeColor: "#FFF",
      strokeWeight: 1,
      align: "center"
    },
    MapId: "gmap",
    MapOptions: {
      zoom: 6,
      center: { lat: 37.5, lng: -120 },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      clickableIcons: false,
      mapTypeControl: false,
      streetViewControl: false
    },
    MarkerOptions: {

    },
    PolygonOptions: {
      strokeColor: "#000",
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: "#0275D8",
      fillOpacity: 0.8
    }

  }

  return gmap
})(gmap || {})
