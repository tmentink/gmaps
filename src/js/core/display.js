// ------------------------------------------------------------------------
// GMaps: display.js
// ------------------------------------------------------------------------

!((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const Action = {
    HIDE:   "hide",
    SHOW:   "show",
    TOGGLE: "toggle"
  }

  const Visibility = {
    hide: function() {
      return false
    },
    show: function() {
      return true
    },
    toggle: function(comp) {
      return !comp.Obj.getVisible()
    }
  }


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  Core.hide = function(compArray, ids) {
    return _display(compArray, ids, Action.HIDE)
  }

  Core.show = function(compArray, ids) {
    return _display(compArray, ids, Action.SHOW)
  }

  Core.toggle = function(compArray, ids) {
    return _display(compArray, ids, Action.TOGGLE)
  }


  // ----------------------------------------------------------------------
  // Private Fucntions
  // ----------------------------------------------------------------------

  function _display(compArray, ids, action) {
    if ($.isArray(ids)) {
      return _multiDisplay(compArray, ids, action)
    }

    if (compArray[ids]) {
      return _setVisibility(compArray[ids], action)
    }
  }

  function _multiDisplay(compArray, ids, action) {
    const newCompArray = new gmap[compArray.Type](compArray.Map)

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let comp = compArray[ids[i]]

      if (comp) {
        newCompArray[ids[i]] = _setVisibility(comp, action)
      }
    }

    return newCompArray
  }

  function _setVisibility(comp, action) {
    comp.Obj.setOptions({ "visible": Visibility[action](comp) })
    return comp
  }


  return Core
})(gmap.Core || (gmap.Core = {}))
