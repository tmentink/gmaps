// ------------------------------------------------------------------------
// gmaps: core/addOverlay.js
// ------------------------------------------------------------------------

var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Core.addOverlay = function({map, options, type}) {
    const args = arguments[0]
    type       = Lookup.overlayType(type)

    if (IsValid.overlayType(type) === false) {
      return Error.throw({
        method  : "addOverlay",
        msg     : `${args.type} is not a valid overlay type`,
        args    : args
      })
    }

    args.type = type
    return $.isArray(options)
      ? multiAdd(args)
      : add(args)
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------

  function add({map, options, type}) {
    const args   = arguments[0]
    args.convert = true
    options.id   = Get.formattedId(args)
    options      = Get.mergedOptions(args)

    if (IsValid.overlayOptions(options)) {
      return new Overlays[type]({
        map     : map,
        options : options
      })
    }
  }

  function multiAdd({map, options, type}) {
    const args         = arguments[0]
    const overlayArray = Get.newOverlayArray(args)

    for (var i = 0, i_end = options.length; i < i_end; i++) {
      args.options  = options[i]
      const overlay = add(args)

      if (overlay) overlayArray.push(overlay)
    }

    return overlayArray
  }


  return Core
})(Core || (Core = {}))
