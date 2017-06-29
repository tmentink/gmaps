// ------------------------------------------------------------------------
// gmaps: util/lookup.js
// ------------------------------------------------------------------------

var Util = ((Util) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Util.lookupComponentOption = function(value) {
    value = Util.toLowerCase(value)
    return _lookup(Const.ComponentOption, value) || value
  }

  Util.lookupComponentType = function(value) {
    value = Util.toLowerCase(value)
    return _lookup(Const.ComponentType, value, true) || value
  }

  Util.lookupEventType = function(value) {
    value = Util.toLowerCase(value)
    return _lookup(Const.EventType, value) || value
  }

  Util.lookupSetting = function(value) {
    value = Util.toLowerCase(value)
    return _lookup(Const.Setting, value) || value
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _lookup(constant, value, plural) {
    const key = Object.keys(constant).find(function(key) {
      key = Util.toLowerCase(key)
      return key === value || (plural && `${key}s` === value)
    })

    return constant[key]
  }


  return Util
})(Util || (Util = {}))
