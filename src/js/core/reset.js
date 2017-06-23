// ------------------------------------------------------------------------
// GMaps: core/reset.js
// ------------------------------------------------------------------------

var Core = ((Core, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Core.reset = function(parms) {
    const compArray = parms.compArray
    const ids       = parms.ids

    if (compArray.Type === ComponentType.MAP) {
      compArray.Obj.fitBounds(compArray.Init.Bounds)
      return _reset(compArray)
    }

    if ($.isArray(ids)) {
      return _multiReset(compArray, ids)
    }

    const comp = compArray.findByID(ids)
    if (comp) {
      return _reset(comp)
    }
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _reset(comp) {
    comp.Obj.setOptions(comp.Init.Options)
    return comp
  }

  function _multiReset(compArray, ids) {
    const newCompArray = new Components[compArray.Type]({ map: compArray.Map })

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
