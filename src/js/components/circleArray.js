// ------------------------------------------------------------------------
// gmaps: components/circleArray.js
// ------------------------------------------------------------------------

var Components = ((Components, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class CircleArray extends Components.BaseComponentArray {

    constructor(parms) {
      super({
        map       : parms.map,
        type      : ComponentType.CIRCLE_ARRAY
      })
    }


    // --------------------------------------------------------------------
    // Public Methods
    // --------------------------------------------------------------------

    off(type) {
      return Core.removeListener({
        compArray : this,
        ids       : this.getIds(),
        type      : type
      })
    }

    on(type, func) {
      return Core.addListener({
        compArray : this,
        func      : func,
        ids       : this.getIds(),
        type      : type
      })
    }

    trigger(type) {
      return Core.triggerListener({
        compArray : this,
        ids       : this.getIds(),
        type      : type
      })
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Components.CircleArray = CircleArray

  return Components
})(Components || (Components = {}), Const.ComponentType)
