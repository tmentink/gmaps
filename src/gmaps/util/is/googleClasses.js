
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
    return Object.keys(val).length === 4 &&
           val.hasOwnProperty("north") &&
           val.hasOwnProperty("south") &&
           val.hasOwnProperty("east") &&
           val.hasOwnProperty("west")
  }

  Is.MVCArray = function(val) {
    return val instanceof google.maps[Google.MVC_ARRAY]
  }


  return Is
})(Is || (Is = {}), Const.GoogleClasses)
