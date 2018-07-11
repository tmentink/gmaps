
var Overlays = ((Overlays, OverlayTypes) => {
  "use strict"


  class PolylineArray extends Overlays.BaseOverlayArray {

    constructor({map}) {
      super({
        map  : map,
        type : OverlayTypes.POLYLINE_ARRAY
      })
    }


    // --------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------

    getPath() {
      return Core.getCoordinates({
        ovlArray : this
      })
    }

    getPathString() {
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

  Overlays.PolylineArray = PolylineArray


  return Overlays
})(Overlays || (Overlays = {}), Const.OverlayTypes)
