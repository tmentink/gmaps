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

    getOptions: function(compOption) {
      return Core.getOptions({
        compArray  : this,
        compOption : compOption,
        compType   : this.Type
      })
    },

    getDiv: function() {
      return this.Obj.getDiv()
    },

    getProjection: function() {
      return this.Obj.getProjection()
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

    setOptions: function(compOptions, value) {
      return Core.setOptions({
        compArray   : this,
        compOptions : compOptions,
        compType    : this.Type,
        value       : value
      })
    },

    setZoom: function(zoom) {
      if (zoom !== undefined) {
        this.Obj.setZoom(zoom)
      }
      return this
    }

  }


  return gmap
})(Const.ComponentType)
