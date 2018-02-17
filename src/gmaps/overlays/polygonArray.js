
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
        compArray : this,
        ids       : this.getIds(),
        index     : index
      })
    }

    getPathString(index) {
      return Core.getCoordinates({
        compArray : this,
        stringify : true,
        ids       : this.getIds(),
        index     : index
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

  Overlays.PolygonArray = PolygonArray


  return Overlays
})(Overlays || (Overlays = {}), Const.OverlayTypes)
