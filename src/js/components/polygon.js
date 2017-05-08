// ------------------------------------------------------------------------
// GMaps: polygon.js
// ------------------------------------------------------------------------

!((gmap) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const Type = gmap.Const.Component.Type


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class Polygon extends gmap.BaseComponent {

    constructor(id, options) {
      const obj = new google.maps.Polygon(options)
      super(id, options, obj, Type.POLYGON)
    }

  }

  gmap.Polygon = Polygon

  return gmap
})(gmap || {})
