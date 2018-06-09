
var Get = ((Get) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Get.filteredOptions = function({type, filter}) {
    const options    = Const.Overlays[type].options
    const filterType = {
      string   : (opt) => opt[filter] === true,
      function : filter,
    }

    return options.filter(filterType[Get.type(filter)])
  }

  Get.formattedId = function({map, options, type}) {
    return FormatID[Get.type(options.id)](arguments[0])
  }

  Get.mergedOptions = function({map, options, type, convert}) {
    const args       = arguments[0]
    const namespace  = Lookup.setting(`${type}Options`)
    const defaults   = map.settings[namespace] || {}
    args.options     = Util.extend({}, defaults, options)
    args.options.map = map.obj

    return convert
      ? Get.convertedOptions(args)
      : args.options
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------

  const FormatID = {
    number({options}) {
      return options.id.toString()
    },
    string({options}) {
      return options.id
    },
    undefined({map, type}) {
      return `__${map.overlays[type].seed++}__`
    }
  }


  return Get
})(Get || (Get = {}))
