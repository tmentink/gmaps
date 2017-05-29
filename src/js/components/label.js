// ------------------------------------------------------------------------
// GMaps: components/label.js
// ------------------------------------------------------------------------

!((gmap, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class Label extends gmap.BaseComponent {

    constructor(id, options) {
      const obj = new gmap.GoogleLabel(options)
      super(id, options, obj, ComponentType.LABEL)
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  gmap.Label = Label

  return gmap
})(gmap, gmap.Const.ComponentType)
