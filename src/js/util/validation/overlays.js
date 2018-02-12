// ------------------------------------------------------------------------
// gmaps: util/validation/overlays.js
// ------------------------------------------------------------------------

var IsValid = ((IsValid) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  IsValid.overlayOptions = function(p) {
    const map     = p.map
    const options = p.options
    const type    = p.type

    // check if Id already exists
    if (map.overlays[type].includes(options.id) === true) {
      return Error.throw({
        method  : "add",
        message : `A ${type} with an id of ${options.id} already exists`,
        obj     : options
      })
    }

    // check if all required options have values
    const reqOptions = Get.filteredOptions({ filter: "requried", type: type })
    for (var i = 0, i_end = reqOptions.length; i < i_end; i++) {
      const opt = reqOptions[i].name

      if (Value.isEmpty(options[opt])) {
        return Error.throw({
          method  : "add",
          message : `${opt} must have a value`,
          obj     : options
        })
      }
    }

    return true
  }

  IsValid.overlayType = function(type) {
    return Object.keys(Const.Overlays).includes(type)
  }


  return IsValid
})(IsValid || (IsValid = {}))
