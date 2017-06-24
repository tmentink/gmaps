// ------------------------------------------------------------------------
// gmaps: util/settings.js
// ------------------------------------------------------------------------

var Util = ((Util, GlobalSettings) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const LocalSettings = [
    Const.Settings.LABEL_OPTIONS,
    Const.Settings.MAP_ID,
    Const.Settings.MAP_OPTIONS,
    Const.Settings.MARKER_OPTIONS,
    Const.Settings.POLYGON_OPTIONS
  ]


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Util.renameSettings = function(userSettings) {
    Object.keys(userSettings).forEach(function(key) {
      Util.renameProperty({
        newName : Util.getSetting(key),
        obj     : userSettings,
        oldName : key
      })
    })
    return userSettings
  }

  Util.mergeWithGlobalSettings = function(userSettings) {
    userSettings = $.extend(true, {}, GlobalSettings, userSettings)

    // delete any options that don't exist in LocalSettings
    Object.keys(userSettings).forEach(function(key) {
      if (LocalSettings.indexOf(key) === -1) {
        delete userSettings[key]
      }
    })
    return userSettings
  }


  return Util
})(Util || (Util = {}), gmap.settings)
