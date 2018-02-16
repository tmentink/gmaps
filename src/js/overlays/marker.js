// ------------------------------------------------------------------------
// gmaps: overlays/marker.js
// ------------------------------------------------------------------------

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
        comp : this
      })
    }

    getPositionString() {
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

  Overlays.Marker = Marker


  return Overlays
})(Overlays || (Overlays = {}), Const.OverlayTypes, Const.GoogleClasses)
