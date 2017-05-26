// ------------------------------------------------------------------------
// GMaps: misc.js
// ------------------------------------------------------------------------

!((Util) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  Util.renameProperty = function(parms) {
    const obj     = parms.obj
    const oldName = parms.oldName
    const newName = parms.newName

    if (oldName == newName) {
      return
    }

    if (obj.hasOwnProperty(oldName)) {
      obj[newName] = obj[oldName]
      delete obj[oldName]
    }
  }

  Util.throwError = function(parms) {
    /* eslint-disable no-console */
    console.error(parms.method + ": " + parms.message, parms.obj || "")
    return false
  }


  return Util
})(gmap.Util || (gmap.Util = {}))
