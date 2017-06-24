// ------------------------------------------------------------------------
// gmaps: core/options.js
// ------------------------------------------------------------------------

var Core = ((Core, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Core.getOptions = function(parms) {
    const compArray = parms.compArray
    let compOption  = parms.compOption || null
    const compType  = parms.compType
    const ids       = parms.ids
    let retVal      = {}

    if (compType === ComponentType.MAP) {
      retVal = _getComponentOptions(compArray, compOption)
    }
    else {
      for (var i = 0, i_end = ids.length; i < i_end; i++) {
        const id   = ids[i]
        const comp = compArray.findById(id)
        if (comp) {
          retVal[id] = _getComponentOptions(comp, compOption)
        }
      }
    }

    return retVal ? _formatRetVal(retVal) : undefined
  }

  Core.setOptions = function(parms) {
    const compArray = parms.compArray
    let compOptions = parms.compOptions
    const compType  = parms.compType
    const ids       = parms.ids
    const value     = parms.value
    compOptions     = _formatComponentOptions(compOptions, compType, value)

    if (compType === ComponentType.MAP) {
      return _setOptions(compArray, compOptions)
    }

    if ($.isArray(ids)) {
      return _multiSetOptions(compArray, ids, compOptions)
    }

    const comp = compArray.findById(ids)
    if (comp) {
      return _setOptions(comp, compOptions)
    }
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _formatComponentOptions(compOptions, compType, value) {
    if ($.type(compOptions) === "string") {
      const optionName = Util.getComponentOption(compOptions)
      compOptions = {}
      compOptions[optionName] = value
    }
    else {
      Util.renameComponentOptions(compOptions)
    }

    return compOptions = Util.convertComponentOptions({
      compOptions : compOptions,
      compType    : compType
    })
  }

  function _formatRetVal(retVal) {
    const keys = Object.keys(retVal)
    return keys.length === 1 ? retVal[keys[0]] : retVal
  }

  function _getComponentOptions(comp, compOptions) {
    compOptions = Util.getComponentOption(compOptions)
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
})(Core || (Core = {}), Const.ComponentType)

