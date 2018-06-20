
var Convert = ((Convert, GoogleClasses, Settings) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Convert.toLatLng = function({map, val}) {
    if (Is.LatLng(val) || Is.Object(val)) return val

    if (Is.String(val)) {
      return map.settings[Settings.DELIMITED_STRINGS]
        ? strToLatLng(val)
        : JSON.parse(val)
    }
  }

  Convert.toLatLngArray = function({map, val}) {
    if (Is.MVCArray(val) || Is.Array(val)) return val

    if (Is.String(val)) {
      return map.settings[Settings.DELIMITED_STRINGS]
        ? strToLatLngArray(arguments[0])
        : JSON.parse(val)
    }
  }

  Convert.toLatLngBounds = function({map, val}) {
    if (Is.LatLngBounds(val) || Is.Object(val)) return val

    if (Is.String(val)) {
      return map.settings[Settings.DELIMITED_STRINGS]
        ? strToLatLngBounds(arguments[0])
        : JSON.parse(val)
    }
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------

  function strToLatLng(str) {
    const points = str.split(",")
    const lat    = parseFloat(points[0])
    const lng    = parseFloat(points[1])

    return new google.maps[GoogleClasses.LAT_LNG](lat, lng)
  }

  function strToLatLngArray({map, val}) {
    const delimiter   = map.settings[Settings.DELIMITER].latLng
    const latLngs     = val.split(delimiter)
    const latLngArray = []

    for (var i = 0, i_end = latLngs.length; i < i_end; i++) {
      latLngArray.push(strToLatLng(latLngs[i]))
    }

    return latLngArray
  }

  function strToLatLngBounds({map, val}) {
    const delimiter = map.settings[Settings.DELIMITER].latLngBounds
    const latLngs   = val.split(delimiter)

    return {
      north : Number(latLngs[0]),
      east  : Number(latLngs[1]),
      south : Number(latLngs[2]),
      west  : Number(latLngs[3])
    }
  }


  return Convert
})(Convert || (Convert = {}), Const.GoogleClasses, Const.Settings)
