
var Get = ((Get) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Get.convertedOptions = function({map, options, type}) {
    const convertableOptions = Get.filteredOptions({
      filter : "convertable",
      type   : type
    })

    for (var i = 0, i_end = convertableOptions.length; i < i_end; i++) {
      const opt = convertableOptions[i]
      Conversions[opt.name](arguments[0])
    }

    return options
  }

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
    return FormatID[$.type(id)](id) || FormatID["auto"](arguments[0])
  }

  Get.mergedOptions = function({map, options, type, convert}) {
    const args      = arguments[0]
    const namespace = Lookup.setting(`${type}Options`)
    const defaults  = map.settings[namespace] || {}
    options         = $.extend({}, defaults, options)
    options.map     = map.obj

    return convert
      ? Get.convertedOptions(args)
      : options
  }

  Get.renamedOptions = function({options}) {
    Object.keys(options).forEach(function(key) {
      Util.renameProperty({
        newName : Lookup.overlayOption(key),
        obj     : options,
        oldName : key
      })
    })

    return options
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------

  const Conversions = {
    bounds({options, map}) {
      if (options.bounds) {
        options.bounds = Convert.toLatLngBounds({
          map : map,
          val : options.bounds
        })
      }
    },
    center({options, map}) {
      if (options.center) {
        options.center = Convert.toLatLng({
          map : map,
          val : options.center
        })
      }
    },
    path({options, map}) {
      if (options.path) {
        options.path = Convert.toLatLngArray({
          map : map,
          val : options.path
        })
      }
    },
    paths({options, map}) {
      if (options.paths || options.path) {
        options.paths = Convert.toLatLngArray({
          map : map,
          val : options.paths || options.path
        })
        delete options.path
      }
    },
    position({options, map}) {
      if (options.position) {
        options.position = Convert.toLatLng({
          map : map,
          val : options.position
        })
      }
    }
  }

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
