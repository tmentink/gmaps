// ------------------------------------------------------------------------
// GMaps: core/add.js
// ------------------------------------------------------------------------

!((Core, Util) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const RequiredParms = {
    Label:   [ "id", "position" ],
    Marker:  [ "id", "position" ],
    Polygon: [ "id", ["path", "paths"] ]
  }


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  Core.addComponent = function(map, type, parms) {
    type = Util.getComponentType(type)

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
    parms = Util.convertCompOptions(type, parms)
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
      let reqParm = Util.toArray(RequiredParms[type][i])

      if (_noParmsFound(reqParm, parms)) {
        return Util.throwError({
          method: "add" + type,
          message: reqParm.join(" or ") + " must have a value",
          obj: parms
        })
      }
    }

    if (map.Components[type][parms.id]) {
      return Util.throwError({
        method: "add" + type,
        message: "A " + type + " with an id of " + parms.id + " already exists",
        obj: parms
      })
    }

    return true
  }

  function _noParmsFound(reqParms, parms) {
    return reqParms.map(function(key) {
      return parms[key] != undefined && parms[key] !== ""
    }).indexOf(true) == -1
  }


  return Core
})(gmap.Core || (gmap.Core = {}), gmap.Util)
