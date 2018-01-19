// ------------------------------------------------------------------------
// gmaps: util/convert.js
// ------------------------------------------------------------------------

var Convert = ((Convert, Setting) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const Delimiter = {
    latLng: function (map) {
      return map.settings[Setting.DELIMITER].latLng || "|"
    },
    latLngArray: function (map) {
      return map.settings[Setting.DELIMITER].latLngArray || "~"
    },
    latLngBounds: function (map) {
      return map.settings[Setting.DELIMITER].latLngBounds || "|"
    }
  }


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Convert.toArray = function(val) {
    if ($.isArray(val) === false) {
      return [val]
    }

    return val
  }

  Convert.toLatLng = function(parms) {
    const map = parms.map
    const val = parms.val

    if ($.type(val) === "string") {
      return _useDelimitedStrings(map) ? _strToLatLng(val, map) : JSON.parse(val)
    }

    return val
  }

  Convert.toLatLngArray = function(parms) {
    const map = parms.map
    const val = parms.val

    if ($.type(val) === "string") {
      return _useDelimitedStrings(map) ? _strToLatLngArray(val, map) : JSON.parse(val)
    }

    return val
  }

  Convert.toLatLngBounds = function(parms) {
    const map = parms.map
    const val = parms.val

    if ($.type(val) === "string") {
      return _useDelimitedStrings(map) ? _strToLatLngBounds(val, map) : JSON.parse(val)
    }

    return val
  }

  Convert.toLowerCase = function(val) {
    const regex = /\s+|\_+/g

    if ($.type(val) === "string") {
      return val.toLowerCase().replace(regex, "")
    }

    return undefined
  }

  Convert.toString = function(parms) {
    const map = parms.map
    const val = parms.val

    if (val instanceof google.maps.LatLng) {
      return _useDelimitedStrings(map) ?
        val.toUrlValue(_getUrlPrecision(map)) :
        _stringify(val, map)
    }

    if (val instanceof google.maps.MVCArray) {
      if (val.getAt(0) instanceof google.maps.MVCArray) {
        return _useDelimitedStrings(map) ?
          _toMultiDelimitedString(val, map) :
          _toMultiJSONString(val, map)
      }
      else {
        return _useDelimitedStrings(map) ?
          _toDelimitedString(val, map) :
          _stringify(val.getArray(), map)
      }
    }

    return undefined
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _getUrlPrecision(map) {
    return map.settings[Setting.URL_PRECISION] || 6
  }

  function _stringify(val, map) {
    return JSON.stringify(val, function(key, value) {
      if (key === "lat" || key === "lng") {
        return Number(value.toFixed(_getUrlPrecision(map)))
      }
      return value
    })
  }

  function _strToLatLng(str) {
    const points = str.split(",")
    return new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]))
  }

  function _strToLatLngArray(str, map) {
    const latLngArray = []
    const coordPairs  = str.split(Delimiter.latLng(map))

    for (var i = 0, i_end = coordPairs.length; i < i_end; i++) {
      latLngArray.push(Convert.toLatLng({
        map : map,
        val : coordPairs[i]
      }))
    }

    return latLngArray
  }

  function _strToLatLngBounds(str, map) {
    const coordPairs   = str.split(Delimiter.latLngBounds(map))

    return {
      north : Number(coordPairs[0]),
      east  : Number(coordPairs[1]),
      south : Number(coordPairs[2]),
      west  : Number(coordPairs[3])
    }
  }

  function _toDelimitedString(MVCArray, map) {
    let str = ""

    MVCArray.forEach(function(el, i) {
      if (i > 0) {
        str += Delimiter.latLng(map)
      }
      str += el.toUrlValue(_getUrlPrecision(map))
    })

    return str
  }

  function _toMultiDelimitedString(MVCArray, map) {
    let str = ""

    MVCArray.forEach(function(el, i) {
      if (i > 0) {
        str += Delimiter.latLngArray(map)
      }
      str += _toDelimitedString(el, map)
    })

    return str
  }

  function _toMultiJSONString(MVCArray, map) {
    let arr = []

    MVCArray.forEach(function(el) {
      arr.push(el.getArray())
    })

    return _stringify(arr, map)
  }

  function _useDelimitedStrings(map) {
    return map.settings[Setting.DELIMITED_STRINGS]
  }


  return Convert
})(Convert || (Convert = {}), Const.Setting)
