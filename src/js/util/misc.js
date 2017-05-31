// ------------------------------------------------------------------------
// GMaps: util/misc.js
// ------------------------------------------------------------------------

!((Util) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Util.renameProperty = function(parms) {
    const newName = parms.newName
    const obj     = parms.obj
    const oldName = parms.oldName

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
