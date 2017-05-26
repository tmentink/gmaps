// ------------------------------------------------------------------------
// GMaps: constructor.js
// ------------------------------------------------------------------------

const gmap = function(config) {
  const ComponentType = gmap.Const.ComponentType
  const EventType     = gmap.Const.EventType
  const Util          = gmap.Util

  if ($.isPlainObject(config)) {
    Util.renameConfigOptions(config)
  }
  config = Util.mergeWithGlobalConfig(config)
  config = Util.convertCompOptions(ComponentType.MAP, config.MapOptions)


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  this.Components = {
    Label:   new gmap.LabelArray(this),
    Marker:  new gmap.MarkerArray(this),
    Polygon: new gmap.PolygonArray(this)
  }
  this.Config = config
  this.Init = {
    Bounds:  undefined,
    Options: config.MapOptions
  }
  this.Obj = new google.maps.Map(document.getElementById(config.MapId), config.MapOptions)
  this.Obj["GMaps"] = {
    Id:      config.MapId,
    Map:     this,
    Parent:  this,
    Version: gmap.Version
  }
  this.Type    = ComponentType.MAP
  this.Version = gmap.Version

  // save bounds after map has finished loading
  google.maps.event.addListenerOnce(this.Obj, EventType.TILES_LOADED, () => {
    this.Init.Bounds = this.Obj.getBounds()
  })
}
