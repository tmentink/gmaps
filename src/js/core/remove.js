// ------------------------------------------------------------------------
// gmaps: core/remove.js
// ------------------------------------------------------------------------

var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const Action = {
    POP    : "pop",
    SHIFT  : "shift"
  }

  const RemoveFunction = {
    pop: function(compArray) {
      const comp = compArray.data.pop()
      comp.obj.setMap(null)
      return comp
    },
    shift: function(compArray) {
      const comp = compArray.data.shift()
      comp.obj.setMap(null)
      return comp
    }
  }


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Core.pop = function(parms) {
    const count = parms.count || 1
    const map   = parms.map
    const type  = Util.lookupComponentType(parms.type)
    return _pop(map.components[type], count, Action.POP)
  }

  Core.remove = function(parms) {
    let ids    = parms.ids
    const map  = parms.map
    const type = Util.lookupComponentType(parms.type)

    if (Util.validMapComponent(type)) {
      const compArray = map.components[type]
      ids = ids || compArray.getIds()

      if ($.isArray(ids)) {
        return _multiRemove(compArray, ids)
      }

      const comp = compArray.findById(ids)
      if (comp) {
        return _remove(comp)
      }
    }
    else {
      return Util.throwError({
        method  : "remove",
        message : `${type} is not a valid map component`,
        obj     : {type: type}
      })
    }
  }

  Core.shift = function(parms) {
    const count = parms.count || 1
    const map   = parms.map
    const type  = Util.lookupComponentType(parms.type)
    return _pop(map.components[type], count, Action.SHIFT)
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _remove(comp) {
    const compArray = comp.map.components[comp.type]
    const index     = compArray.data.indexOf(comp)

    comp.obj.setMap(null)
    return compArray.data.splice(index, 1)[0]
  }

  function _multiRemove(compArray, ids) {
    const newCompArray = Util.getNewComponentArray(compArray)

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      const comp = compArray.findById(ids[i])
      if (comp) {
        newCompArray.push(_remove(comp))
      }
    }

    return newCompArray
  }

  function _pop(compArray, count, action) {
    const newCompArray = Util.getNewComponentArray(compArray)

    while (count > 0 && compArray.data.length > 0) {
      newCompArray.push(RemoveFunction[action](compArray))
      count --
    }

    return newCompArray
  }


  return Core
})(Core || (Core = {}))
