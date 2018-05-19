
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

  Convert.toLowerCase = function(val) {
    const regex = /\s+|_+/g

    return Is.String(val)
      ? val.toLowerCase().replace(regex, "")
      : undefined
  }


  return Convert
})(Convert || (Convert = {}))
