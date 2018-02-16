// ------------------------------------------------------------------------
// gmaps: overlays/circleArray.js
// ------------------------------------------------------------------------

var Overlays = ((Overlays, OverlayTypes) => {
  "use strict"


  class RectangleArray extends Overlays.BaseOverlayArray {

    constructor({map}) {
      super({
        map  : map,
        type : OverlayTypes.RECTANGLE_ARRAY
      })
    }


    // --------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------

    off(type) {
      return Core.removeListener({
        compArray : this,
        ids       : this.getIds(),
        type      : type
      })
    }

    on(type, func) {
      return Core.addListener({
        compArray : this,
        func      : func,
        ids       : this.getIds(),
        type      : type
      })
    }

    trigger(type) {
      return Core.triggerListener({
        compArray : this,
        ids       : this.getIds(),
        type      : type
      })
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Overlays.RectangleArray = RectangleArray


  return Overlays
})(Overlays || (Overlays = {}), Const.OverlayTypes)
