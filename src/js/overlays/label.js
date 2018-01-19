// ------------------------------------------------------------------------
// gmaps: overlays/label.js
// ------------------------------------------------------------------------

var Overlays = ((Overlays, OverlayType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class Label extends Overlays.BaseOverlay {

    constructor(parms) {
      super({
        id      : parms.id,
        obj     : new Overlays.GoogleLabel(parms.options),
        options : parms.options,
        type    : OverlayType.LABEL
      })
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Overlays.Label = Label

  return Overlays
})(Overlays || (Overlays = {}), Const.OverlayType)
