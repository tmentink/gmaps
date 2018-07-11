
var Overlays = ((Overlays, OverlayTypes) => {
  "use strict"


  class PolygonArray extends Overlays.BaseOverlayArray {

    constructor({map}) {
      super({
        map  : map,
        type : OverlayTypes.POLYGON_ARRAY
      })
    }


    // --------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------

    getPath(index) {
      return Core.getCoordinates({
        index    : index,
        ovlArray : this
      })
    }

    getPathString(index) {
      return Core.getCoordinates({
        index     : index,
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

  Overlays.PolygonArray = PolygonArray


  return Overlays
})(Overlays || (Overlays = {}), Const.OverlayTypes)
