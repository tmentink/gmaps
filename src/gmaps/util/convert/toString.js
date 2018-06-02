
var Convert = ((Convert, Settings, GoogleClasses) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Convert.toString = function({map, val}) {
    const args     = arguments[0]
    args.delimited = map.settings[Settings.DELIMITED_STRINGS]
    args.precision = map.settings[Settings.URL_PRECISION]

    return Conversions[Get.googleClass(val)](args)
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------

  const Conversions = {
    LatLng({map, val, delimited}) {
      const args = arguments[0]
      return delimited
        ? toDelimited(args)
        : toJSON(args)
    },
    MVCArray ({map, val, delimited}) {
      const args = arguments[0]
      if (Is.MVCArray(val.getAt(0))) {
        return Conversions.NestedMVCArray(args)
      }

      return delimited
        ? toDelimited(args)
        : toJSON(args)
    },
    NestedMVCArray ({map, val, delimited}) {
      const args = arguments[0]
      return delimited
        ? toMultiDelimited(args)
        : toMultiJSON(args)
    }
  }

  function toDelimited({map, val, precision}) {
    let str = ""

    if (Is.MVCArray(val)) {
      val.forEach(function(el, i) {
        if (i > 0) str += map.settings[Settings.DELIMITER].latLng
        str += el.toUrlValue(precision)
      })
    }
    else {
      str += val.toUrlValue(precision)
    }

    return str
  }

  function toJSON({map, val, precision}) {
    if (Is.MVCArray(val)) val = val.getArray()

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
      if (i > 0) str += map.settings[Settings.DELIMITER].latLngArray
      args.val = el
      str += toDelimited(args)
    })

    return str
  }

  function toMultiJSON({map, val, precision}) {
    const args = arguments[0]
    const arr  = new google.maps[GoogleClasses.MVC_ARRAY]

    val.forEach(function(el) {
      arr.push(el.getArray())
    })

    args.val = arr
    return toJSON(args)
  }


  return Convert
})(Convert || (Convert = {}), Const.Settings, Const.GoogleClasses)
