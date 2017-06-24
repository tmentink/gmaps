// ------------------------------------------------------------------------
// gmaps: components/marker.js
// ------------------------------------------------------------------------

var Components = ((Components, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class Marker extends Components.BaseComponent {

    constructor(parms) {
      super({
        id      : parms.id,
        obj     : new google.maps.Marker(parms.options),
        options : parms.options,
        type    : ComponentType.MARKER
      })
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Components.Marker = Marker

  return Components
})(Components || (Components = {}), Const.ComponentType)
