
var Overlays = ((Overlays, OverlayTypes) => {
  "use strict"


  class MarkerArray extends Overlays.BaseOverlayArray {

    constructor({map}) {
      super({
        map  : map,
        type : OverlayTypes.MARKER_ARRAY
      })
    }


    // --------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------

    getPosition() {
      return Core.getCoordinates({
        ovlArray : this
      })
    }

    getPositionString() {
      return Core.getCoordinates({
        ovlArray  : this,
        stringify : true
      })
    }

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

  Overlays.MarkerArray = MarkerArray


  return Overlays
})(Overlays || (Overlays = {}), Const.OverlayTypes)
