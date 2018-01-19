// ------------------------------------------------------------------------
// gmaps: overlays/rectangle.js
// ------------------------------------------------------------------------

var Overlays = ((Overlays, OverlayType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class Rectangle extends Overlays.BaseOverlay {

    constructor(parms) {
      super({
        id      : parms.id,
        obj     : new google.maps.Rectangle(parms.options),
        options : parms.options,
        type    : OverlayType.RECTANGLE
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

  Overlays.Rectangle = Rectangle

  return Overlays
})(Overlays || (Overlays = {}), Const.OverlayType)
