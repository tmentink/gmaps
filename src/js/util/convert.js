// ------------------------------------------------------------------------
// GMaps: util/convert.js
// ------------------------------------------------------------------------

var Util = ((Util, Config) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Util.toArray = function(val) {
    if ($.type(val) === "number") {
      val = val.toString().split()
    }
    else if ($.type(val) === "string") {
      val = val.split()
    }

    return val
  }

  Util.toLatLng = function(val) {
    if ($.type(val) === "string") {
      return Config.DelimitedStrings ? _strToLatLng(val) : JSON.parse(val)
    }

    return val
  }

  Util.toLatLngArray = function(val) {
    if ($.type(val) === "string") {
      return Config.DelimitedStrings ? _strToLatLngArray(val) : JSON.parse(val)
    }

    return val
  }

  Util.toString = function(val) {
    if (val instanceof google.maps.LatLng) {
      return Config.DelimitedStrings ?
        val.toUrlValue(Config.UrlPrecision) :
        JSON.stringify(val)
    }

    if (val instanceof google.maps.MVCArray) {
      if (val.getAt(0) instanceof google.maps.MVCArray) {
        return Config.DelimitedStrings ?
          _toMultiDelimitedString(val) :
          _toMultiJSONString(val)
      }
      else {
        return Config.DelimitedStrings ?
          _toDelimitedString(val) :
          JSON.stringify(val.getArray())
      }
    }

    return null
  }

  Util.toLowerCase = function(val) {
    const regex = /\s+|\_+/g
    return val.toLowerCase().replace(regex, "")
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
    const coordPairs  = str.split(Config.Delimiter.LatLng || "|")

    for (var i = 0, i_end = coordPairs.length; i < i_end; i++) {
      latLngArray.push(Util.toLatLng(coordPairs[i]))
    }
    return latLngArray
  }

  function _toDelimitedString(MVCArray) {
    let str = ""

    MVCArray.forEach(function(el, i) {
      if (i > 0) {
        str += Config.Delimiter.LatLng || "|"
      }
      str += el.toUrlValue(Config.UrlPrecision || 6)
    })

    return str
  }

  function _toMultiDelimitedString(MVCArray) {
    let str = ""

    MVCArray.forEach(function(el, i) {
      if (i > 0) {
        str += Config.Delimiter.LatLngArray || "~"
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
})(Util || (Util = {}), gmap.Config)
