// ------------------------------------------------------------------------
// GMaps: components/polygon.js
// ------------------------------------------------------------------------

var Components = ((Components, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class Polygon extends Components.BaseComponent {

    constructor(parms) {
      super({
        id      : parms.id,
        obj     : new google.maps.Polygon(parms.options),
        options : parms.options,
        type    : ComponentType.POLYGON
      })
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Components.Polygon = Polygon

  return Components
})(Components || (Components = {}), Const.ComponentType)
