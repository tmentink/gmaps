// ------------------------------------------------------------------------
// GMaps: prototype.js
// ------------------------------------------------------------------------

!((gmap, Core, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  gmap.prototype = {

    addListener(type, fn) {
      return Core.addListener(this, null, type, fn)
    },

    addLabel: function(parms) {
      return Core.addComponent(this, ComponentType.LABEL, parms)
    },

    addMarker: function(parms) {
      return Core.addComponent(this, ComponentType.MARKER, parms)
    },

    addPolygon: function(parms) {
      return Core.addComponent(this, ComponentType.POLYGON, parms)
    },

    getBounds: function() {
      return this.Obj.getBounds()
    },

    getCenter: function() {
      return this.Obj.getCenter()
    },

    getZoom: function() {
      return this.Obj.getZoom()
    },

    labels: function(ids) {
      return Core.search(this, ComponentType.LABEL, ids)
    },

    markers: function(ids) {
      return Core.search(this, ComponentType.MARKER, ids)
    },

    polygons: function(ids) {
      return Core.search(this, ComponentType.POLYGON, ids)
    },

    removeAllListeners: function() {
      return Core.removeAllListeners(this)
    },

    removeListenerType: function(type) {
      return Core.removeListenerType(this, null, type)
    },

    reset: function() {
      return Core.reset(this)
    },

    setBounds: function(parms) {
      return Core.setBounds(this, parms)
    },

    setCenter: function(center) {
      if (center != null) {
        return Core.update(this, null, { center: center })
      }
      return this
    },

    setZoom: function(zoom) {
      if (zoom != null) {
        return Core.update(this, null, { zoom: zoom })
      }
      return this
    },

    update: function(options) {
      return Core.update(this, null, options)
    }

  }


  return gmap
})(gmap, gmap.Core, gmap.Const.ComponentType)
