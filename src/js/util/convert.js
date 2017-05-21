// ------------------------------------------------------------------------
// GMaps: convert.js
// ------------------------------------------------------------------------

!((Util, Config) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const Conversions = {
    center: function(parms) {
      if ($.type(parms.center) == "string") {
        parms.center = Util.toLatLng(parms.center)
      }
    },
    paths: function(parms) {
      if ($.type(parms.paths) == "string") {
        parms.paths = Util.toLatLngArray(parms.paths)
      }
    },
    position: function(parms) {
      if ($.type(parms.position) == "string") {
        parms.position = Util.toLatLng(parms.position)
      }
    },
    text: function(parms) {
      parms.text = parms.text || parms.id
    }
  }

  const ConvertableComponentOptions = {
    Label: {
      position: Conversions.position,
      text:     Conversions.text
    },
    Map: {
      center:   Conversions.center
    },
    Marker: {
      position: Conversions.position
    },
    Polygon: {
      paths:    Conversions.paths
    }
  }


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  Util.convertCompOptions = function(type, parms) {
    type = type.replace("Array", "")

    Object.keys(ConvertableComponentOptions[type]).forEach(function(key) {
      ConvertableComponentOptions[type][key](parms)
    })

    return parms
  }

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

  Util.toLatLng = function(str) {
    const points = str.split(",")
    return new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]))
  }

  Util.toLatLngArray = function(str) {
    const latLngArray = []
    const coordPairs = str.split(Config.Delimiter.LatLng || "|")

    for (var i = 0, i_end = coordPairs.length; i < i_end; i++) {
      latLngArray.push(Util.toLatLng(coordPairs[i]))
    }
    return latLngArray
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
