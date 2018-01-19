// ------------------------------------------------------------------------
// gmaps: overlays/polyline.js
// ------------------------------------------------------------------------

var Overlays = ((Overlays, OverlayType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class Polyline extends Overlays.BaseOverlay {

    constructor(parms) {
      super({
        id      : parms.id,
        obj     : new google.maps.Polyline(parms.options),
        options : parms.options,
        type    : OverlayType.POLYLINE
      })
    }


    // --------------------------------------------------------------------
    // Public Methods
    // --------------------------------------------------------------------

    getPath() {
      return Core.getCoordinates({
        comp : this
      })
    }

    getPathString() {
      return Core.getCoordinates({
        comp      : this,
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

  Overlays.Polyline = Polyline

  return Overlays
})(Overlays || (Overlays = {}), Const.OverlayType)
