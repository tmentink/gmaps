// ------------------------------------------------------------------------
// GMaps: convert.js
// ------------------------------------------------------------------------

!((Util) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const Conversions = {
    center: function(parms) {
      if ($.type(parms.center) == "string") {
        parms.center = Util.toLatLng(parms.center)
      }
    }
  }

  const ConvertableShapeOptions = {
    Hexagon: {
      center: Conversions.center
    },
    Pentagon: {
      center: Conversions.center
    },
    Rectangle: {
      center: Conversions.center
    },
    Square: {
      center: Conversions.center
    },
    Triangle: {
      center: Conversions.center
    }
  }


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  Util.convertShapeOptions = function(type, parms) {
    Object.keys(ConvertableShapeOptions[type]).forEach(function(key) {
      ConvertableShapeOptions[type][key](parms)
    })

    return parms
  }


  return Util
})(gmap.Util || (gmap.Util = {}))
