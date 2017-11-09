// ------------------------------------------------------------------------
// gmaps: util/settings.js
// ------------------------------------------------------------------------

var Util = ((Util, GlobalSettings) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Util.renameSettings = function(userSettings) {
    Object.keys(userSettings).forEach(function(key) {
      Util.renameProperty({
        newName : Util.lookupSetting(key),
        obj     : userSettings,
        oldName : key
      })
    })
    return userSettings
  }

  Util.mergeWithGlobalSettings = function(userSettings) {
    userSettings = $.extend(true, {}, GlobalSettings, userSettings)
    return userSettings
  }


  return Util
})(Util || (Util = {}), gmap.settings)
