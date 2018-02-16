// ------------------------------------------------------------------------
// gmaps: overlays/labelArray.js
// ------------------------------------------------------------------------

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
})(Overlays || (Overlays = {}), Const.OverlayTypes)
