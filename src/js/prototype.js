// ------------------------------------------------------------------------
// GMaps: prototype.js
// ------------------------------------------------------------------------

!((ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  gmap.prototype = {

    add: function(type, compOptions) {
      return Core.addComponent({
        compOptions : compOptions,
        map         : this,
        type        : type
      })
    },

    fitBounds: function(comps) {
      return Core.fitBounds({
        map   : this,
        comps : comps
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
        ids      : ids,
        map      : this,
        matching : true,
        type     : ComponentType.LABEL
      })
    },

    markers: function(ids) {
      return Core.search({
        ids      : ids,
        map      : this,
        matching : true,
        type     : ComponentType.MARKER
      })
    },

    off: function(type) {
      return Core.removeListener({
        compArray : this,
        type      : type
      })
    },

    on: function(type, func) {
      return Core.addListener({
        compArray : this,
        func      : func,
        type      : type
      })
    },

    polygons: function(ids) {
      return Core.search({
        ids      : ids,
        map      : this,
        matching : true,
        type     : ComponentType.POLYGON
      })
    },

    remove: function(type, ids) {
      return Core.remove({
        ids  : ids,
        map  : this,
        type : type
      })
    },

    reset: function() {
      return Core.reset({ compArray: this })
    },

    setCenter: function(center) {
      if (center !== undefined) {
        this.Obj.setCenter(Util.toLatLng(center))
      }
      return this
    },

    setZoom: function(zoom) {
      if (zoom !== undefined) {
        this.Obj.setZoom(zoom)
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
})(Const.ComponentType)
