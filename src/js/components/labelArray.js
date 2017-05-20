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

  }

  gmap.LabelArray = LabelArray

  return gmap
})(gmap || {})
