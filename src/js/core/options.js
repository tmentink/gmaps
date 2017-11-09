// ------------------------------------------------------------------------
// gmaps: core/options.js
// ------------------------------------------------------------------------

var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Core.getOptions = function(parms) {
    let comp        = parms.comp
    const compArray = parms.compArray
    let compOption  = parms.compOption || null
    const ids       = parms.ids
    let retVal      = {}

    if (comp) {
      retVal = _getComponentOptions(comp, compOption)
    }
    else {
      for (var i = 0, i_end = ids.length; i < i_end; i++) {
        const id = ids[i]
        comp     = compArray.findById(id)
        if (comp) {
          retVal[id] = _getComponentOptions(comp, compOption)
        }
      }
    }

    return retVal ? _formatRetVal(retVal) : undefined
  }

  Core.setOptions = function(parms) {
    const comp      = parms.comp
    const compArray = parms.compArray
    let compOptions = parms.compOptions
    const compType  = parms.compType
    const ids       = parms.ids
    const map       = parms.map
    const value     = parms.value
    compOptions     = _formatComponentOptions(compOptions, compType, map, value)

    if ($.isArray(ids)) {
      return _multiSetOptions(compArray, ids, compOptions)
    }

    if (comp) {
      return _setOptions(comp, compOptions)
    }
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _formatComponentOptions(compOptions, compType, map, value) {
    if ($.type(compOptions) === "string") {
      const optionName = Util.lookupComponentOption(compOptions)
      compOptions = {}
      compOptions[optionName] = value
    }
    else {
      Util.renameComponentOptions(compOptions)
    }

    return compOptions = Util.convertComponentOptions({
      compOptions : compOptions,
      compType    : compType,
      map         : map
    })
  }

  function _formatRetVal(retVal) {
    const keys = Object.keys(retVal)
    return keys.length === 1 ? retVal[keys[0]] : retVal
  }

  function _getComponentOptions(comp, compOptions) {
    compOptions = Util.lookupComponentOption(compOptions)
    const obj   = $.extend({}, comp.obj)

    if (compOptions) {
      return obj[compOptions]
    }

    return Util.cleanComponentOptions({
      compOptions : obj,
      compType    : comp.type
    })
  }

  function _setOptions(comp, options) {
    comp.obj.setOptions(options)
    return comp
  }

  function _multiSetOptions(compArray, ids, options) {
    const newCompArray = Util.getNewComponentArray(compArray)

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      const comp = compArray.findById(ids[i])
      if (comp) {
        newCompArray.push(_setOptions(comp, options))
      }
    }

    return newCompArray
  }


  return Core
})(Core || (Core = {}))

