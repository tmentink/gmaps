// ------------------------------------------------------------------------
// gmaps: core/listener.js
// ------------------------------------------------------------------------

var Core = ((Core, ComponentType) => {
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
    const action    = type !== "all" ? Action.REMOVE_TYPE : Action.REMOVE_ALL

    return _listener(compArray, ids, type, null, action)
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _listener(compArray, ids, type, func, action) {
    if (compArray.type === ComponentType.MAP) {
      return Execute[action](compArray, type, func)
    }

    if ($.isArray(ids)) {
      return _multiListener(compArray, ids, type, func, action)
    }

    const comp = compArray.findById(ids)
    if (comp) {
      return Execute[action](comp, type, func)
    }
  }

  function _multiListener(compArray, ids, type, func, action) {
    const newCompArray = new Components[compArray.type]({ map: compArray.map })

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      const comp = compArray.findById(ids[i])
      if (comp) {
        newCompArray.push(Execute[action](comp, type, func))
      }
    }

    return newCompArray
  }

  function _add(comp, type, func) {
    google.maps.event.addListener(comp.obj, type, func)
    return comp
  }

  function _removeAll(comp) {
    google.maps.event.clearInstanceListeners(comp.obj)
    return comp
  }

  function _removeType(comp, type) {
    google.maps.event.clearListeners(comp.obj, type)
    return comp
  }


  return Core
})(Core || (Core = {}), Const.ComponentType)
