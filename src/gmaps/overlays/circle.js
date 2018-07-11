
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
        ovl  : this,
        type : type
      })
    }

    on(type, func) {
      return Core.addListener({
        ovl  : this,
        func : func,
        type : type
      })
    }

    one(type, func) {
      return Core.addListenerOnce({
        ovl  : this,
        func : func,
        type : type
      })
    }

    trigger(type) {
      return Core.triggerListener({
        ovl  : this,
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
