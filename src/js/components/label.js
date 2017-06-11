// ------------------------------------------------------------------------
// GMaps: components/label.js
// ------------------------------------------------------------------------

var Components = ((Components, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class Label extends Components.BaseComponent {

    constructor(parms) {
      super({
        id      : parms.id,
        obj     : new Components.GoogleLabel(parms.options),
        options : parms.options,
        type    : ComponentType.LABEL
      })
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Components.Label = Label

  return Components
})(Components || (Components = {}), Const.ComponentType)
