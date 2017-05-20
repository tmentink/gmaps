// ------------------------------------------------------------------------
// GMaps: polygon.js
// ------------------------------------------------------------------------

!((gmap) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class Polygon extends gmap.BaseComponent {

    constructor(id, options) {
      const obj = new google.maps.Polygon(options)
      super(id, options, obj, gmap.Const.ComponentType.POLYGON)
    }

  }

  gmap.Polygon = Polygon

  return gmap
})(gmap || {})
