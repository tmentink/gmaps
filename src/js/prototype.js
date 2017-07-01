// ------------------------------------------------------------------------
// gmaps: prototype.js
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

    circles: function(ids) {
      return Core.search({
        ids      : ids,
        map      : this,
        matching : true,
        type     : ComponentType.CIRCLE
      })
    },

    fitBounds: function(comps) {
      return Core.fitBounds({
        map   : this,
        comps : comps
      })
    },

    getBounds: function() {
      return this.obj.getBounds()
    },

    getCenter: function() {
      return this.obj.getCenter()
    },

    getOptions: function(compOption) {
      return Core.getOptions({
        compArray  : this,
        compOption : compOption,
        compType   : this.type
      })
    },

    getDiv: function() {
      return this.obj.getDiv()
    },

    getProjection: function() {
      return this.obj.getProjection()
    },

    getZoom: function() {
      return this.obj.getZoom()
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

    rectangles: function(ids) {
      return Core.search({
        ids      : ids,
        map      : this,
        matching : true,
        type     : ComponentType.RECTANGLE
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
        this.obj.setCenter(Util.toLatLng(center))
      }
      return this
    },

    setOptions: function(compOptions, value) {
      return Core.setOptions({
        compArray   : this,
        compOptions : compOptions,
        compType    : this.type,
        value       : value
      })
    },

    setZoom: function(zoom) {
      if (zoom !== undefined) {
        this.obj.setZoom(zoom)
      }
      return this
    }

  }


  return gmap
})(Const.ComponentType)
