
var Get = ((Get) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Get.convertedMapOptions = function({map, options}) {
    const mapOptions      = Const.Map.options
    const convertableOpts = mapOptions.filter(opt => opt["convertable"] === true)

    return convertOptions({convertableOpts, map, options})
  }

  Get.convertedOptions = function({map, options, type}) {
    const convertableOpts = Get.filteredOptions({
      filter : "convertable",
      type   : type
    })

    return convertOptions({convertableOpts, map, options})
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

  function convertOptions({convertableOpts, map, options}) {
    for (var i = 0, i_end = convertableOpts.length; i < i_end; i++) {
      const opt = convertableOpts[i]
      Conversions[opt.name]({map, options})
    }

    return options
  }


  return Get
})(Get || (Get = {}))
