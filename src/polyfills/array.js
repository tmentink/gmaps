
!(() => {
  "use strict"


  // ----------------------------------------------------------------------
  // Array.find
  // ----------------------------------------------------------------------

  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, "find", {
      value(predicate) {

        // eslint-disable-next-line eqeqeq
        if (this == null) {
          throw new TypeError("'this' is null or not defined")
        }

        const o   = Object(this)
        const len = o.length >>> 0

        if (typeof predicate !== "function") {
          throw new TypeError("predicate must be a function")
        }

        const thisArg = arguments[1]
        let k = 0

        while (k < len) {
          let kValue = o[k]
          if (predicate.call(thisArg, kValue, k, o)) {
            return kValue
          }
          k++
        }

        return undefined
      }
    })
  }


  // ----------------------------------------------------------------------
  // Array.includes
  // ----------------------------------------------------------------------

  if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, "includes", {
      value(searchElement, fromIndex) {

        // eslint-disable-next-line eqeqeq
        if (this == null) {
          throw new TypeError("'this' is null or not defined")
        }

        const o   = Object(this)
        const len = o.length >>> 0

        if (len === 0) {
          return false
        }

        const n = fromIndex || 0
        let k = Math.max(n >= 0 ? n : len - Math.abs(n), 0)

        function sameValueZero(x, y) {
          return x === y ||
            (typeof x === "number" &&
             typeof y === "number" &&
             isNaN(x) && isNaN(y))
        }

        while (k < len) {
          if (sameValueZero(o[k], searchElement)) {
            return true
          }
          k++
        }

        return false
      }
    })
  }


})()
