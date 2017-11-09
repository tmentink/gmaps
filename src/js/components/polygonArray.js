// ------------------------------------------------------------------------
// gmaps: components/polygonArray.js
// ------------------------------------------------------------------------

var Components = ((Components, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class PolygonArray extends Components.BaseComponentArray {

    constructor(parms) {
      super({
        map       : parms.map,
        type      : ComponentType.POLYGON_ARRAY
      })
    }


    // --------------------------------------------------------------------
    // Public Methods
    // --------------------------------------------------------------------

    getPath(index) {
      return Core.getCoordinates({
        compArray : this,
        ids       : this.getIds(),
        index     : index
      })
    }

    getPathString(index) {
      return Core.getCoordinates({
        compArray : this,
        stringify : true,
        ids       : this.getIds(),
        index     : index
      })
    }

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

  Components.PolygonArray = PolygonArray

  return Components
})(Components || (Components = {}), Const.ComponentType)
