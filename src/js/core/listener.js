// ------------------------------------------------------------------------
// gmaps: core/listener.js
// ------------------------------------------------------------------------

var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const Action = {
    ADD         : "add",
    REMOVE_ALL  : "remove_all",
    REMOVE_TYPE : "remove_type",
    TRIGGER     : "trigger"
  }

  const Execute = {
    add: function(comp, type, fn) {
      google.maps.event.addListener(comp.obj, type, fn)
      return comp
    },
    remove_all: function(comp) {
      google.maps.event.clearInstanceListeners(comp.obj)
      return comp
    },
    remove_type: function(comp, type) {
      google.maps.event.clearListeners(comp.obj, type)
      return comp
    },
    trigger: function(comp, type) {
      google.maps.event.trigger(comp.obj, type, {})
      return comp
    }
  }


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Core.addListener = function(parms) {
    const comp      = parms.comp
    const compArray = parms.compArray
    const func      = parms.func
    const ids       = parms.ids
    const type      = Util.lookupEventType(parms.type)

    return _listener(comp, compArray, ids, type, func, Action.ADD)
  }

  Core.removeListener = function(parms) {
    const comp      = parms.comp
    const compArray = parms.compArray
    const ids       = parms.ids
    const type      = Util.lookupEventType(parms.type)
    const action    = type !== "all" ? Action.REMOVE_TYPE : Action.REMOVE_ALL

    return _listener(comp, compArray, ids, type, null, action)
  }

  Core.triggerListener = function(parms) {
    const comp      = parms.comp
    const compArray = parms.compArray
    const ids       = parms.ids
    const type      = Util.lookupEventType(parms.type)

    return _listener(comp, compArray, ids, type, null, Action.TRIGGER)
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _listener(comp, compArray, ids, type, func, action) {
    if ($.isArray(ids)) {
      return _multiListener(compArray, ids, type, func, action)
    }

    if (comp) {
      return Execute[action](comp, type, func)
    }
  }

  function _multiListener(compArray, ids, type, func, action) {
    const newCompArray = Util.getNewComponentArray(compArray)

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      const comp = compArray.findById(ids[i])
      if (comp) {
        newCompArray.push(Execute[action](comp, type, func))
      }
    }

    return newCompArray
  }


  return Core
})(Core || (Core = {}))
