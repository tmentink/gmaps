
var Error = ((Error) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Error.throw = function({method, msg, args}) {
    // eslint-disable-next-line no-console
    console.error(`${method}: ${msg}`, args)
    return false
  }


  return Error
})(Error || (Error = {}))