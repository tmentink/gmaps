// ------------------------------------------------------------------------
// gmaps: core/add.js
// ------------------------------------------------------------------------

var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Core.addComponent = function(parms) {
    const compOptions = parms.compOptions
    const map         = parms.map
    const type        = Util.lookupComponentType(parms.type)

    if (Util.validMapComponent(type)) {

      if ($.type(compOptions) === "array") {
        return _multiAdd(map, type, compOptions)
      }

      if ($.type(compOptions) === "object") {
        if (_validateOptions(map, type, compOptions)) {
          const newCompArray = Util.getNewComponentArray(type, map)
          newCompArray.push(_add(map, type, compOptions))
          return newCompArray
        }
      }
    }
    else {
      return Util.throwError({
        method  : "add",
        message : `${type} is not a valid map component`,
        obj     : {type: type}
      })
    }
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _add(map, type, compOptions) {
    compOptions = Util.convertComponentOptions({
      compType    : type,
      compOptions : compOptions,
      map         : map
    })

    if ($.type(compOptions.id) !== "string" &&
        $.type(compOptions.id) !== "number") {
      compOptions.id = _getAutoId(map, type)
    }

    const comp = new Components[type]({
      id      : compOptions.id.toString(),
      options : _mergeDefaults(map, type, compOptions)
    })

    map.components[type].push(comp)
    return comp
  }

  function _multiAdd(map, type, compOptionsArray) {
    const newCompArray = Util.getNewComponentArray(type, map)

    for (var i = 0, i_end = compOptionsArray.length; i < i_end; i++) {
      const compOptions = compOptionsArray[i]

      if (_validateOptions(map, type, compOptions)) {
        newCompArray.push(_add(map, type, compOptions))
      }
    }

    return newCompArray
  }

  function _getAutoId(map, type) {
    const id = map.components[type].seed++
    return `__${id}__`
  }

  function _mergeDefaults(map, type, compOptions) {
    const namespace = Util.lookupSetting(`${type}Options`)
    const defaults  = map.settings[namespace] || {}
    const options   = $.extend({}, defaults, compOptions)
    options.map     = map.obj

    // delete any options that are only for gmaps
    delete options.id

    return options
  }


  // ----------------------------------------------------------------------
  // Validation Functions
  // ----------------------------------------------------------------------

  function _getRequiredOptions(compType) {
    return Const.Components[compType].options.filter(function(option) {
      return option.required === true
    })
  }

  function _requiredOptionIsEmpty(reqOption, compOptions) {
    return compOptions[reqOption] === ""
        || compOptions[reqOption] === null
        || compOptions[reqOption] === undefined
  }

  function _validateOptions(map, compType, compOptions) {

    // Check if Id already exists
    if (map.components[compType].includes(compOptions.id) === true) {
      return Util.throwError({
        method  : "add",
        message : `A ${compType} with an id of ${compOptions.id} already exists`,
        obj     : compOptions
      })
    }

    // Check if all required options have values
    const requiredOptions = _getRequiredOptions(compType)
    for (var i = 0, i_end = requiredOptions.length; i < i_end; i++) {
      const reqOption = requiredOptions[i].name

      if (_requiredOptionIsEmpty(reqOption, compOptions)) {
        return Util.throwError({
          method  : "add",
          message : `${reqOption} must have a value`,
          obj     : compOptions
        })
      }
    }

    return true
  }


  return Core
})(Core || (Core = {}))
