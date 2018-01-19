// ------------------------------------------------------------------------
// gmaps: overlays/polylineArray.js
// ------------------------------------------------------------------------

var Overlays = ((Overlays, OverlayType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class PolylineArray extends Overlays.BaseOverlayArray {

    constructor(parms) {
      super({
        map       : parms.map,
        type      : OverlayType.POLYLINE_ARRAY
      })
    }


    // --------------------------------------------------------------------
    // Public Methods
    // --------------------------------------------------------------------

    getPath() {
      return Core.getCoordinates({
        compArray : this,
        ids       : this.getIds()
      })
    }

    getPathString() {
      return Core.getCoordinates({
        compArray : this,
        stringify : true,
        ids       : this.getIds()
      })
    }

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

  Overlays.PolylineArray = PolylineArray

  return Overlays
})(Overlays || (Overlays = {}), Const.OverlayType)
