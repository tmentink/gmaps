// ------------------------------------------------------------------------
// gmaps: util/convert/toString.js
// ------------------------------------------------------------------------

var Convert = ((Convert, Setting) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const Conversions = {
    LatLng: function(p) {
      return p.delimitedStrings
        ? toDelimited(p)
        : toJSON(p)
    },
    MVCArray: function (p) {
      if (Is.MVCArray(p.val.getAt(0))) {
        return Conversions.NestedMVCArray(p)
      }

      return p.delimitedStrings
        ? toDelimited(p)
        : toJSON(p)
    },
    NestedMVCArray: function (p) {
      return p.delimitedStrings
        ? toMultiDelimited(p)
        : toMultiJSON(p)
    }
  }


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  // map {gmap}
  // val {googleObject}
  Convert.toString = function(p) {  
    p.delimitedStrings = p.map.settings[Setting.DELIMITED_STRINGS]
    p.urlPrecision     = p.map.settings[Setting.URL_PRECISION]
    return Conversions[Get.googleClass(p.val)](p)
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function toDelimited(p) {
    let str = ""

    p.val.forEach(function(el, i) {
      if (i > 0) str += p.map.settings[Setting.DELIMITER].latLng
      str += el.toUrlValue(p.digits)
    })

    return str
  }

  function toJSON(p) {
    p.val = p.val.getArray()
    
    return JSON.stringify(p.val, function(key, val) {
      return (key === "lat" || key === "lng")
        ? Number(val.toFixed(p.digits))
        : val
    })
  }

  function toMultiDelimited(p) {
    let str = ""

    p.val.forEach(function(el, i) {
      if (i > 0) str += p.map.settings[Setting.DELIMITER].latLngArray
      str += toDelimited({
        map : p.map,
        val :
      })
    })

    return str
  }

  function toMultiJSON(p) {
    const arr = []

    p.val.forEach(function(el) {
      arr.push(el.getArray())
    })

    return toJSON({
      map : p.map,
      val : arr
    })
  }


  return Convert
})(Convert || (Convert = {}), Const.Setting)
