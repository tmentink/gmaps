
var Lookup = ((Lookup) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Lookup.eventType = function(value) {
    return lookup(Const.EventTypes, value) || value
  }

  Lookup.mapOption = function(value) {
    return lookup(Const.MapOptions, value) || value
  }

  Lookup.overlayOption = function(value) {
    return lookup(Const.OverlayOptions, value) || value
  }

  Lookup.overlayType = function(value) {
    return lookup(Const.OverlayTypes, value, true) || value
  }

  Lookup.setting = function(value) {
    return lookup(Const.Settings, value) || value
  }

  Lookup.shapeType = function(value) {
    return lookup(Const.Shapes, value) || value
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------

  function lookup(constant, value, plural) {
    value = Convert.toLowerCase(value)
    const key = Object.keys(constant).find(function(k) {
      k = Convert.toLowerCase(k)
      return k === value || (plural && `${k}s` === value)
    })

    return constant[key]
  }


  return Lookup
})(Lookup || (Lookup = {}))
