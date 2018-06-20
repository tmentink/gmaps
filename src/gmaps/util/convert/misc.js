
var Convert = ((Convert) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Convert.toArray = function(val) {
    return Is.Array(val)
      ? val
      : [val]
  }

  Convert.toDeg = function(val) {
    return val * 180 / Math.PI
  }

  Convert.toLowerCase = function(val) {
    const regex = /\s+|_+/g

    return Is.String(val)
      ? val.toLowerCase().replace(regex, "")
      : undefined
  }

  Convert.toRad = function(val) {
    return val * Math.PI / 180
  }


  return Convert
})(Convert || (Convert = {}))
