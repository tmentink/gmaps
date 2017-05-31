// ------------------------------------------------------------------------
// GMaps: components/polygon.js
// ------------------------------------------------------------------------

!((gmap, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class Polygon extends gmap.BaseComponent {

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

  gmap.Polygon = Polygon

  return gmap
})(gmap, gmap.Const.ComponentType)
