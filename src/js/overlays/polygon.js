// ------------------------------------------------------------------------
// gmaps: overlays/polygon.js
// ------------------------------------------------------------------------

var Overlays = ((Overlays, OverlayTypes, GoogleClasses) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class Polygon extends Overlays.BaseOverlay {

    constructor({map, options}) {
      super({
        map     : map,
        obj     : new google.maps[GoogleClasses.POLYGON](options),
        options : options,
        type    : OverlayTypes.POLYGON
      })
    }


    // --------------------------------------------------------------------
    // Public Methods
    // --------------------------------------------------------------------

    getPath(index) {
      return Core.getCoordinates({
        comp  : this,
        index : index
      })
    }

    getPathString(index) {
      return Core.getCoordinates({
        comp      : this,
        index     : index,
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

  Overlays.Polygon = Polygon

  return Overlays
})(Overlays || (Overlays = {}), Const.OverlayTypes, Const.GoogleClasses)
