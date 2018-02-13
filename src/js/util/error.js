// ------------------------------------------------------------------------
// gmaps: util/error.js
// ------------------------------------------------------------------------

var Error = ((Error) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  Error.throw = function({method, msg, args}) {
    // eslint-disable-next-line no-console
    console.error(`${method}: ${msg}`, args)
    return false
  }


  return Error
})(Error || (Error = {}))
