// ------------------------------------------------------------------------
// GMaps: polygon.js
// ------------------------------------------------------------------------

!((gmap, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class Polygon extends gmap.BaseComponent {

    constructor(id, options) {
      const obj = new google.maps.Polygon(options)
      super(id, options, obj, ComponentType.POLYGON)
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  gmap.Polygon = Polygon

  return gmap
})(gmap, gmap.Const.ComponentType)
