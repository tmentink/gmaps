// ------------------------------------------------------------------------
// GMaps: config.js
// ------------------------------------------------------------------------

!((gmap) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Configuration Options
  // ----------------------------------------------------------------------

  gmap.Config = {

    Defaults: {
      Label: {
        fontSize: 14,
        fontColor: "#000",
        strokeColor: "#FFF",
        strokeWeight: 1,
        align: "center"
      },
      Map: {
        zoom: 6,
        center: { lat: 37.5, lng: -120 },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        clickableIcons: false,
        mapTypeControl: false,
        streetViewControl: false
      },
      Marker: {

      },
      Polygon: {
        strokeColor: "#000",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#0275D8",
        fillOpacity: 0.8
      }
    },
    Delimeter: {
      LatLng: ",",
      LatLngPair: "|"
    }

  }

  return gmap
})(gmap || {})
