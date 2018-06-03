
var Util = ((Util) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Util.extend = function() {
    let copyIsArray, clone
    let target = arguments[0]

    // eslint-disable-next-line eqeqeq
    if (target == null || (!Is.Object(target) && !Is.Function(target))) {
      target = {}
    }

    for (var i = 1, i_end = arguments.length; i < i_end; i++) {
      const options = arguments[i]

      // eslint-disable-next-line eqeqeq
      if (options == null) continue

      for (var name in options) {
        const src  = target[name]
        const copy = options[name]

        if (target === copy) continue

        if (copy && (isPlainObject(copy) || (copyIsArray = Is.Array(copy)))) {
          if (copyIsArray) {
            copyIsArray = false
            clone = src && Is.Array(src) ? src : []
          }
          else {
            clone = src && isPlainObject(src) ? src : {}
          }

          target[name] = Util.extend(clone, copy)
        }
        else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }

    return target
  }

  Util.renameProperty = function({obj, oldName, newName}) {
    if (oldName === newName) return

    if (obj.hasOwnProperty(oldName)) {
      obj[newName] = obj[oldName]
      delete obj[oldName]
    }
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------

  function isPlainObject(obj) {
    let key
    const hasOwn = Object.prototype.hasOwnProperty
    const toStr  = Object.prototype.toString

    if (!obj || toStr.call(obj) !== "[object Object]") return false

    const hasOwnConstructor = hasOwn.call(obj, "constructor")
    const hasIsPrototypeOf  = obj.constructor
                           && obj.constructor.prototype
                           && hasOwn.call(obj.constructor.prototype, "isPrototypeOf")

    if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) return false

    // eslint-disable-next-line no-empty
    for (key in obj) {}

    return typeof key === "undefined" || hasOwn.call(obj, key)
  }


  return Util
})(Util || (Util = {}))
