// ------------------------------------------------------------------------
// gmaps: util/get/misc.js
// ------------------------------------------------------------------------

var Get = ((Get) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Functions
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

    return new Overlays[type]({ map: map })
  }


  return Get
})(Get || (Get = {}))
