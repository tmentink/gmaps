
var Core = ((Core, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Core.geolocate = function(parms) {
    const map     = parms.map
    const options = $.extend({}, DefaultOptions, parms.options || {})

    if (window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        _addUpdateMarkers(map, center, options.showMarkers)

        return map.setOptions({
          center : center,
          zoom   : options.zoom
        })
      }, _error, options)
    }
    else {
      return false
    }
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

  function _addUpdateMarkers(map, position, showMarkers) {
    if (showMarkers === true && _markerExists(map) === false) {
      map.add(ComponentType.MARKER, [
        _getMarkerOptions(MarkerIds[1], position),
        _getMarkerOptions(MarkerIds[0], position)
      ])
    }

    map.markers(MarkerIds).setOptions({
      position : position,
      visible  : showMarkers
    })
  }

  function _error(error) {
    return Util.throwError({
      method  : "geoLocate",
      message : error.message
    })
  }

  function _getMarkerOptions(id, position) {
    return {
      id       : id,
      position : position,
      icon     : IconOptions[id]
    }
  }

  function _markerExists(map) {
    const markers = map.components[ComponentType.MARKER]
    return markers.includes(MarkerIds[0]) === true ||
           markers.includes(MarkerIds[1]) === true
  }


  return Core
})(Core || (Core = {}), Const.ComponentType)
