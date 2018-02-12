// ------------------------------------------------------------------------
// gmaps: util/validation/overlays.js
// ------------------------------------------------------------------------

var IsValid = ((IsValid) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  // map     {gmap}
  // options {object}
  // type    {string}
  IsValid.overlayOptions = function(p) {
    const id      = p.options.id
    const map     = p.map
    const options = p.options
    const type    = p.type

    // check if Id already exists
    if (isExistingId(map, type, id)) {
      return Error.throw({
        method  : "add",
        message : `A ${type} with an id of ${id} already exists`,
        obj     : options
      })
    }

    // check if all required options have values
    const reqOptions = Get.filteredOptions({ filter: "requried", type: type })
    for (var i = 0, i_end = reqOptions.length; i < i_end; i++) {
      const opt = reqOptions[i].name

      if (isEmpty(options[opt])) {
        return Error.throw({
          method  : "add",
          message : `${opt} must have a value`,
          obj     : options
        })
      }
    }

    return true
  }

  // type {string}
  IsValid.overlayType = function(type) {
    return Object.keys(Const.Overlays).includes(type)
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function isEmpty(val) {
    return val === ""
        || val === null
        || val === undefined
  }

  function isExistingId(map, type, id) {
    return map.overlays[type].includes(id)
  }


  return IsValid
})(IsValid || (IsValid = {}))
