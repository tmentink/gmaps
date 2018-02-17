
var Is = ((Is) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Is.Array = function(val) {
    return Get.type(val) === "array"
  }

  Is.Boolean = function(val) {
    return Get.type(val) === "boolean"
  }

  Is.Function = function(val) {
    return Get.type(val) === "function"
  }

  Is.Number = function(val) {
    return Get.type(val) === "number"
  }

  Is.Object = function(val) {
    return Get.type(val) === "object"
  }

  Is.String = function(val) {
    return Get.type(val) === "string"
  }


  return Is
})(Is || (Is = {}))
