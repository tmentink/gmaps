// ------------------------------------------------------------------------
// gmaps: util/get/misc.js
// ------------------------------------------------------------------------

var Get = ((Get) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  // map      {gmap}
  // ovlArray {overlayArray}
  // type     {string}
  Get.newOverlayArray = function(p) {
    let map  = p.map
    let type = `${p.type}Array`

    if (p.ovlArray != null) {
      map  = p.ovlArray.map
      type = p.ovlArray.type
    }

    return new Overlays[type]({ map: map })
  }


  return Get
})(Get || (Get = {}))
