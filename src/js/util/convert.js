// ------------------------------------------------------------------------
// gmaps: util/convert.js
// ------------------------------------------------------------------------

var Util = ((Util, Settings) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Util.toArray = function(val) {
    if ($.isArray(val) === false) {
      return [val]
    }

    return val
  }

  Util.toLatLng = function(val) {
    if ($.type(val) === "string") {
      return Settings.delimitedStrings ? _strToLatLng(val) : JSON.parse(val)
    }

    return val
  }

  Util.toLatLngArray = function(val) {
    if ($.type(val) === "string") {
      return Settings.delimitedStrings ? _strToLatLngArray(val) : JSON.parse(val)
    }

    return val
  }

  Util.toString = function(val) {
    if (val instanceof google.maps.LatLng) {
      return Settings.delimitedStrings ?
        val.toUrlValue(Settings.urlPrecision) :
        JSON.stringify(val)
    }

    if (val instanceof google.maps.MVCArray) {
      if (val.getAt(0) instanceof google.maps.MVCArray) {
        return Settings.delimitedStrings ?
          _toMultiDelimitedString(val) :
          _toMultiJSONString(val)
      }
      else {
        return Settings.delimitedStrings ?
          _toDelimitedString(val) :
          JSON.stringify(val.getArray())
      }
    }

    return undefined
  }

  Util.toLowerCase = function(val) {
    const regex = /\s+|\_+/g

    if ($.type(val) === "string") {
      return val.toLowerCase().replace(regex, "")
    }

    return undefined
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _strToLatLng(str) {
    const points = str.split(",")
    return new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]))
  }

  function _strToLatLngArray(str) {
    const latLngArray = []
    const coordPairs  = str.split(Settings.delimiter.latLng || "|")

    for (var i = 0, i_end = coordPairs.length; i < i_end; i++) {
      latLngArray.push(Util.toLatLng(coordPairs[i]))
    }
    return latLngArray
  }

  function _toDelimitedString(MVCArray) {
    let str = ""

    MVCArray.forEach(function(el, i) {
      if (i > 0) {
        str += Settings.delimiter.latLng || "|"
      }
      str += el.toUrlValue(Settings.urlPrecision || 6)
    })

    return str
  }

  function _toMultiDelimitedString(MVCArray) {
    let str = ""

    MVCArray.forEach(function(el, i) {
      if (i > 0) {
        str += Settings.delimiter.latLngArray || "~"
      }
      str += _toDelimitedString(el)
    })

    return str
  }

  function _toMultiJSONString(MVCArray) {
    let arr = []

    MVCArray.forEach(function(el) {
      arr.push(el.getArray())
    })

    return JSON.stringify(arr)
  }


  return Util
})(Util || (Util = {}), gmap.settings)
