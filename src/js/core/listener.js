// ------------------------------------------------------------------------
// GMaps: core/listener.js
// ------------------------------------------------------------------------

!((Core, Util, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const Action = {
    ADD         : "add",
    REMOVE_ALL  : "remove_all",
    REMOVE_TYPE : "remove_type",
  }

  const Execute = {
    add: function(comp, type, fn) {
      return _add(comp, type, fn)
    },
    remove_all: function(comp) {
      return _removeAll(comp)
    },
    remove_type: function(comp, type) {
      return _removeType(comp, type)
    }
  }


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Core.addListener = function(parms) {
    const compArray = parms.compArray
    const func      = parms.func
    const ids       = parms.ids
    const type      = Util.getEventType(parms.type)

    return _listener(compArray, ids, type, func, Action.ADD)
  }

  Core.removeListener = function(parms) {
    const compArray = parms.compArray
    const ids       = parms.ids
    const type      = Util.getEventType(parms.type)
    const action    = type != "all" ? Action.REMOVE_TYPE : Action.REMOVE_ALL

    return _listener(compArray, ids, type, null, action)
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _listener(compArray, ids, type, func, action) {
    if (compArray.Type == ComponentType.MAP) {
      return Execute[action](compArray, type, func)
    }

    if ($.isArray(ids)) {
      return _multiListener(compArray, ids, type, func, action)
    }

    if (compArray[ids]) {
      return Execute[action](compArray[ids], type, func)
    }
  }

  function _multiListener(compArray, ids, type, func, action) {
    const newCompArray = new gmap[compArray.Type]({ map: compArray.Map })

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      const comp = compArray[ids[i]]

      if (comp) {
        newCompArray[ids[i]] = Execute[action](comp, type, func)
      }
    }

    return newCompArray
  }

  function _add(comp, type, func) {
    google.maps.event.addListener(comp.Obj, type, func)
    return comp
  }

  function _removeAll(comp) {
    google.maps.event.clearInstanceListeners(comp.Obj)
    return comp
  }

  function _removeType(comp, type) {
    google.maps.event.clearListeners(comp.Obj, type)
    return comp
  }


  return Core
})(gmap.Core || (gmap.Core = {}), gmap.Util, gmap.Const.ComponentType)
