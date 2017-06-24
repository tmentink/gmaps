// ------------------------------------------------------------------------
// gmaps: core/display.js
// ------------------------------------------------------------------------

var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const Action = {
    HIDE   : "hide",
    SHOW   : "show",
    TOGGLE : "toggle"
  }

  const Visibility = {
    hide: function() {
      return false
    },
    show: function() {
      return true
    },
    toggle: function(comp) {
      return !comp.obj.getVisible()
    }
  }


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Core.hide = function(parms) {
    return _display(parms.compArray, parms.ids, Action.HIDE)
  }

  Core.show = function(parms) {
    return _display(parms.compArray, parms.ids, Action.SHOW)
  }

  Core.toggle = function(parms) {
    return _display(parms.compArray, parms.ids, Action.TOGGLE)
  }


  // ----------------------------------------------------------------------
  // Private Fucntions
  // ----------------------------------------------------------------------

  function _display(compArray, ids, action) {
    if ($.isArray(ids)) {
      return _multiDisplay(compArray, ids, action)
    }

    const comp = compArray.findById(ids)
    if (comp) {
      return _setVisibility(comp, action)
    }
  }

  function _multiDisplay(compArray, ids, action) {
    const newCompArray = Util.getNewComponentArray(compArray)

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      const comp = compArray.findById(ids[i])
      if (comp) {
        newCompArray.push(_setVisibility(comp, action))
      }
    }

    return newCompArray
  }

  function _setVisibility(comp, action) {
    comp.obj.setOptions({ "visible": Visibility[action](comp) })
    return comp
  }


  return Core
})(Core || (Core = {}))
