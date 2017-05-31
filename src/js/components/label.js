// ------------------------------------------------------------------------
// GMaps: components/label.js
// ------------------------------------------------------------------------

!((gmap, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class Label extends gmap.BaseComponent {

    constructor(parms) {
      super({
        id      : parms.id,
        obj     : new gmap.GoogleLabel(parms.options),
        options : parms.options,
        type    : ComponentType.LABEL
      })
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  gmap.Label = Label

  return gmap
})(gmap, gmap.Const.ComponentType)
