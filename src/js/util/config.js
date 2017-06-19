// ------------------------------------------------------------------------
// GMaps: util/config.js
// ------------------------------------------------------------------------

var Util = ((Util, GlobalConfig) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const LocalConfig = [
    Const.Config.LABEL_OPTIONS,
    Const.Config.MAP_ID,
    Const.Config.MAP_OPTIONS,
    Const.Config.MARKER_OPTIONS,
    Const.Config.POLYGON_OPTIONS
  ]


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Util.renameConfigOptions = function(userConfig) {
    Object.keys(userConfig).forEach(function(key) {
      Util.renameProperty({
        newName : Util.getConfigOption(key),
        obj     : userConfig,
        oldName : key
      })
    })
    return userConfig
  }

  Util.mergeWithGlobalConfig = function(userConfig) {
    userConfig = $.extend(true, {}, GlobalConfig, userConfig)

    // delete any options that don't exist in LocalConfig
    Object.keys(userConfig).forEach(function(key) {
      if (LocalConfig.indexOf(key) === -1) {
        delete userConfig[key]
      }
    })
    return userConfig
  }


  return Util
})(Util || (Util = {}), gmap.Config)
