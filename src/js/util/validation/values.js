// ------------------------------------------------------------------------
// gmaps: util/validation/values.js
// ------------------------------------------------------------------------

var Value = ((Value) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  Value.isEmpty = function(val) {
    return val === ""
        || val === null
        || val === undefined
  }


  return Value
})(Value || (Value = {}))
