// ------------------------------------------------------------------------
// GMaps: polygonArray.js
// ------------------------------------------------------------------------

!((gmap) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class PolygonArray extends gmap.BaseComponentArray {

    constructor(map) {
      super(map, gmap.Const.ComponentType.POLYGON_ARRAY, gmap.Const.ComponentType.POLYGON)
    }


    // --------------------------------------------------------------------
    // Public Methods
    // --------------------------------------------------------------------

    addListener(type, fn) {
      return gmap.Core.addListener(this, this.getIds(), type, fn)
    }

    getPath() {
      return gmap.Core.getPath(this, this.getIds())
    }

    getPathString() {
      return gmap.Core.getPath(this, this.getIds(), true)
    }

    removeAllListeners() {
      return gmap.Core.removeAllListeners(this, this.getIds())
    }

    removeListenerType(type) {
      return gmap.Core.removeListenerType(this, this.getIds(), type)
    }

  }

  gmap.PolygonArray = PolygonArray

  return gmap
})(gmap || {})
