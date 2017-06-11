// ------------------------------------------------------------------------
// GMaps: constructor.js
// ------------------------------------------------------------------------

!(() => {
  "use strict"

  const gmap = function(config) {
    if ($.isPlainObject(config)) {
      Util.renameConfigOptions(config)
    }
    config = Util.mergeWithGlobalConfig(config)
    config.MapOptions = Util.convertCompOptions({
      compType    : Const.ComponentType.MAP,
      compOptions : config.MapOptions
    })

    // check if element with MapId exists
    const mapContainer = document.getElementById(config.MapId)
    if (!mapContainer) {
      return Util.throwError({
        method  : "new gmap",
        message : "Could not find an element with an Id of " + config.MapId,
        obj     : config
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
    this.Config = config
    this.Init   = {
      Bounds  : undefined,
      Options : config.MapOptions
    }
    this.Obj = new google.maps.Map(mapContainer, config.MapOptions)
    this.Obj["GMaps"] = {
      Id      : config.MapId,
      Map     : this,
      Parent  : this,
      Version : gmap.Version
    }
    this.Type    = Const.ComponentType.MAP
    this.Version = gmap.Version

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
