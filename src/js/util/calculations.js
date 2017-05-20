// ------------------------------------------------------------------------
// GMaps: calculations.js
// ------------------------------------------------------------------------

!((Util) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  Util.getDestinationPoint = function(latLng, bearing, distance) {
    bearing = bearing.toRad()
    distance = distance / 6371

    const src_lat = latLng.lat().toRad()
    const src_lng = latLng.lng().toRad()

    const dest_lat = Math.asin(Math.sin(src_lat) * Math.cos(distance) +
                               Math.cos(src_lat) * Math.sin(distance) *
                               Math.cos(bearing))

    const dest_lng = src_lng + Math.atan2(Math.sin(bearing) * Math.sin(distance) * Math.cos(src_lat),
                                          Math.cos(distance) - Math.sin(src_lat) * Math.sin(dest_lat))

    if (isNaN(src_lng) || isNaN(dest_lng)) {
      return null
    }

    return new google.maps.LatLng(dest_lat.toDeg(), dest_lng.toDeg())
  }


  return Util
})(gmap.Util || (gmap.Util = {}))
