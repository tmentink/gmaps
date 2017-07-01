// ------------------------------------------------------------------------
// gmaps: util/components.js
// ------------------------------------------------------------------------

var Util = ((Util) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const Conversions = {
    bounds: function(parms) {
      if (parms.bounds) {
        parms.bounds = Util.toLatLngBounds(parms.bounds)
      }
    },
    center: function(parms) {
      if (parms.center) {
        parms.center = Util.toLatLng(parms.center)
      }
    },
    paths: function(parms) {
      if (parms.paths || parms.path) {
        parms.paths = Util.toLatLngArray(parms.paths || parms.path)
        delete parms.path
      }
    },
    position: function(parms) {
      if (parms.position) {
        parms.position = Util.toLatLng(parms.position)
      }
    }
  }


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Util.cleanComponentOptions = function(parms) {
    const compOptions     = parms.compOptions
    const compType        = parms.compType.replace("Array", "")
    const compTypeOptions = _getComponentOptions(compType)

    Object.keys(compOptions).forEach(function(key) {
      if (compTypeOptions.indexOf(key) === -1) {
        delete compOptions[key]
      }
    })
    return compOptions
  }

  Util.convertComponentOptions = function(parms) {
    const compOptions        = parms.compOptions
    const compType           = parms.compType.replace("Array", "")
    const convertableOptions = _getConvertableOptions(compType)

    for (var i = 0, i_end = convertableOptions.length; i < i_end; i++) {
      const option = convertableOptions[i]
      Conversions[option.name](compOptions)
    }

    return compOptions
  }

  Util.copy = function(parms) {
    const compArray = parms.compArray
    const new_comp  = Util.getNewComponentArray(compArray)
    const proto     = _getPrototypes(compArray)
    const copy      = $.extend(true, new_comp, compArray)

    // remove proto from copy
    for (var i = 0, i_end = proto.length; i < i_end; i++) {
      delete copy[proto[i]]
    }

    return copy
  }

  Util.getNewComponentArray = function(compArray, map) {
    if ($.type(compArray) === "string") {
      return new Components[`${compArray}Array`]({ map: map })
    }

    return new Components[compArray.type]({ map: compArray.map })
  }

  Util.renameComponentOptions = function(compOptions) {
    Object.keys(compOptions).forEach(function(key) {
      Util.renameProperty({
        newName : Util.lookupComponentOption(key),
        obj     : compOptions,
        oldName : key
      })
    })
    return compOptions
  }

  Util.validComponentOption = function(parms) {
    const compOption = parms.compOption
    const compType   = parms.compType
    return _getComponentOptions(compType).includes(compOption)
  }

  Util.validMapComponent = function(compType) {
    return compType !== "Map" &&
           Object.keys(Const.Components).includes(compType)
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _getConvertableOptions(compType) {
    return Const.Components[compType].options.filter(function(option) {
      return option.convertable === true
    })
  }

  function _getComponentOptions(compType) {
    return Const.Components[compType].options.map(function(option) {
      return option.name
    })
  }

  function _getPrototypes(compArray) {
    const proto      = Object.keys(Object.getPrototypeOf(compArray))
    const base_proto = Object.keys(
      Object.getPrototypeOf(new Components.BaseComponentArray({}))
    )

    return proto.concat(base_proto)
  }


  return Util
})(Util || (Util = {}))
