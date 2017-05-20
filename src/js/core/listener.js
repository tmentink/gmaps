// ------------------------------------------------------------------------
// GMaps: listener.js
// ------------------------------------------------------------------------

!((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const Action = {
    ADD:         "add",
    REMOVE_ALL:  "remove_all",
    REMOVE_TYPE: "remove_type",
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
  // Public Functions
  // ----------------------------------------------------------------------

  Core.addListener = function(compArray, ids, type, fn) {
    type = gmap.Util.getEventType(type)
    return _listener(compArray, ids, type, fn, Action.ADD)
  }

  Core.removeAllListeners = function(compArray, ids) {
    return _listener(compArray, ids, null, null, Action.REMOVE_ALL)
  }

  Core.removeListenerType = function(compArray, ids, type) {
    type = gmap.Util.getEventType(type)
    return _listener(compArray, ids, type, null, Action.REMOVE_TYPE)
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _listener(compArray, ids, type, fn, action) {
    if (compArray.Type == gmap.Const.ComponentType.MAP) {
      return Execute[action](compArray, type, fn)
    }

    if ($.isArray(ids)) {
      return _multiListener(compArray, ids, type, fn, action)
    }

    if (compArray[ids]) {
      return Execute[action](compArray[ids], type, fn)
    }
  }

  function _multiListener(compArray, ids, type, fn, action) {
    const newCompArray = new gmap[compArray.Type](compArray.Map)

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let comp = compArray[ids[i]]

      if (comp) {
        newCompArray[ids[i]] = Execute[action](comp, type, fn)
      }
    }

    return newCompArray
  }

  function _add(comp, type, fn) {
    google.maps.event.addListener(comp.Obj, type, fn)
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
})(gmap.Core || (gmap.Core = {}))
