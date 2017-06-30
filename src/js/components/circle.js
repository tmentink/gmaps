// ------------------------------------------------------------------------
// gmaps: components/circle.js
// ------------------------------------------------------------------------

var Components = ((Components, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class Circle extends Components.BaseComponent {

    constructor(parms) {
      super({
        id      : parms.id,
        obj     : new google.maps.Circle(parms.options),
        options : parms.options,
        type    : ComponentType.CIRCLE
      })
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Components.Circle = Circle

  return Components
})(Components || (Components = {}), Const.ComponentType)
