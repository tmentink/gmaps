// ------------------------------------------------------------------------
// GMaps: constructor.js
// ------------------------------------------------------------------------

var gmap = function(config) {
  config = $.extend(true, {}, gmap.Config, config)

  this.Components = {
    Label: new gmap.LabelArray(this),
    Marker: new gmap.MarkerArray(this),
    Polygon: new gmap.PolygonArray(this)
  }
  this.Config = config
  this.Init = {
    Bounds: undefined,
    Options: config.MapOptions
  }
  this.Obj = new google.maps.Map(document.getElementById(config.MapId), config.MapOptions)
  this.Obj["GMaps"] = {
    Parent: this
  }
  this.Type = gmap.Const.Component.Type.MAP

  // save bounds after map has finished loading
  google.maps.event.addListenerOnce(this.Obj, gmap.Const.Event.Type.TILES_LOADED, () => {
    this.Init.Bounds = this.Obj.getBounds()
  })
}


// ------------------------------------------------------------------------
// Public Methods
// ------------------------------------------------------------------------

gmap.prototype = {

  addListener(type, fn) {
    return gmap.Core.addListener(this, null, type, fn)
  },

  addLabel: function(parms) {
    return gmap.Core.addComponent(this, gmap.Const.Component.Type.LABEL, parms)
  },

  addMarker: function(parms) {
    return gmap.Core.addComponent(this, gmap.Const.Component.Type.MARKER, parms)
  },

  addPolygon: function(parms) {
    return gmap.Core.addComponent(this, gmap.Const.Component.Type.POLYGON, parms)
  },

  getCenter: function() {
    return this.Obj.getCenter()
  },

  labels: function(ids) {
    return gmap.Core.search(this, gmap.Const.Component.Type.LABEL, ids)
  },

  markers: function(ids) {
    return gmap.Core.search(this, gmap.Const.Component.Type.MARKER, ids)
  },

  polygons: function(ids) {
    return gmap.Core.search(this, gmap.Const.Component.Type.POLYGON, ids)
  },

  removeAllListeners: function() {
    return gmap.Core.removeAllListeners(this)
  },

  removeListenerType: function(type) {
    return gmap.Core.removeListenerType(this, null, type)
  },

  reset: function() {
    return gmap.Core.reset(this)
  },

  setBounds: function(parms) {
    return gmap.Core.setBounds(this, parms)
  },

  update: function(options) {
    return gmap.Core.update(this, null, options)
  }

}
