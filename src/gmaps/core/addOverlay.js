
var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Core.addOverlay = function({map, options, type}) {
    const args = arguments[0]
    args.type  = Lookup.overlayType(type)

    if (IsValid.overlayType(args.type) === false) {
      return Error.throw({
        method  : "addOverlay",
        msg     : `${type} is not a valid overlay type`,
        args    : {map, options, type}
      })
    }

    if (Is.Array(options) === false) {
      args.options = [options]
    }

    return multiAdd(args)
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------

  function add({map, options, type}) {
    const args   = arguments[0]
    args.convert = true
    options.id   = Get.formattedId(args)
    options      = Get.mergedOptions(args)

    if (IsValid.overlayOptions({map, options, type})) {
      return new Overlays[type]({
        map     : map,
        options : options
      })
    }
  }

  function multiAdd({map, options, type}) {
    const args        = arguments[0]
    const newOvlArray = Get.newOverlayArray(args)

    for (var i = 0, i_end = options.length; i < i_end; i++) {
      args.options = options[i]
      const ovl    = add(args)

      if (ovl) newOvlArray.push(ovl)
    }

    return newOvlArray
  }


  return Core
})(Core || (Core = {}))
