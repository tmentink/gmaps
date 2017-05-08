// ------------------------------------------------------------------------
// GMaps: label.js
// ------------------------------------------------------------------------

!((gmap) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const Type = gmap.Const.Component.Type


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class Label extends gmap.BaseComponent {

    constructor(id, options) {
      const obj = new gmap.GoogleLabel(options)
      super(id, options, obj, Type.LABEL)
    }

  }

  gmap.Label = Label

  return gmap
})(gmap || {})
