// ------------------------------------------------------------------------
// gmaps: util/convert/misc.js
// ------------------------------------------------------------------------

var Convert = ((Convert) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  Convert.toArray = function(val) {
    if ($.isArray(val) === false) {
      return [val]
    }

    return val
  }

  Convert.toLowerCase = function(val) {
    const regex = /\s+|\_+/g

    if ($.type(val) === "string") {
      return val.toLowerCase().replace(regex, "")
    }

    return undefined
  }


  return Convert
})(Convert || (Convert = {}))
