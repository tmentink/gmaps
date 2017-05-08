// ------------------------------------------------------------------------
// GMaps: marker.js
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

  class Marker extends gmap.BaseComponent {

    constructor(id, options) {
      const obj = new google.maps.Marker(options)
      super(id, options, obj, Type.MARKER)
    }

  }

  gmap.Marker = Marker

  return gmap
})(gmap || {})
