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

  // map     {gmap}
  // options {object}
  // type    {string}
  Get.convertedOptions = function(p) {
    const convertableOptions = Get.filteredOptions({
      filter : "convertable",
      type   : p.type
    })

    for (var i = 0, i_end = convertableOptions.length; i < i_end; i++) {
      const opt = convertableOptions[i]
      Conversions[opt.name](p.options, p.map)
    }

    return p.options
  }

  // filter {string}
  // type   {string}
  Get.filteredOptions = function(p) {
    const options = Const.Overlays[p.type].options
    return options.filter(opt => opt[p.filter] === true)
  }

  // id   {string || number}
  // map  {gmap}
  // type {string}
  Get.formattedId = function(p) {
    return FormatID[$.type(p.id)](p.id) || FormatID["auto"](p.map, p.type)
  }

  // convert {boolean}
  // map     {gmap}
  // options {object}
  // type    {string}
  Get.mergedOptions = function(p) {
    const namespace = Lookup.setting(`${p.type}Options`)
    const defaults  = p.map.settings[namespace] || {}

    p.options     = $.extend({}, defaults, p.options)
    p.options.map = p.map.obj

    return p.convert
      ? Get.convertedOptions(p)
      : p.options
  }


  return Get
})(Get || (Get = {}))
