// ------------------------------------------------------------------------
// GMaps: config.js
// ------------------------------------------------------------------------

!((Util, GlobalConfig, Const) => {
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
  // Public Functions
  // ----------------------------------------------------------------------

  Util.renameConfigOptions = function(userConfig) {
    Object.keys(userConfig).forEach(function(key) {
      _renameProperty(userConfig, key, Util.getConfigOption(key))
    })
  }

  Util.mergeWithGlobalConfig = function(userConfig) {
    userConfig = $.extend(true, {}, GlobalConfig, userConfig)

    // delete any options that don't exist in LocalConfig
    Object.keys(userConfig).forEach(function(key) {
      if (LocalConfig.indexOf(key) == -1) {
        delete userConfig[key]
      }
    })

    return userConfig
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _renameProperty(obj, oldName, newName) {
    if (oldName == newName) {
      return
    }

    if (obj.hasOwnProperty(oldName)) {
      obj[newName] = obj[oldName]
      delete obj[oldName]
    }
  }


  return Util
})(gmap.Util || (gmap.Util = {}), gmap.Config, gmap.Const)
