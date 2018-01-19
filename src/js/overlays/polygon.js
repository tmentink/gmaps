// ------------------------------------------------------------------------
// gmaps: overlays/polygon.js
// ------------------------------------------------------------------------

var Overlays = ((Overlays, OverlayType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class Polygon extends Overlays.BaseOverlay {

    constructor(parms) {
      super({
        id      : parms.id,
        obj     : new google.maps.Polygon(parms.options),
        options : parms.options,
        type    : OverlayType.POLYGON
      })
    }


    // --------------------------------------------------------------------
    // Public Methods
    // --------------------------------------------------------------------

    getPath(index) {
      return Core.getCoordinates({
        comp  : this,
        index : index
      })
    }

    getPathString(index) {
      return Core.getCoordinates({
        comp      : this,
        index     : index,
        stringify : true
      })
    }

    off(type) {
      return Core.removeListener({
        comp : this,
        type : type
      })
    }

    on(type, func) {
      return Core.addListener({
        comp : this,
        func : func,
        type : type
      })
    }

    trigger(type) {
      return Core.triggerListener({
        comp : this,
        type : type
      })
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Overlays.Polygon = Polygon

  return Overlays
})(Overlays || (Overlays = {}), Const.OverlayType)
