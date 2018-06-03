
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

    return options.filter(filterType[$.type(filter)])
  }

  Get.formattedId = function({map, options, type}) {
    const id = options.id
    return FormatID[Get.type(id)](id) || FormatID["auto"](arguments[0])
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
    auto({map, type}) {
      return `__${map.overlays[type].seed++}__`
    },
    number(id) {
      return id.toString()
    },
    string(id) {
      return id
    }
  }


  return Get
})(Get || (Get = {}))
