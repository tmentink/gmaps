// ------------------------------------------------------------------------
// gmaps: components/polyline.js
// ------------------------------------------------------------------------

var Components = ((Components, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class Polyline extends Components.BaseComponent {

    constructor(parms) {
      super({
        id      : parms.id,
        obj     : new google.maps.Polyline(parms.options),
        options : parms.options,
        type    : ComponentType.POLYLINE
      })
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Components.Polyline = Polyline

  return Components
})(Components || (Components = {}), Const.ComponentType)
