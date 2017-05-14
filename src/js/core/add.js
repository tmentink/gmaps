// ------------------------------------------------------------------------
// GMaps: add.js
// ------------------------------------------------------------------------

!((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

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
      if (_validParameters(map, type, parms)) {
        return _add(map, type, parms)
      }
    }
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _add(map, type, parms) {
    // TODO: make this intelligent on what parms are required
    if ($.type(parms.path) == "string") {
      parms.path = gmap.Util.toLatLngArray(parms.path)
    }

    if ($.type(parms.paths) == "string") {
      parms.paths = gmap.Util.toLatLngArray(parms.paths)
    }

    if ($.type(parms.position) == "string") {
      parms.position = gmap.Util.toLatLng(parms.position)
    }


    const defaults = map.Config[type + "Options"] || {}
    const options = $.extend({}, defaults, parms.options)
    options.map = map.Obj
    options.paths = parms.paths || parms.path
    options.position = parms.position
    options.text = parms.text || parms.id

    map.Components[type][parms.id] = new gmap[type](parms.id, options)
    return map.Components[type][parms.id]
  }

  function _multiAdd(map, type, parmsArray) {
    const newCompArray = new gmap[type + "Array"](map)

    for (var i = 0, i_end = parmsArray.length; i < i_end; i++) {
      let parms = parmsArray[i]

      if (_validParameters(map, type, parms)) {
        newCompArray[parms.id] = _add(map, type, parms)
      }
    }

    return newCompArray
  }

  function _validParameters(map, type, parms) {
    const required = RequiredParms[type]
    for (var i = 0, i_end = required.length; i < i_end; i++) {
      if (!parms[required[i]]) {
        throw "Error: " + required[i] + " is required"
      }
    }

    if (map.Components[type][parms.id]) {
      throw "Error: Id already exists"
    }

    return true
  }


  return Core
})(gmap.Core || (gmap.Core = {}))
