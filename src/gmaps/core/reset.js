
var Core = ((Core, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Core.reset = function(parms) {
    const comp      = parms.comp
    const compArray = parms.compArray
    const ids       = parms.ids

    if ($.isArray(ids)) {
      return _multiReset(compArray, ids)
    }

    if (comp) {
      if (comp.type === ComponentType.MAP) {
        comp.obj.fitBounds(comp.init.bounds)
      }
      return _reset(comp)
    }
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------

  function _reset(comp) {
    comp.obj.setOptions(comp.init.options)
    return comp
  }

  function _multiReset(compArray, ids) {
    const newCompArray = Util.getNewComponentArray(compArray)

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      const comp = compArray.findById(ids[i])
      if (comp) {
        newCompArray.push(_reset(comp))
      }
    }

    return newCompArray
  }


  return Core
})(Core || (Core = {}), Const.ComponentType)
