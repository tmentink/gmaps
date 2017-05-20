// ------------------------------------------------------------------------
// GMaps: markerArray.js
// ------------------------------------------------------------------------

!((gmap) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class MarkerArray extends gmap.BaseComponentArray {

    constructor(map) {
      super(map, gmap.Const.ComponentType.MARKER_ARRAY, gmap.Const.ComponentType.MARKER)
    }


    // --------------------------------------------------------------------
    // Public Methods
    // --------------------------------------------------------------------

    addListener(type, fn) {
      return gmap.Core.addListener(this, this.getIds(), type, fn)
    }

    getPosition() {
      return gmap.Core.getPosition(this, this.getIds())
    }

    getPositionString() {
      return gmap.Core.getPosition(this, this.getIds(), true)
    }

    removeAllListeners() {
      return gmap.Core.removeAllListeners(this, this.getIds())
    }

    removeListenerType(type) {
      return gmap.Core.removeListenerType(this, this.getIds(), type)
    }

  }

  gmap.MarkerArray = MarkerArray

  return gmap
})(gmap || {})
