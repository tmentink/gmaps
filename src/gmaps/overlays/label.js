
var Overlays = ((Overlays, OverlayTypes) => {
  "use strict"


  class Label extends Overlays.BaseOverlay {

    constructor({map, options}) {
      super({
        map     : map,
        obj     : new Overlays.GoogleLabel(options),
        options : options,
        type    : OverlayTypes.LABEL
      })
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Overlays.Label = Label


  return Overlays
})(Overlays || (Overlays = {}), Const.OverlayTypes)
