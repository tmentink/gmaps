// ------------------------------------------------------------------------
// gmaps: overlays/labelArray.js
// ------------------------------------------------------------------------

var Overlays = ((Overlays, OverlayType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class LabelArray extends Overlays.BaseOverlayArray {

    constructor(parms) {
      super({
        map       : parms.map,
        type      : OverlayType.LABEL_ARRAY
      })
    }


    // --------------------------------------------------------------------
    // Public Methods
    // --------------------------------------------------------------------

    getPosition() {
      return Core.getCoordinates({
        compArray : this,
        ids       : this.getIds()
      })
    }

    getPositionString() {
      return Core.getCoordinates({
        compArray : this,
        stringify : true,
        ids       : this.getIds()
      })
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Overlays.LabelArray = LabelArray

  return Overlays
})(Overlays || (Overlays = {}), Const.OverlayType)
