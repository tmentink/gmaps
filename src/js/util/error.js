// ------------------------------------------------------------------------
// gmaps: util/error.js
// ------------------------------------------------------------------------

var Error = ((Error) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  // method {string}
  // msg    {string}
  // obj    {object}
  Error.throw = function(p) {
    // eslint-disable-next-line no-console
    console.error(`${p.method}: ${p.msg}`, p.obj || "")
    return false
  }


  return Error
})(Error || (Error = {}))
