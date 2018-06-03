
var Core = ((Core, OverlayTypes) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Core.geolocate = function({map, options={}}) {
    if (!window.navigator.geolocation) return false

    options = Util.extend({}, DefaultOptions, options)

    navigator.geolocation.getCurrentPosition((position) => {
      const center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      addUpdateMarkers(map, center, options.showMarkers)

      return map.setOptions({
        center : center,
        zoom   : options.zoom
      })
    }, error, options)
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------

  const DefaultOptions = {
    enableHighAccuracy : false,
    showMarkers        : true,
    zoom               : 12
  }

  const IconOptions = {
    "geolocate_inner": {
      fillColor     : "#2196f3",
      fillOpacity   : 1.0,
      path          : google.maps.SymbolPath.CIRCLE,
      scale         : 8.0,
      strokeColor   : "#FFF",
      strokeOpacity : 1.0,
      strokeWeight  : 2.0
    },
    "geolocate_outer": {
      fillColor     : "#2196f3",
      fillOpacity   : .5,
      path          : google.maps.SymbolPath.CIRCLE,
      scale         : 16.0,
      strokeOpacity : 0,
    }
  }

  const MarkerIds = [
    "geolocate_inner",
    "geolocate_outer"
  ]

  function addUpdateMarkers(map, position, showMarkers) {
    if (showMarkers === true && markerExists(map) === false) {
      map.addOverlay(OverlayTypes.MARKER, [
        getMarkerOptions(MarkerIds[1], position),
        getMarkerOptions(MarkerIds[0], position)
      ])
    }

    map.markers(MarkerIds).setOptions({
      position : position,
      visible  : showMarkers
    })
  }

  function error(error) {
    return Error.throw({
      method : "geoLocate",
      msg    : error.message
    })
  }

  function getMarkerOptions(id, position) {
    return {
      id       : id,
      position : position,
      icon     : IconOptions[id]
    }
  }

  function markerExists(map) {
    const markers = map.overlays[OverlayTypes.MARKER]
    return markers.includes(MarkerIds[0]) === true ||
           markers.includes(MarkerIds[1]) === true
  }


  return Core
})(Core || (Core = {}), Const.OverlayTypes)
