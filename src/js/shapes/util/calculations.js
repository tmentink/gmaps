// ------------------------------------------------------------------------
// GMaps: shapes/util/calculations.js
// ------------------------------------------------------------------------

var Util = ((Util) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Util.getDestinationPoint = function(parms) {
    const bearing  = _toRad(parms.bearing)
    const distance = parms.distance / 6371
    const latLng   = parms.latLng
    const src_lat  = _toRad(latLng.lat())
    const src_lng  = _toRad(latLng.lng())

    const dest_lat = Math.asin(Math.sin(src_lat) * Math.cos(distance) +
                               Math.cos(src_lat) * Math.sin(distance) *
                               Math.cos(bearing))

    const dest_lng = src_lng + Math.atan2(Math.sin(bearing) * Math.sin(distance) * Math.cos(src_lat),
                                          Math.cos(distance) - Math.sin(src_lat) * Math.sin(dest_lat))

    if (isNaN(src_lng) || isNaN(dest_lng)) {
      return null
    }

    return new google.maps.LatLng(_toDeg(dest_lat), _toDeg(dest_lng))
  }

  Util.getSizeFromZoom = function(zoom) {
    const minZoom = 5
    const size    = 500
    return zoom <= minZoom ? size : size / Math.pow(2, zoom - minZoom)
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _toRad(val) {
    return val * Math.PI / 180
  }

  function _toDeg(val) {
    return val * 180 / Math.PI
  }


  return Util
})(Util || (Util = {}))
