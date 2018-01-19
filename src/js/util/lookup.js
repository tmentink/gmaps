// ------------------------------------------------------------------------
// gmaps: util/lookup.js
// ------------------------------------------------------------------------

var Lookup = ((Lookup) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Lookup.eventType = function(value) {
    value = Convert.toLowerCase(value)
    return _lookup(Const.EventType, value) || value
  }

  Lookup.overlayOption = function(value) {
    value = Convert.toLowerCase(value)
    return _lookup(Const.OverlayOption, value) || value
  }

  Lookup.overlayType = function(value) {
    value = Convert.toLowerCase(value)
    return _lookup(Const.OverlayType, value, true) || value
  }

  Lookup.setting = function(value) {
    value = Convert.toLowerCase(value)
    return _lookup(Const.Setting, value) || value
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _lookup(constant, value, plural) {
    const key = Object.keys(constant).find(function(key) {
      key = Convert.toLowerCase(key)
      return key === value || (plural && `${key}s` === value)
    })

    return constant[key]
  }


  return Lookup
})(Lookup || (Lookup = {}))
