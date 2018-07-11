
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
        ids      : this.getIds(),
        ovlArray : this,
        type     : type
      })
    }

    on(type, func) {
      return Core.addListener({
        func     : func,
        ids      : this.getIds(),
        ovlArray : this,
        type     : type
      })
    }

    one(type, func) {
      return Core.addListenerOnce({
        func     : func,
        ids      : this.getIds(),
        ovlArray : this,
        type     : type
      })
    }

    trigger(type) {
      return Core.triggerListener({
        ids      : this.getIds(),
        ovlArray : this,
        type     : type
      })
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Overlays.RectangleArray = RectangleArray


  return Overlays
})(Overlays || (Overlays = {}), Const.OverlayTypes)
