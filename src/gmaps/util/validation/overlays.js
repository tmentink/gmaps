
var IsValid = ((IsValid) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  IsValid.overlayOptions = function({map, options, type}) {
    const args = arguments[0]
    args.id    = options.id

    if (isExistingId(args)) {
      return Error.throw({
        method : "addOverlay",
        msg    : `A ${type} with an id of ${id} already exists`,
        args   : args
      })
    }

    const reqOptions = Get.filteredOptions({filter: "requried", type: type})
    for (var i = 0, i_end = reqOptions.length; i < i_end; i++) {
      const opt = reqOptions[i].name

      if (isEmpty(options[opt])) {
        return Error.throw({
          method : "addOverlay",
          msg    : `${opt} must have a value`,
          args   : args
        })
      }
    }

    return true
  }

  IsValid.overlayType = function(type) {
    return Object.keys(Const.Overlays).includes(type)
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------

  function isEmpty(val) {
    return val === ""
        || val === null
        || val === undefined
  }

  function isExistingId({map, type, id}) {
    return map.overlays[type].includes(id)
  }


  return IsValid
})(IsValid || (IsValid = {}))
