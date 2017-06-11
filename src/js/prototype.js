// ------------------------------------------------------------------------
// GMaps: prototype.js
// ------------------------------------------------------------------------

!((gmap, Core, ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  gmap.prototype = {

    addLabel: function(compOptions) {
      return Core.addComponent({
        compOptions : compOptions,
        map         : this,
        type        : ComponentType.LABEL
      })
    },

    addMarker: function(compOptions) {
      return Core.addComponent({
        compOptions : compOptions,
        map         : this,
        type        : ComponentType.MARKER
      })
    },

    addPolygon: function(compOptions) {
      return Core.addComponent({
        compOptions : compOptions,
        map         : this,
        type        : ComponentType.POLYGON
      })
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
      return Core.search({
        ids  : ids,
        map  : this,
        type : ComponentType.LABEL
      })
    },

    markers: function(ids) {
      return Core.search({
        ids  : ids,
        map  : this,
        type : ComponentType.MARKER
      })
    },

    on: function(type, func) {
      return Core.addListener({
        compArray : this,
        func      : func,
        type      : type
      })
    },

    off: function(type) {
      return Core.removeListener({
        compArray : this,
        type      : type
      })
    },

    polygons: function(ids) {
      return Core.search({
        ids  : ids,
        map  : this,
        type : ComponentType.POLYGON
      })
    },

    reset: function() {
      return Core.reset({ compArray: this })
    },

    setBounds: function(comps) {
      return Core.setBounds({
        map   : this,
        comps : comps
      })
    },

    setCenter: function(center) {
      if (center != null) {
        return Core.update({
          compArray   : this,
          compOptions : { center: center }
        })
      }
      return this
    },

    setZoom: function(zoom) {
      if (zoom != null) {
        return Core.update({
          compArray   : this,
          compOptions : { zoom: zoom }
        })
      }
      return this
    },

    update: function(compOptions) {
      return Core.update({
        compArray   : this,
        compOptions : compOptions
      })
    }

  }


  return gmap
})(gmap, gmap.Core, gmap.Const.ComponentType)
