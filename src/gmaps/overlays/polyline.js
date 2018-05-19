
var Overlays = ((Overlays, OverlayTypes, GoogleClasses) => {
  "use strict"


  class Polyline extends Overlays.BaseOverlay {

    constructor({map, options}) {
      super({
        map     : map,
        obj     : new google.maps[GoogleClasses.POLYLINE](options),
        options : options,
        type    : OverlayTypes.POLYLINE
      })
    }


    // --------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------

    getPath() {
      return Core.getCoordinates({
        ovl : this
      })
    }

    getPathString() {
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

  Overlays.Polyline = Polyline


  return Overlays
})(Overlays || (Overlays = {}), Const.OverlayTypes, Const.GoogleClasses)
