// ------------------------------------------------------------------------
// gmaps: util/get/overlayOptions.js
// ------------------------------------------------------------------------

var Get = ((Get) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const Conversions = {
    bounds: function(options, map) {
      if (options.bounds) {
        options.bounds = Convert.toLatLngBounds({
          map : map,
          val : options.bounds
        })
      }
    },
    center: function(options, map) {
      if (options.center) {
        options.center = Convert.toLatLng({
          map : map,
          val : options.center
        })
      }
    },
    path: function(options, map) {
      if (options.path) {
        options.path = Convert.toLatLngArray({
          map : map,
          val : options.path
        })
      }
    },
    paths: function(options, map) {
      if (options.paths || options.path) {
        options.paths = Convert.toLatLngArray({
          map : map,
          val : options.paths || options.path
        })
        delete options.path
      }
    },
    position: function(options, map) {
      if (options.position) {
        options.position = Convert.toLatLng({
          map : map,
          val : options.position
        })
      }
    }
  }

  const FormatID = {
    auto: function(map, type) {
      return `__${map.overlays[type].seed++}__`
    },
    number: function(id) {
      return id.toString()
    },
    string: function(id) {
      return id
    }
  }


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  Get.convertedOptions = function({map, options, type}) {
    const convertableOptions = Get.filteredOptions({
      filter : "convertable",
      type   : type
    })

    for (var i = 0, i_end = convertableOptions.length; i < i_end; i++) {
      const opt = convertableOptions[i]
      Conversions[opt.name](options, map)
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
    return FormatID[$.type(id)](id) || FormatID["auto"](map, type)
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


  return Get
})(Get || (Get = {}))
