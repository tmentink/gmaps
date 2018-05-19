
var Overlays = ((Overlays, OverlayTypes) => {
  "use strict"


  class CircleArray extends Overlays.BaseOverlayArray {

    constructor({map}) {
      super({
        map  : map,
        type : OverlayTypes.CIRCLE_ARRAY
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

  Overlays.CircleArray = CircleArray


  return Overlays
})(Overlays || (Overlays = {}), Const.OverlayTypes)
