
var Convert = ((Convert, Setting) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Convert.toString = function({map, val}) {
    const args     = arguments[0]
    args.delimited = map.settings[Setting.DELIMITED_STRINGS]
    args.precision = map.settings[Setting.URL_PRECISION]

    return Conversions[Get.googleClass(val)](args)
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------

  const Conversions = {
    LatLng: function({map, val, delimited}) {
      const args = arguments[0]
      return delimited
        ? toDelimited(args)
        : toJSON(args)
    },
    MVCArray: function ({map, val, delimited}) {
      const args = arguments[0]
      if (Is.MVCArray(val.getAt(0))) {
        return Conversions.NestedMVCArray(args)
      }

      return delimited
        ? toDelimited(args)
        : toJSON(args)
    },
    NestedMVCArray: function ({map, val, delimited}) {
      const args = arguments[0]
      return delimited
        ? toMultiDelimited(args)
        : toMultiJSON(args)
    }
  }

  function toDelimited({map, val, precision}) {
    let str = ""

    val.forEach(function(el, i) {
      if (i > 0) str += map.settings[Setting.DELIMITER].latLng
      str += el.toUrlValue(precision)
    })

    return str
  }

  function toJSON({map, val, precision}) {
    val = val.getArray()

    return JSON.stringify(val, (key, value) => {
      return (key === "lat" || key === "lng")
        ? Number(value.toFixed(precision))
        : value
    })
  }

  function toMultiDelimited({map, val, precision}) {
    const args = arguments[0]
    let str    = ""

    val.forEach(function(el, i) {
      if (i > 0) str += map.settings[Setting.DELIMITER].latLngArray
      args.val = el
      str += toDelimited(args)
    })

    return str
  }

  function toMultiJSON({map, val, precision}) {
    const args = arguments[0]
    const arr  = []

    val.forEach(function(el) {
      arr.push(el.getArray())
    })

    args.val = arr
    return toJSON(args)
  }


  return Convert
})(Convert || (Convert = {}), Const.Setting)
