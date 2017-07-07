// ------------------------------------------------------------------------
// gmaps: util/misc.js
// ------------------------------------------------------------------------

var Util = ((Util) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Util.renameProperty = function(parms) {
    const newName = parms.newName
    const obj     = parms.obj
    const oldName = parms.oldName

    if (oldName === newName) {
      return
    }

    if (obj.hasOwnProperty(oldName)) {
      obj[newName] = obj[oldName]
      delete obj[oldName]
    }
  }

  Util.throwError = function(parms) {
    // eslint-disable-next-line no-console
    console.error(parms.method + ": " + parms.message, parms.obj || "")
    return false
  }


  return Util
})(Util || (Util = {}))
