// ------------------------------------------------------------------------
// gmaps: components/circleArray.js
// ------------------------------------------------------------------------

var Components = ((Components, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class RectangleArray extends Components.BaseComponentArray {

    constructor(parms) {
      super({
        map       : parms.map,
        type      : ComponentType.RECTANGLE_ARRAY
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

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Components.RectangleArray = RectangleArray

  return Components
})(Components || (Components = {}), Const.ComponentType)
