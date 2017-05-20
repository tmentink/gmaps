// ------------------------------------------------------------------------
// GMaps: labelArray.js
// ------------------------------------------------------------------------

!((gmap) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class LabelArray extends gmap.BaseComponentArray {

    constructor(map) {
      super(map, gmap.Const.ComponentType.LABEL_ARRAY, gmap.Const.ComponentType.LABEL)
    }


    // --------------------------------------------------------------------
    // Public Methods
    // --------------------------------------------------------------------

    getPosition() {
      return gmap.Core.getPosition(this, this.getIds())
    }

    getPositionString() {
      return gmap.Core.getPosition(this, this.getIds(), true)
    }

  }

  gmap.LabelArray = LabelArray

  return gmap
})(gmap || {})
