// ------------------------------------------------------------------------
// GMaps: polygonArray.js
// ------------------------------------------------------------------------

!((gmap, Core, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class PolygonArray extends gmap.BaseComponentArray {

    constructor(map) {
      super(map, ComponentType.POLYGON_ARRAY, ComponentType.POLYGON)
    }


    // --------------------------------------------------------------------
    // Public Methods
    // --------------------------------------------------------------------

    addListener(type, fn) {
      return Core.addListener(this, this.getIds(), type, fn)
    }

    getPath() {
      return Core.getPath(this, this.getIds())
    }

    getPathString() {
      return Core.getPath(this, this.getIds(), true)
    }

    removeAllListeners() {
      return Core.removeAllListeners(this, this.getIds())
    }

    removeListenerType(type) {
      return Core.removeListenerType(this, this.getIds(), type)
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  gmap.PolygonArray = PolygonArray

  return gmap
})(gmap, gmap.Core, gmap.Const.ComponentType)
