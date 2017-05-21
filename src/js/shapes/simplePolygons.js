// ------------------------------------------------------------------------
// GMaps: simplePolygons.js
// ------------------------------------------------------------------------

!((Shapes, Util) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const Shape = {
    HEXAGON:   "Hexagon",
    PENTAGON:  "Pentagon",
    RECTANGLE: "Rectangle",
    SQUARE:    "Square",
    TRIANGLE:  "Triangle"
  }

  const ShapeDegrees = {
    Hexagon:   [ 30, 90, 150, 210, 270, 330 ],
    Pentagon:  [ 72, 144, 216, 288, 360 ],
    Rectangle: [ 60, 120, 240, 300 ],
    Square:    [ 45, 135, 225, 315 ],
    Triangle:  [ 120, 240, 360 ]
  }


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  Shapes.hexagon = function(parms) {
    return _getShapePath(Shape.HEXAGON, parms)
  }

  Shapes.pentagon = function(parms) {
    return _getShapePath(Shape.PENTAGON, parms)
  }

  Shapes.rectangle = function(parms) {
    return _getShapePath(Shape.RECTANGLE, parms)
  }

  Shapes.square = function(parms) {
    return _getShapePath(Shape.SQUARE, parms)
  }

  Shapes.triangle = function(parms) {
    return _getShapePath(Shape.TRIANGLE, parms)
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _getShapePath(type, parms) {
    if (parms.map) {
      parms.center = parms.map.getCenter()
      parms.size   = Util.getSizeFromZoom(parms.map.getZoom())
    }
    else {
      parms = Util.convertShapeOptions(type, parms)
    }

    const path = []

    for (var i = 0, i_end = ShapeDegrees[type].length; i < i_end; i++) {
      let deg = ShapeDegrees[type][i]
      path.push(Util.getDestinationPoint(parms.center, deg, parms.size))
    }

    return path
  }


  return Shapes
})(gmap.Shapes || (gmap.Shapes = {}), gmap.Util)
