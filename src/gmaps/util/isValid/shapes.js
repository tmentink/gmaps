
var IsValid = ((IsValid) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  IsValid.shapeType = function(type) {
    return Object.values(Const.Shapes).includes(type)
  }


  return IsValid
})(IsValid || (IsValid = {}))
