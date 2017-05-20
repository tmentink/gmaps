// ------------------------------------------------------------------------
// GMaps: reset.js
// ------------------------------------------------------------------------

!((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  Core.reset = function(comp, ids) {
    if (comp.Type == gmap.Const.ComponentType.MAP) {
      comp.Obj.fitBounds(comp.Init.Bounds)
      return _reset(comp)
    }

    if ($.isArray(ids)) {
      return _multiReset(comp, ids)
    }

    if (comp[ids]) {
      return _reset(comp[ids])
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
    const newCompArray = new gmap[compArray.Type](compArray.Map)

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let comp = compArray[ids[i]]

      if (comp) {
        newCompArray[ids[i]] = _reset(comp)
      }
    }

    return newCompArray
  }


  return Core
})(gmap.Core || (gmap.Core = {}))
