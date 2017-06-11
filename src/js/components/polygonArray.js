// ------------------------------------------------------------------------
// GMaps: components/polygonArray.js
// ------------------------------------------------------------------------

var Components = ((Components, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class PolygonArray extends Components.BaseComponentArray {

    constructor(parms) {
      super({
        childType : ComponentType.POLYGON,
        map       : parms.map,
        type      : ComponentType.POLYGON_ARRAY
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

    getPath() {
      return Core.getPath({
        compArray : this,
        ids       : this.getIds()
      })
    }

    getPathString() {
      return Core.getPath({
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

  Components.PolygonArray = PolygonArray

  return Components
})(Components || (Components = {}), Const.ComponentType)
