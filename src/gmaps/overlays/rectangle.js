
var Overlays = ((Overlays, OverlayTypes, GoogleClasses) => {
  "use strict"


  class Rectangle extends Overlays.BaseOverlay {

    constructor({map, options}) {
      super({
        map     : map,
        obj     : new google.maps[GoogleClasses.RECTANGLE](options),
        options : options,
        type    : OverlayTypes.RECTANGLE
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
        func : func,
        ovl  : this,
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

  Overlays.Rectangle = Rectangle


  return Overlays
})(Overlays || (Overlays = {}), Const.OverlayTypes, Const.GoogleClasses)
