
var Util = ((Util) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Util.extend = function(out) {
    out = out || {}

    for (var i = 1, i_end = arguments.length; i < i_end; i++) {
      const obj = arguments[i]
      if (!obj) continue

      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === "object") {
            out[key] = Util.extend(out[key], obj[key])
          }
          else {
            out[key] = obj[key]
          }
        }
      }
    }

    return out
  }

  Util.renameProperty = function({obj, oldName, newName}) {
    if (oldName === newName) return

    if (obj.hasOwnProperty(oldName)) {
      obj[newName] = obj[oldName]
      delete obj[oldName]
    }
  }


  return Util
})(Util || (Util = {}))
