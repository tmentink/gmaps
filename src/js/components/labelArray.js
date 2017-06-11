// ------------------------------------------------------------------------
// GMaps: components/labelArray.js
// ------------------------------------------------------------------------

var Components = ((Components, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class LabelArray extends Components.BaseComponentArray {

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

  Components.LabelArray = LabelArray

  return Components
})(Components || (Components = {}), Const.ComponentType)
