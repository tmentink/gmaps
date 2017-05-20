// ------------------------------------------------------------------------
// GMaps: marker.js
// ------------------------------------------------------------------------

!((gmap) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class Marker extends gmap.BaseComponent {

    constructor(id, options) {
      const obj = new google.maps.Marker(options)
      super(id, options, obj, gmap.Const.ComponentType.MARKER)
    }

  }

  gmap.Marker = Marker

  return gmap
})(gmap || {})
