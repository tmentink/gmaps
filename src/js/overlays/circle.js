// ------------------------------------------------------------------------
// gmaps: overlays/circle.js
// ------------------------------------------------------------------------

var Overlays = ((Overlays, OverlayTypes, GoogleClasses) => {
  "use strict"


  class Circle extends Overlays.BaseOverlay {

    constructor({map, options}) {
      super({
        map     : map,
        obj     : new google.maps[GoogleClasses.CIRCLE](options),
        options : options,
        type    : OverlayTypes.CIRCLE
      })
    }


    // --------------------------------------------------------------------
    // Public
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
})(Overlays || (Overlays = {}), Const.OverlayTypes, Const.GoogleClasses)
