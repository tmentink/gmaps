// ------------------------------------------------------------------------
// gmaps: util/settings.js
// ------------------------------------------------------------------------

var Util = ((Util, GlobalSettings, Setting) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const LocalSettings = [
    Setting.CIRCLE_OPTIONS,
    Setting.LABEL_OPTIONS,
    Setting.MAP_ID,
    Setting.MAP_OPTIONS,
    Setting.MARKER_OPTIONS,
    Setting.POLYGON_OPTIONS,
    Setting.POLYLINE_OPTIONS,
    Setting.RECTANGLE_OPTIONS
  ]


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

    // delete any options that don't exist in LocalSettings
    Object.keys(userSettings).forEach(function(key) {
      if (LocalSettings.indexOf(key) === -1) {
        delete userSettings[key]
      }
    })
    return userSettings
  }


  return Util
})(Util || (Util = {}), gmap.settings, Const.Setting)
