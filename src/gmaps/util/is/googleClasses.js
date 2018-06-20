
var Is = ((Is, Google) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Is.LatLng = function(val) {
    return val instanceof google.maps[Google.LAT_LNG]
  }

  Is.LatLngBounds = function(val) {
    return val instanceof google.maps[Google.LAT_LNG_BOUNDS]
  }

  Is.LatLngBoundsLiteral = function(val) {
    // eslint-disable-next-line eqeqeq
    return val != null &&
           Object.keys(val).length === 4 &&
           val.hasOwnProperty("north") &&
           val.hasOwnProperty("south") &&
           val.hasOwnProperty("east") &&
           val.hasOwnProperty("west")
  }

  Is.LatLngLiteral = function(val) {
    // eslint-disable-next-line eqeqeq
    return val != null &&
           Object.keys(val).length === 2 &&
           val.hasOwnProperty("lat") &&
           val.hasOwnProperty("lng")
  }

  Is.MVCArray = function(val) {
    return val instanceof google.maps[Google.MVC_ARRAY]
  }


  return Is
})(Is || (Is = {}), Const.GoogleClasses)
