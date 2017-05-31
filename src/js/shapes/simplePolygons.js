// ------------------------------------------------------------------------
// GMaps: shapes/simplePolygons.js
// ------------------------------------------------------------------------

!((gmap, Util) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const Shape = {
    DECAGON   : "Decagon",
    HEXAGON   : "Hexagon",
    PENTAGON  : "Pentagon",
    RECTANGLE : "Rectangle",
    SQUARE    : "Square",
    TRIANGLE  : "Triangle"
  }

  const ShapeDegrees = {
    Decagon   : [ 36, 72, 108, 144, 180, 216, 252, 288, 324, 360 ],
    Hexagon   : [ 30, 90, 150, 210, 270, 330 ],
    Pentagon  : [ 72, 144, 216, 288, 360 ],
    Rectangle : [ 60, 120, 240, 300 ],
    Square    : [ 45, 135, 225, 315 ],
    Triangle  : [ 120, 240, 360 ]
  }


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  gmap.prototype.decagonShape = function(parms) {
    return _getShapePath(this, parms, Shape.DECAGON)
  }

  gmap.prototype.hexagonShape = function(parms) {
    return _getShapePath(this, parms, Shape.HEXAGON)
  }

  gmap.prototype.pentagonShape = function(parms) {
    return _getShapePath(this, parms, Shape.PENTAGON)
  }

  gmap.prototype.rectangleShape = function(parms) {
    return _getShapePath(this, parms, Shape.RECTANGLE)
  }

  gmap.prototype.squareShape = function(parms) {
    return _getShapePath(this, parms, Shape.SQUARE)
  }

  gmap.prototype.triangleShape = function(parms) {
    return _getShapePath(this, parms, Shape.TRIANGLE)
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _getShapePath(map, parms, type) {
    parms        = $.isPlainObject(parms) ? parms : {}
    parms.center = parms.center || map.getCenter()
    parms.size   = parms.size || Util.getSizeFromZoom(map.getZoom())

    if ($.type(parms.center) == "string") {
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


  return gmap
})(gmap, gmap.Util)
