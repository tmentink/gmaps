// ------------------------------------------------------------------------
// GMaps: core/add.js
// ------------------------------------------------------------------------

var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const RequiredParms = {
    Label   : [ "id", "position" ],
    Marker  : [ "id", "position" ],
    Polygon : [ "id", ["path", "paths"] ]
  }


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Core.addComponent = function(parms) {
    const compOptions = parms.compOptions
    const map         = parms.map
    const type        = Util.getComponentType(parms.type)

    if ($.type(compOptions) === "array") {
      return _multiAdd(map, type, compOptions)
    }

    if ($.type(compOptions) === "object") {
      if (_validateParms(map, type, compOptions)) {
        const newCompArray = _createNewCompArray(type, map)
        newCompArray[compOptions.id] = _add(map, type, compOptions)
        return newCompArray
      }
    }
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _add(map, type, compOptions) {
    compOptions = Util.convertCompOptions({
      compType    : type,
      compOptions : compOptions
    })

    const comp = new Components[type]({
      id      : compOptions.id,
      options : _mergeDefaults(map, type, compOptions)
    })

    return map.Components[type][compOptions.id] = comp
  }

  function _multiAdd(map, type, compOptionsArray) {
    const newCompArray = _createNewCompArray(type, map)

    for (var i = 0, i_end = compOptionsArray.length; i < i_end; i++) {
      const compOptions = compOptionsArray[i]

      if (_validateParms(map, type, compOptions)) {
        newCompArray[compOptions.id] = _add(map, type, compOptions)
      }
    }

    return newCompArray
  }

  function _createNewCompArray(type, map) {
    return new Components[type + "Array"]({ map: map })
  }

  function _mergeDefaults(map, type, parms) {
    const defaults = map.Config[type + "Options"] || {}
    const options  = $.extend({}, defaults, parms)
    options.map    = map.Obj

    // delete any parms that are only for gmaps
    delete options.id

    return options
  }

  function _noParmsFound(reqParms, parms) {
    return reqParms.map(function(key) {
      return parms[key] !== undefined && parms[key] !== ""
    }).indexOf(true) === -1
  }

  function _validateParms(map, type, parms) {
    for (var i = 0, i_end = RequiredParms[type].length; i < i_end; i++) {
      const reqParm = Util.toArray(RequiredParms[type][i])

      if (_noParmsFound(reqParm, parms)) {
        return Util.throwError({
          method  : "add" + type,
          message : reqParm.join(" or ") + " must have a value",
          obj     : parms
        })
      }
    }

    if (map.Components[type][parms.id]) {
      return Util.throwError({
        method  : "add" + type,
        message : "A " + type + " with an id of " + parms.id + " already exists",
        obj     : parms
      })
    }

    return true
  }


  return Core
})(Core || (Core = {}))
