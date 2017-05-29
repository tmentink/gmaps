// ------------------------------------------------------------------------
// GMaps: util/convert.js
// ------------------------------------------------------------------------

!((Util, Config) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  Util.toArray = function(value) {
    if ($.type(value) == "number") {
      value = value.toString().split()
    }
    else if ($.type(value) == "string") {
      value = value.split()
    }

    return value
  }

  Util.toDelimitedString = function(obj) {
    if (obj instanceof google.maps.LatLng) {
      return obj.toUrlValue(Config.UrlPrecision)
    }

    if (obj instanceof google.maps.MVCArray) {
      if (obj.getAt(0) instanceof google.maps.MVCArray) {
        return _multiDelimitedString(obj)
      }
      else {
        return _delimitedString(obj)
      }
    }

    return null
  }

  Util.toLatLng = function(val) {
    if ($.type(val) == "string") {
      const points = val.split(",")
      return new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]))
    }

    return val
  }

  Util.toLatLngArray = function(val) {
    if ($.type(val) == "string") {
      const latLngArray = []
      const coordPairs = val.split(Config.Delimiter.LatLng || "|")

      for (var i = 0, i_end = coordPairs.length; i < i_end; i++) {
        latLngArray.push(Util.toLatLng(coordPairs[i]))
      }
      return latLngArray
    }

    return val
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _delimitedString(MVCArray) {
    let str = ""

    MVCArray.forEach(function(el, i) {
      if (i > 0) {
        str += Config.Delimiter.LatLng || "|"
      }
      str += el.toUrlValue(Config.UrlPrecision || 6)
    })

    return str
  }

  function _multiDelimitedString(MVCArray) {
    let str = ""

    MVCArray.forEach(function(el, i) {
      if (i > 0) {
        str += Config.Delimiter.LatLngArray || "~"
      }
      str += _delimitedString(el)
    })

    return str
  }


  return Util
})(gmap.Util || (gmap.Util = {}), gmap.Config)
