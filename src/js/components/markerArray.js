// ------------------------------------------------------------------------
// GMaps: components/markerArray.js
// ------------------------------------------------------------------------

var Components = ((Components, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class MarkerArray extends Components.BaseComponentArray {

    constructor(parms) {
      super({
        childType : ComponentType.MARKER,
        map       : parms.map,
        type      : ComponentType.MARKER_ARRAY
      })
    }


    // --------------------------------------------------------------------
    // Public Methods
    // --------------------------------------------------------------------

    on(type, func) {
      return Core.addListener({
        compArray : this,
        func      : func,
        ids       : this.getIds(),
        type      : type
      })
    }

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

    off(type) {
      return Core.removeListener({
        compArray : this,
        ids       : this.getIds(),
        type      : type
      })
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Components.MarkerArray = MarkerArray

  return Components
})(Components || (Components = {}), Const.ComponentType)
