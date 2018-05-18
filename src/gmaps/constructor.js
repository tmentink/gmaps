
!(() => {
  "use strict"

  const gmap = function(settings) {
    if (Is.Object(settings)) {
      settings = Get.renamedSettings({settings})
    }

    settings = Get.mergedSettings({
      convert  : true,
      settings : settings
    })

    // check if element with mapId exists
    const mapId        = settings[Const.Setting.MAP_ID]
    const mapContainer = document.getElementById(mapId)
    if (!mapContainer) {
      return Error.throw({
        method : "new gmap",
        msg    : `Could not find an element with an Id of ${mapId}`,
        args   : settings
      })
    }


    // ----------------------------------------------------------------------
    // Class Definition
    // ----------------------------------------------------------------------

    this.init = {
      bounds  : undefined,
      options : mapOptions
    }
    this.obj = new google.maps[Const.GoogleClasses.MAP](mapContainer, mapOptions)
    this.obj["gmaps"] = {
      id      : mapId,
      map     : this,
      parent  : this,
      version : gmap.version
    }
    this.overlays = {
      Circle    : new Overlays.CircleArray    ({map: this}),
      Label     : new Overlays.LabelArray     ({map: this}),
      Marker    : new Overlays.MarkerArray    ({map: this}),
      Polygon   : new Overlays.PolygonArray   ({map: this}),
      Polyline  : new Overlays.PolylineArray  ({map: this}),
      Rectangle : new Overlays.RectangleArray ({map: this})
    }
    this.settings = settings
    this.type     = "Map"
    this.version  = gmap.version

    // save reference to controls, data and bounds after map has finished loading
    google.maps.event.addListenerOnce(this.obj, Const.EventTypes.TILES_LOADED, () => {
      this.controls    = this.obj.controls
      this.data        = this.obj.data
      this.init.bounds = this.obj.getBounds()

      // call onLoad callback
      const onLoad = settings[Const.Settings.ON_LOAD]
      if (Is.Function(onLoad)) onLoad(this)
    })
  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  window.gmap = gmap

})()
