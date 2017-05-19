// ------------------------------------------------------------------------
// GMaps: update.js
// ------------------------------------------------------------------------

!((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const ErrorMessages = {
    MustSupplyOptions: "Error: Must supply options"
  }


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  Core.update = function(comp, ids, options) {
    if (options == undefined) {
      throw ErrorMessages.MustSupplyOptions
    }
    options = gmap.Util.convertCompOptions(comp.Type, options)

    if (comp.Type == gmap.Const.Component.Type.MAP) {
      return _update(comp, options)
    }

    if ($.isArray(ids)) {
      return _multiUpdate(comp, ids, options)
    }

    if (comp[ids]) {
      return _update(comp[ids], options)
    }
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _update(comp, options) {
    comp.Obj.setOptions(options)
    return comp
  }

  function _multiUpdate(compArray, ids, options) {
    const newCompArray = new gmap[compArray.Type](compArray.Map)

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let comp = compArray[ids[i]]

      if (comp) {
        newCompArray[ids[i]] = _update(comp, options)
      }
    }

    return newCompArray
  }


  return Core
})(gmap.Core || (gmap.Core = {}))
