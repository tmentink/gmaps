// ------------------------------------------------------------------------
// GMaps: constructor.js
// ------------------------------------------------------------------------

!(() => {
  "use strict"

  const gmap = function(settings) {
    if ($.isPlainObject(settings)) {
      Util.renameSettings(settings)
    }
    settings = Util.mergeWithGlobalSettings(settings)
    settings.MapOptions = Util.convertComponentOptions({
      compType    : Const.ComponentType.MAP,
      compOptions : settings.MapOptions
    })

    // check if element with MapId exists
    const mapContainer = document.getElementById(settings.MapId)
    if (!mapContainer) {
      return Util.throwError({
        method  : "new gmap",
        message : `Could not find an element with an Id of ${settings.MapId}`,
        obj     : settings
      })
    }


    // ----------------------------------------------------------------------
    // Class Definition
    // ----------------------------------------------------------------------

    this.Components = {
      Label   : new Components.LabelArray({ map: this }),
      Marker  : new Components.MarkerArray({ map: this }),
      Polygon : new Components.PolygonArray({ map: this })
    }
    this.Init   = {
      Bounds  : undefined,
      Options : settings.MapOptions
    }
    this.Obj = new google.maps.Map(mapContainer, settings.MapOptions)
    this.Obj["gmaps"] = {
      id      : settings.MapId,
      map     : this,
      parent  : this,
      version : gmap.version
    }
    this.Settings = settings
    this.Type     = Const.ComponentType.MAP
    this.Version  = gmap.version

    // save bounds after map has finished loading
    google.maps.event.addListenerOnce(this.Obj, Const.EventType.TILES_LOADED, () => {
      this.Init.Bounds = this.Obj.getBounds()
    })
  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  window.gmap = gmap

})()
