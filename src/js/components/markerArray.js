// ------------------------------------------------------------------------
// GMaps: components/markerArray.js
// ------------------------------------------------------------------------

!((gmap, Core, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class MarkerArray extends gmap.BaseComponentArray {

    constructor(parms) {
      super({
        childType : ComponentType.MARKER,
        map       : parms.map,
        type      : ComponentType.MARKER_ARRAY
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

    getPosition() {
      return Core.getPosition({
        compArray : this,
        ids       : this.getIds()
      })
    }

    getPositionString() {
      return Core.getPosition({
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

  gmap.MarkerArray = MarkerArray

  return gmap
})(gmap, gmap.Core, gmap.Const.ComponentType)
