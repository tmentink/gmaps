// ------------------------------------------------------------------------
// gmaps: constructor.js
// ------------------------------------------------------------------------

!(() => {
  "use strict"

  const gmap = function(settings) {
    if ($.isPlainObject(settings)) {
      Util.renameSettings(settings)
    }

    // merge and convert map settings
    settings         = Util.mergeWithGlobalSettings(settings)
    const mapOptions = Util.convertComponentOptions({
      compType    : Const.ComponentType.MAP,
      compOptions : settings[Const.Setting.MAP_OPTIONS]
    })

    // check if element with mapId exists
    const mapId        = settings[Const.Setting.MAP_ID]
    const mapContainer = document.getElementById(mapId)
    if (!mapContainer) {
      return Util.throwError({
        method  : "new gmap",
        message : `Could not find an element with an Id of ${mapId}`,
        obj     : settings
      })
    }


    // ----------------------------------------------------------------------
    // Class Definition
    // ----------------------------------------------------------------------

    this.components = {
      Circle    : new Components.CircleArray    ({ map: this }),
      Label     : new Components.LabelArray     ({ map: this }),
      Marker    : new Components.MarkerArray    ({ map: this }),
      Polygon   : new Components.PolygonArray   ({ map: this }),
      Polyline  : new Components.PolylineArray  ({ map: this }),
      Rectangle : new Components.RectangleArray ({ map: this })
    }
    this.init = {
      bounds  : undefined,
      options : mapOptions
    }
    this.obj = new google.maps.Map(mapContainer, mapOptions)
    this.obj["gmaps"] = {
      id      : mapId,
      map     : this,
      parent  : this,
      version : gmap.version
    }
    this.settings = settings
    this.type     = Const.ComponentType.MAP
    this.version  = gmap.version

    // save reference to controls, data and bounds after map has finished loading
    google.maps.event.addListenerOnce(this.obj, Const.EventType.TILES_LOADED, () => {
      this.controls    = this.obj.controls
      this.data        = this.obj.data
      this.init.bounds = this.obj.getBounds()

      // call onLoad callback
      const onLoad = settings[Const.Setting.ON_LOAD]
      if ($.type(onLoad) === "function") {
        onLoad(this)
      }
    })
  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  window.gmap = gmap

})()
