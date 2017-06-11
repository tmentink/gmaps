// ------------------------------------------------------------------------
// GMaps: core/remove.js
// ------------------------------------------------------------------------

var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Core.remove = function(parms) {
    const compArray = parms.compArray
    const ids       = parms.ids

    if ($.isArray(ids)) {
      return _multiRemove(compArray, ids)
    }

    if (compArray[ids]) {
      return _remove(compArray[ids])
    }
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _remove(comp) {
    comp.Obj.setMap(null)

    // since you cant delete local variables in strict mode
    delete comp.Map.Components[comp.Type][comp.Id]

    return comp
  }

  function _multiRemove(compArray, ids) {
    const newCompArray = new Components[compArray.Type]({ map: compArray.Map })

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      const comp = compArray[ids[i]]

      if (comp) {
        newCompArray[ids[i]] = _remove(comp)
      }
    }

    return newCompArray
  }


  return Core
})(Core || (Core = {}))
