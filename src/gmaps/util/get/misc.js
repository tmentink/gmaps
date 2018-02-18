
var Get = ((Get) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Get.googleClass = function(obj) {
    return Object.keys(Const.GoogleClasses)
      .find(className => obj instanceof google.maps[className])
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
