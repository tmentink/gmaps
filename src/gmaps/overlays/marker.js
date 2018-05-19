
var Overlays = ((Overlays, OverlayTypes, GoogleClasses) => {
  "use strict"


  class Marker extends Overlays.BaseOverlay {

    constructor({map, options}) {
      super({
        map     : map,
        obj     : new google.maps[GoogleClasses.MARKER](options),
        options : options,
        type    : OverlayTypes.MARKER
      })
    }


    // --------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------

    getPosition() {
      return Core.getCoordinates({
        ovl : this
      })
    }

    getPositionString() {
      return Core.getCoordinates({
        ovl       : this,
        stringify : true
      })
    }

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

  Overlays.Marker = Marker


  return Overlays
})(Overlays || (Overlays = {}), Const.OverlayTypes, Const.GoogleClasses)
