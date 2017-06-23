// ------------------------------------------------------------------------
// GMaps: core/remove.js
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
      const comp = compArray.Data.pop()
      comp.Obj.setMap(null)
      return comp
    },
    shift: function(compArray) {
      const comp = compArray.Data.shift()
      comp.Obj.setMap(null)
      return comp
    }
  }


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Core.pop = function(parms) {
    const count = parms.count || 1
    const map   = parms.map
    const type  = Util.getComponentType(parms.type)
    return _pop(map.Components[type], count, Action.POP)
  }

  Core.remove = function(parms) {
    let ids    = parms.ids
    const map  = parms.map
    const type = Util.getComponentType(parms.type)

    if (Util.validMapComponent(type)) {
      const compArray = map.Components[type]
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
    const type  = Util.getComponentType(parms.type)
    return _pop(map.Components[type], count, Action.SHIFT)
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _remove(comp) {
    const compArray = comp.Map.Components[comp.Type]
    const index     = compArray.Data.indexOf(comp)

    comp.Obj.setMap(null)
    return compArray.Data.splice(index, 1)[0]
  }

  function _multiRemove(compArray, ids) {
    const newCompArray = new Components[compArray.Type]({ map: compArray.Map })

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      const comp = compArray.findById(ids[i])
      if (comp) {
        newCompArray.push(_remove(comp))
      }
    }

    return newCompArray
  }

  function _pop(compArray, count, action) {
    const newCompArray = new Components[compArray.Type]({ map: compArray.Map })

    while (count > 0 && compArray.Data.length > 0) {
      newCompArray.push(RemoveFunction[action](compArray))
      count --
    }

    return newCompArray
  }


  return Core
})(Core || (Core = {}))
