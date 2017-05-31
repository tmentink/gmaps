// ------------------------------------------------------------------------
// GMaps: components/polygonArray.js
// ------------------------------------------------------------------------

!((gmap, Core, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class PolygonArray extends gmap.BaseComponentArray {

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

    addListener(parms) {
      return Core.addListener({
        compArray : this,
        func      : parms.func,
        ids       : this.getIds(),
        type      : parms.type
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

    removeAllListeners() {
      return Core.removeAllListeners({
        compArray : this,
        ids       : this.getIds()
      })
    }

    removeListenerType(type) {
      return Core.removeListenerType({
        compArray : this,
        ids       : this.getIds(),
        type      : type
      })
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  gmap.PolygonArray = PolygonArray

  return gmap
})(gmap, gmap.Core, gmap.Const.ComponentType)
