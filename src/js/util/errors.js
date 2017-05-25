// ------------------------------------------------------------------------
// GMaps: errors.js
// ------------------------------------------------------------------------

!((Util) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  Util.throwError = function(parms) {
    /* eslint-disable no-console */
    console.error(parms.method + ": " + parms.message, parms.obj || "")
    return false
  }


  return Util
})(gmap.Util || (gmap.Util = {}))
