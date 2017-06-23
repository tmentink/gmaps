// ------------------------------------------------------------------------
// GMaps: shapes/simplePolygons.js
// ------------------------------------------------------------------------

!((gmap) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const Shape = [
    "decagon",
    "hexagon",
    "pentagon",
    "rectangle",
    "square",
    "triangle"
  ]

  const ShapeDegrees = {
    decagon   : [ 36, 72, 108, 144, 180, 216, 252, 288, 324, 360 ],
    hexagon   : [ 30, 90, 150, 210, 270, 330 ],
    pentagon  : [ 72, 144, 216, 288, 360 ],
    rectangle : [ 60, 120, 240, 300 ],
    square    : [ 45, 135, 225, 315 ],
    triangle  : [ 120, 240, 360 ]
  }


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  gmap.prototype.shape = function(type, parms) {
    if (_validShapeType(type)) {
      return _getShapePath(this, parms, type)
    }
    else {
      return Util.throwError({
        method  : "shape",
        message : `${type} is not a valid shape`,
        obj     : {type: type}
      })
    }
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _getShapePath(map, parms, type) {
    parms        = $.isPlainObject(parms) ? parms : {}
    parms.center = parms.center || map.getCenter()
    parms.size   = parms.size || Util.getSizeFromZoom(map.getZoom())

    if ($.type(parms.center) === "string") {
      parms.center = Util.toLatLng(parms.center)
    }

    const path = []
    for (var i = 0, i_end = ShapeDegrees[type].length; i < i_end; i++) {
      path.push(Util.getDestinationPoint({
        bearing  : ShapeDegrees[type][i],
        distance : parms.size,
        latLng   : parms.center
      }))
    }
    return path
  }

  function _validShapeType(type) {
    type = Util.toLowerCase(type)
    return Shape.includes(type)
  }


  return gmap
})(gmap)
