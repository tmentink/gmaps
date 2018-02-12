// ------------------------------------------------------------------------
// gmaps: util/is/googleClasses.js
// ------------------------------------------------------------------------

var Is = ((Is, Google) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  Is.LatLng = function(val) {
    return val instanceof google.maps[Google.LAT_LNG]
  }

  Is.LatLngBounds = function(val) {
    return val instanceof google.maps[Google.LAT_LNG_BOUNDS]
  }

  Is.MVCArray = function(val) {
    return val instanceof google.maps[Google.MVC_ARRAY]
  }


  return Is
})(Is || (Is = {}), Const.GoogleClasses)
