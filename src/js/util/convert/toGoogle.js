// ------------------------------------------------------------------------
// gmaps: util/convert/toGoogle.js
// ------------------------------------------------------------------------

var Convert = ((Convert, Setting) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  // map {gmap}
  // val {string}
  Convert.toLatLng = function(p) {
    if (Is.LatLng(p.val)) return p.val

    if ($.type(p.val) === "string") {
      return p.map.settings[Setting.DELIMITED_STRINGS]
        ? strToLatLng(p.val)
        : JSON.parse(p.val)
    }
  }

  // map {gmap}
  // val {string}
  Convert.toLatLngArray = function(p) {
    if (Is.MVCArray(p.val)) return p.val

    if ($.type(p.val) === "string") {
      return p.map.settings[Setting.DELIMITED_STRINGS]
        ? strToLatLngArray(p)
        : JSON.parse(p.val)
    }
  }

  // map {gmap}
  // val {string}
  Convert.toLatLngBounds = function(p) {
    if (Is.LatLngBounds(p.val)) return p.val

    if ($.type(p.val) === "string") {
      return p.map.settings[Setting.DELIMITED_STRINGS]
        ? strToLatLngBounds(p)
        : JSON.parse(p.val)
    }
  }

  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function strToLatLng(str) {
    const points = str.split(",")
    return new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]))
  }

  function strToLatLngArray(p) { 
    const delimiter   = p.map.settings[Settings.DELIMITER].latLng
    const latLngs     = p.val.split(delimiter)
    const latLngArray = []

    for (var i = 0, i_end = latLngs.length; i < i_end; i++) {
      latLngArray.push(strToLatLng(latLngs[i]))
    }

    return latLngArray
  }

  function strToLatLngBounds(p) {
    const delimiter  = p.map.settings[Settings.DELIMITER].latLngBounds
    const latLngs    = p.val.split(delimiter)

    return {
      north : Number(latLngs[0]),
      east  : Number(latLngs[1]),
      south : Number(latLngs[2]),
      west  : Number(latLngs[3])
    }
  }


  return Convert
})(Convert || (Convert = {}), Const.Setting)
