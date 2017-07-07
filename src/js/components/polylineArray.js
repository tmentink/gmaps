// ------------------------------------------------------------------------
// gmaps: components/polylineArray.js
// ------------------------------------------------------------------------

var Components = ((Components, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class PolylineArray extends Components.BaseComponentArray {

    constructor(parms) {
      super({
        map       : parms.map,
        type      : ComponentType.POLYLINE_ARRAY
      })
    }


    // --------------------------------------------------------------------
    // Public Methods
    // --------------------------------------------------------------------

    getPath() {
      return Core.getCoordinates({
        compArray : this,
        ids       : this.getIds()
      })
    }

    getPathString() {
      return Core.getCoordinates({
        compArray : this,
        stringify : true,
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

  Components.PolylineArray = PolylineArray

  return Components
})(Components || (Components = {}), Const.ComponentType)
