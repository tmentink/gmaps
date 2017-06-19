// ------------------------------------------------------------------------
// GMaps: core/update.js
// ------------------------------------------------------------------------

var Core = ((Core, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Core.update = function(parms) {
    const compArray = parms.compArray
    let compOptions = parms.compOptions
    const ids       = parms.ids
    const type      = compArray.ChildType || compArray.Type

    if (compOptions === undefined) {
      return Util.throwError({
        method  : "update",
        message : "Must supply " + type + " options"
      })
    }

    compOptions = Util.convertCompOptions({
      compType    : type,
      compOptions : compOptions
    })

    if (type === ComponentType.MAP) {
      return _update(compArray, compOptions)
    }

    if ($.isArray(ids)) {
      return _multiUpdate(compArray, ids, compOptions)
    }

    if (compArray[ids]) {
      return _update(compArray[ids], compOptions)
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
    const newCompArray = new Components[compArray.Type]({ map: compArray.Map })

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      const comp = compArray[ids[i]]

      if (comp) {
        newCompArray[ids[i]] = _update(comp, options)
      }
    }

    return newCompArray
  }


  return Core
})(Core || (Core = {}), Const.ComponentType)
