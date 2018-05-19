
var Overlays = ((Overlays, OverlayTypes, GoogleClasses) => {
  "use strict"


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
    // Public
    // --------------------------------------------------------------------

    getPath(index) {
      return Core.getCoordinates({
        index : index,
        ovl   : this
      })
    }

    getPathString(index) {
      return Core.getCoordinates({
        index     : index,
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

  Overlays.Polygon = Polygon


  return Overlays
})(Overlays || (Overlays = {}), Const.OverlayTypes, Const.GoogleClasses)
