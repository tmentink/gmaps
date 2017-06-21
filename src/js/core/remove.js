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

    const comp = compArray.find(ids)
    if (comp) {
      return _remove(comp)
    }
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _remove(comp) {
    const compArray = comp.Map.Components[comp.Type]
    const index     = compArray.Data.indexOf(comp)

    comp.Obj.setMap(null)
    return compArray.Data.splice(index, 1)
  }

  function _multiRemove(compArray, ids) {
    const newCompArray = new Components[compArray.Type]({ map: compArray.Map })

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      const comp = compArray.find(ids[i])
      if (comp) {
        newCompArray.push(_remove(comp))
      }
    }

    return newCompArray
  }


  return Core
})(Core || (Core = {}))
