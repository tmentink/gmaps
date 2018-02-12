// ------------------------------------------------------------------------
// gmaps: util/get/misc.js
// ------------------------------------------------------------------------

var Get = ((Get) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  // obj {object}
  Get.googleClass = function(obj) {
    return Object.keys(Const.GoogleClasses)
      .find(className => obj instanceof google.maps[className])
  }

  // map      {gmap}
  // ovlArray {overlayArray}
  // type     {string}
  Get.newOverlayArray = function(p) {
    let map  = p.map
    let type = `${p.type}Array`

    if (p.ovlArray !== undefined) {
      map  = p.ovlArray.map
      type = p.ovlArray.type
    }

    return new Overlays[type]({ map: map })
  }


  return Get
})(Get || (Get = {}))
