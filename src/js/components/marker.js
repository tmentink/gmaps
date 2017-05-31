// ------------------------------------------------------------------------
// GMaps: components/marker.js
// ------------------------------------------------------------------------

!((gmap, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class Marker extends gmap.BaseComponent {

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

  gmap.Marker = Marker

  return gmap
})(gmap, gmap.Const.ComponentType)
