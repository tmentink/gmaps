
var Const = ((Const) => {
  "use strict"


  const Shapes = {
    DECAGON   : "Decagon",
    HEXAGON   : "Hexagon",
    PENTAGON  : "Pentagon",
    RECTANGLE : "Rectangle",
    SQUARE    : "Square",
    TRIANGLE  : "Triangle"
  }

  const ShapeDegrees = {}
  ShapeDegrees[Shapes.DECAGON]   = [36, 72, 108, 144, 180, 216, 252, 288, 324, 360]
  ShapeDegrees[Shapes.HEXAGON]   = [30, 90, 150, 210, 270, 330]
  ShapeDegrees[Shapes.PENTAGON]  = [72, 144, 216, 288, 360]
  ShapeDegrees[Shapes.RECTANGLE] = [60, 120, 240, 300]
  ShapeDegrees[Shapes.SQUARE]    = [45, 135, 225, 315]
  ShapeDegrees[Shapes.TRIANGLE]  = [120, 240, 360]


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Const.Shapes       = Shapes
  Const.ShapeDegrees = ShapeDegrees


  return Const
})(Const || (Const = {}))
