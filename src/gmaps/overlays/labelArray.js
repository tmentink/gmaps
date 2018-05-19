
var Overlays = ((Overlays, OverlayTypes) => {
  "use strict"


  class LabelArray extends Overlays.BaseOverlayArray {

    constructor({map}) {
      super({
        map  : map,
        type : OverlayTypes.LABEL_ARRAY
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

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Overlays.LabelArray = LabelArray


  return Overlays
})(Overlays || (Overlays = {}), Const.OverlayTypes)
