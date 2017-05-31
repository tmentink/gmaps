// ------------------------------------------------------------------------
// GMaps: components/labelArray.js
// ------------------------------------------------------------------------

!((gmap, Core, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class LabelArray extends gmap.BaseComponentArray {

    constructor(parms) {
      super({
        childType : ComponentType.LABEL,
        map       : parms.map,
        type      : ComponentType.LABEL_ARRAY
      })
    }


    // --------------------------------------------------------------------
    // Public Methods
    // --------------------------------------------------------------------

    getPosition() {
      return Core.getPosition({
        compArray : this,
        ids       : this.getIds()
      })
    }

    getPositionString() {
      return Core.getPosition({
        compArray : this,
        delimited : true,
        ids       : this.getIds()
      })
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  gmap.LabelArray = LabelArray

  return gmap
})(gmap, gmap.Core, gmap.Const.ComponentType)
