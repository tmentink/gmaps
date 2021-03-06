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

    geolocate: function(options) {
      return Core.geolocate({
        map     : this,
        options : options
      })
    },

    getBounds: function() {
      return this.obj.getBounds()
    },

    getCenter: function() {
      return this.obj.getCenter()
    },

    getCenterString: function() {
      return Util.toString({
        map : this,
        val : this.getCenter()
      })
    },

    getOptions: function(compOption) {
      return Core.getOptions({
        comp       : this,
        compOption : compOption
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
        comp : this,
        type : type
      })
    },

    on: function(type, func) {
      return Core.addListener({
        comp : this,
        func : func,
        type : type
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

    polylines: function(ids) {
      return Core.search({
        ids      : ids,
        map      : this,
        matching : true,
        type     : ComponentType.POLYLINE
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
      return Core.reset({
        comp: this
      })
    },

    setCenter: function(center) {
      if (center !== undefined) {
        this.obj.setCenter(Util.toLatLng({
          map : this,
          val : center
        }))
      }
      return this
    },

    setOptions: function(compOptions, value) {
      return Core.setOptions({
        comp        : this,
        compOptions : compOptions,
        compType    : this.type,
        map         : this,
        value       : value
      })
    },

    setZoom: function(zoom) {
      if (zoom !== undefined) {
        this.obj.setZoom(zoom)
      }
      return this
    },

    trigger(type) {
      return Core.triggerListener({
        comp : this,
        type : type
      })
    }

  }


  return gmap
})(Const.ComponentType)
