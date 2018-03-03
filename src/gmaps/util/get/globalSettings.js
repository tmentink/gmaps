
var Get = ((Get, GlobalSettings) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Get.mergedSettings = function({convert, settings}) {
    settings      = Util.extend({}, GlobalSettings, settings)
    const map     = {settings}
    const options = settings[Const.Settings.MAP_OPTIONS]

    return convert
      ? Get.convertedMapOptions({map, options})
      : settings
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
