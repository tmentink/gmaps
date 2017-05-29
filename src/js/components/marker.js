// ------------------------------------------------------------------------
// GMaps: components/marker.js
// ------------------------------------------------------------------------

!((gmap, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class Marker extends gmap.BaseComponent {

    constructor(id, options) {
      const obj = new google.maps.Marker(options)
      super(id, options, obj, ComponentType.MARKER)
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  gmap.Marker = Marker

  return gmap
})(gmap, gmap.Const.ComponentType)
