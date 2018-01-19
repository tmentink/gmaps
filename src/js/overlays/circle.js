// ------------------------------------------------------------------------
// gmaps: overlays/circle.js
// ------------------------------------------------------------------------

var Overlays = ((Overlays, OverlayType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class Circle extends Overlays.BaseOverlay {

    constructor(parms) {
      super({
        id      : parms.id,
        obj     : new google.maps.Circle(parms.options),
        options : parms.options,
        type    : OverlayType.CIRCLE
      })
    }


    // --------------------------------------------------------------------
    // Public Methods
    // --------------------------------------------------------------------

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

  Overlays.Circle = Circle

  return Overlays
})(Overlays || (Overlays = {}), Const.OverlayType)
