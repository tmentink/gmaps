// ------------------------------------------------------------------------
// gmaps: overlays/polyline.js
// ------------------------------------------------------------------------

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
})(Overlays || (Overlays = {}), Const.OverlayTypes, Const.GoogleClasses)
