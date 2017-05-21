// ------------------------------------------------------------------------
// GMaps: markerArray.js
// ------------------------------------------------------------------------

!((gmap, Core, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class MarkerArray extends gmap.BaseComponentArray {

    constructor(map) {
      super(map, ComponentType.MARKER_ARRAY, ComponentType.MARKER)
    }


    // --------------------------------------------------------------------
    // Public Methods
    // --------------------------------------------------------------------

    addListener(type, fn) {
      return Core.addListener(this, this.getIds(), type, fn)
    }

    getPosition() {
      return Core.getPosition(this, this.getIds())
    }

    getPositionString() {
      return Core.getPosition(this, this.getIds(), true)
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

  gmap.MarkerArray = MarkerArray

  return gmap
})(gmap, gmap.Core, gmap.Const.ComponentType)
