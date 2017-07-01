// ------------------------------------------------------------------------
// gmaps: components/rectangle.js
// ------------------------------------------------------------------------

var Components = ((Components, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class Rectangle extends Components.BaseComponent {

    constructor(parms) {
      super({
        id      : parms.id,
        obj     : new google.maps.Rectangle(parms.options),
        options : parms.options,
        type    : ComponentType.RECTANGLE
      })
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Components.Rectangle = Rectangle

  return Components
})(Components || (Components = {}), Const.ComponentType)
