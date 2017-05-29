// ------------------------------------------------------------------------
// GMaps: components/labelArray.js
// ------------------------------------------------------------------------

!((gmap, Core, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class LabelArray extends gmap.BaseComponentArray {

    constructor(map) {
      super(map, ComponentType.LABEL_ARRAY, ComponentType.LABEL)
    }


    // --------------------------------------------------------------------
    // Public Methods
    // --------------------------------------------------------------------

    getPosition() {
      return Core.getPosition(this, this.getIds())
    }

    getPositionString() {
      return Core.getPosition(this, this.getIds(), true)
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  gmap.LabelArray = LabelArray

  return gmap
})(gmap, gmap.Core, gmap.Const.ComponentType)
