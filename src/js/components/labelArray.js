// ------------------------------------------------------------------------
// GMaps: labelArray.js
// ------------------------------------------------------------------------

!((gmap) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const Type = gmap.Const.Component.Type


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class LabelArray extends gmap.BaseComponentArray {

    constructor(map) {
      super(map, Type.LABEL_ARRAY, Type.LABEL)
    }

  }

  gmap.LabelArray = LabelArray

  return gmap
})(gmap || {})
