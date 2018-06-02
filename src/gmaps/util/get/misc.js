
var Get = ((Get) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Get.googleClass = function(obj) {
    const key = Object.keys(Const.GoogleClasses)
      .find(k => obj instanceof google.maps[Const.GoogleClasses[k]])

    return Const.GoogleClasses[key]
  }

  Get.newOverlayArray = function({map, ovlArray, type}) {
    type = `${type}Array`

    if (ovlArray !== undefined) {
      map  = ovlArray.map
      type = ovlArray.type
    }

    return new Overlays[type]({map: map})
  }

  Get.type = function(val) {
    return Object.prototype.toString.call(val)
      .replace(/^\[object (.+)\]$/, "$1").toLowerCase()
  }


  return Get
})(Get || (Get = {}))
