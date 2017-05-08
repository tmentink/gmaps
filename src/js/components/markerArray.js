// ------------------------------------------------------------------------
// GMaps: markerArray.js
// ------------------------------------------------------------------------

!((gmap) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const Type = gmap.Const.Component.Type


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class MarkerArray extends gmap.BaseComponentArray {

    constructor(map) {
      super(map, Type.MARKER_ARRAY, Type.MARKER)
    }


    // --------------------------------------------------------------------
    // Public Methods
    // --------------------------------------------------------------------

    addListener(type, fn) {
      return gmap.Core.addListener(this, this.getIds(), type, fn)
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
