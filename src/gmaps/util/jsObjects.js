
var Util = ((Util) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Util.renameProperty = function({obj, oldName, newName}) {
    if (oldName === newName) return

    if (obj.hasOwnProperty(oldName)) {
      obj[newName] = obj[oldName]
      delete obj[oldName]
    }
  }


  return Util
})(Util || (Util = {}))
