// ------------------------------------------------------------------------
// GMaps: add.js
// ------------------------------------------------------------------------

!((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const ErrorMessages = {
    IdExists: function(type, id) {
      return "Error: A " + type + " with the id " + id + " already exists"
    },
    ParmIsRequired: function(parm) {
      return "Error: " + parm + " is required"
    }
  }

  const RequiredParms = {
    Label: [
      "id", "position"
    ],
    Marker: [
      "id", "position"
    ],
    Polygon: [
      "id", "paths"
    ]
  }


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  Core.addComponent = function(map, type, parms) {
    type = gmap.Util.getComponentType(type)

    if ($.type(parms) == "array") {
      return _multiAdd(map, type, parms)
    }

    if ($.type(parms) == "object") {
      if (_validateParms(map, type, parms)) {
        const newCompArray = new gmap[type + "Array"](map)
        newCompArray[parms.id] = _add(map, type, parms)
        return newCompArray
      }
    }
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _add(map, type, parms) {
    parms = gmap.Util.convertCompOptions(type, parms)
    let options = _mergeDefaults(map, type, parms)
    return map.Components[type][parms.id] = new gmap[type](parms.id, options)
  }

  function _multiAdd(map, type, parmsArray) {
    const newCompArray = new gmap[type + "Array"](map)

    for (var i = 0, i_end = parmsArray.length; i < i_end; i++) {
      let parms = parmsArray[i]

      if (_validateParms(map, type, parms)) {
        newCompArray[parms.id] = _add(map, type, parms)
      }
    }

    return newCompArray
  }

  function _mergeDefaults(map, type, parms) {
    const defaults = map.Config[type + "Options"] || {}
    const options = $.extend({}, defaults, parms)
    options.map = map.Obj

    // delete any parms that are only for gmaps
    delete options.id

    return options
  }

  function _validateParms(map, type, parms) {
    for (var i = 0, i_end = RequiredParms[type].length; i < i_end; i++) {
      let reqParm = RequiredParms[type][i]

      if (!parms[reqParm]) {
        throw ErrorMessages.ParmIsRequired(reqParm)
      }
    }

    if (map.Components[type][parms.id]) {
      throw ErrorMessages.IdExists(type, parms.id)
    }

    return true
  }


  return Core
})(gmap.Core || (gmap.Core = {}))
