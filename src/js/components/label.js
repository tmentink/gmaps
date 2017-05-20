// ------------------------------------------------------------------------
// GMaps: label.js
// ------------------------------------------------------------------------

!((gmap) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class Label extends gmap.BaseComponent {

    constructor(id, options) {
      const obj = new gmap.GoogleLabel(options)
      super(id, options, obj, gmap.Const.ComponentType.LABEL)
    }

  }

  gmap.Label = Label

  return gmap
})(gmap || {})
