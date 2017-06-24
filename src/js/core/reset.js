// ------------------------------------------------------------------------
// gmaps: core/reset.js
// ------------------------------------------------------------------------

var Core = ((Core, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Core.reset = function(parms) {
    const compArray = parms.compArray
    const ids       = parms.ids

    if (compArray.type === ComponentType.MAP) {
      compArray.obj.fitBounds(compArray.init.bounds)
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
    comp.obj.setOptions(comp.init.options)
    return comp
  }

  function _multiReset(compArray, ids) {
    const newCompArray = new Components[compArray.type]({ map: compArray.map })

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
