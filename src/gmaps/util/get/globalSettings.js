
var Get = ((Get, GlobalSettings) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Get.mergedSettings = function({convert, settings}) {
    settings = Util.extend({}, GlobalSettings, settings)

    if (convert) {
      const map     = {settings}
      const options = settings[Const.Settings.MAP_OPTIONS]
      settings[Const.Settings.MAP_OPTIONS] = Get.convertedMapOptions({map, options})
    }

    return settings
  }

  Get.renamedSettings = function({settings}) {
    Object.keys(settings).forEach(function(key) {
      Util.renameProperty({
        newName : Lookup.setting(key),
        obj     : settings,
        oldName : key
      })
    })

    return settings
  }


  return Get
})(Get || (Get = {}), gmap.settings)
