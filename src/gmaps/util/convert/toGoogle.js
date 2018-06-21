
var Convert = ((Convert, GoogleClasses, Settings) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Convert.toLatLng = function({map, val}) {
    if (Is.LatLng(val)) return val

    if (Is.String(val)) {
      if (map.settings[Settings.DELIMITED_STRINGS]) {
        return strToLatLng(val)
      }

      val = JSON.parse(val)
    }

    if (Is.LatLngLiteral(val)) {
      return new google.maps[GoogleClasses.LAT_LNG](val.lat, val.lng)
    }
  }

  Convert.toLatLngArray = function({map, val}) {
    if (Is.Array(val)) return val

    if (Is.String(val)) {
      return map.settings[Settings.DELIMITED_STRINGS]
        ? strToLatLngArray(arguments[0])
        : JSON.parse(val)
    }

    if (Is.MVCArray(val)) {
      const val0 = val.getAt(0)
      return Is.MVCArray(val0)
        ? val0.getArray()
        : val0
    }
  }

  Convert.toLatLngBounds = function({map, val}) {
    if (Is.LatLngBounds(val)) return val

    if (Is.String(val)) {
      if (map.settings[Settings.DELIMITED_STRINGS]) {
        return strToLatLngBounds(arguments[0])
      }

      val = JSON.parse(val)
    }

    if (Is.LatLngBoundsLiteral(val)) {
      return objToLatLngBounds(val)
    }
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------

  function objToLatLngBounds(obj) {
    const ne = {
      lat : obj.north,
      lng : obj.east
    }
    const sw = {
      lat : obj.south,
      lng : obj.west
    }

    return new google.maps[GoogleClasses.LAT_LNG_BOUNDS](sw, ne)
  }

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

    return objToLatLngBounds({
      north : Number(latLngs[0]),
      east  : Number(latLngs[1]),
      south : Number(latLngs[2]),
      west  : Number(latLngs[3])
    })
  }


  return Convert
})(Convert || (Convert = {}), Const.GoogleClasses, Const.Settings)
