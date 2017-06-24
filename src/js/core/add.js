// ------------------------------------------------------------------------
// GMaps: core/add.js
// ------------------------------------------------------------------------

var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const RequiredParms = {
    Label   : [ "position", "text" ],
    Marker  : [ "position" ],
    Polygon : [ ["path", "paths"] ]
  }


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Core.addComponent = function(parms) {
    const compOptions = parms.compOptions
    const map         = parms.map
    const type        = Util.getComponentType(parms.type)

    if (Util.validMapComponent(type)) {

      if ($.type(compOptions) === "array") {
        return _multiAdd(map, type, compOptions)
      }

      if ($.type(compOptions) === "object") {
        if (_validateParms(map, type, compOptions)) {
          const newCompArray = _createNewCompArray(type, map)
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
      compOptions : compOptions
    })

    if (compOptions.id === undefined) {
      compOptions.id = _getAutoId(map, type)
    }

    const comp = new Components[type]({
      id      : compOptions.id,
      options : _mergeDefaults(map, type, compOptions)
    })

    map.Components[type].push(comp)
    return comp
  }

  function _multiAdd(map, type, compOptionsArray) {
    const newCompArray = _createNewCompArray(type, map)

    for (var i = 0, i_end = compOptionsArray.length; i < i_end; i++) {
      const compOptions = compOptionsArray[i]

      if (_validateParms(map, type, compOptions)) {
        newCompArray.push(_add(map, type, compOptions))
      }
    }

    return newCompArray
  }

  function _createNewCompArray(type, map) {
    return new Components[type + "Array"]({ map: map })
  }

  function _getAutoId(map, type) {
    const id = map.Components[type].Seed++
    return `__${id}__`
  }

  function _mergeDefaults(map, type, parms) {
    const defaults = map.Config[type + "Options"] || {}
    const options  = $.extend({}, defaults, parms)
    options.map    = map.Obj

    // delete any parms that are only for gmaps
    delete options.id

    return options
  }


  // ----------------------------------------------------------------------
  // Validation Functions
  // ----------------------------------------------------------------------

  function _requiredParmsAreEmpty(reqParms, parms) {
    return reqParms.map(function(key) {
      return parms[key] !== ""
          && parms[key] !== null
          && parms[key] !== undefined
          && parms[key] !== false
    }).indexOf(true) === -1
  }

  function _validateParms(map, type, parms) {

    // Check if Id already exists
    if (map.Components[type].includes(parms.id) === true) {
      return Util.throwError({
        method  : "add",
        message : `A ${type} with an id of ${parms.id} already exists`,
        obj     : parms
      })
    }

    // Check if all required parms have values
    for (var i = 0, i_end = RequiredParms[type].length; i < i_end; i++) {
      const reqParm = Util.toArray(RequiredParms[type][i])

      if (_requiredParmsAreEmpty(reqParm, parms)) {
        return Util.throwError({
          method  : "add",
          message : `${reqParm.join(" or ")} must have a value`,
          obj     : parms
        })
      }
    }

    return true
  }


  return Core
})(Core || (Core = {}))
