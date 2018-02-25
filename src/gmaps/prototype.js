
!((ComponentType) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  gmap.prototype = {

    add(type, compOptions) {
      return Core.addComponent({
        compOptions : compOptions,
        map         : this,
        type        : type
      })
    },

    circles(ids) {
      return Core.search({
        ids      : ids,
        map      : this,
        matching : true,
        type     : ComponentType.CIRCLE
      })
    },

    fitBounds(comps) {
      return Core.fitBounds({
        map   : this,
        comps : comps
      })
    },

    geolocate(options) {
      return Core.geolocate({
        map     : this,
        options : options
      })
    },

    getBounds() {
      return this.obj.getBounds()
    },

    getCenter() {
      return this.obj.getCenter()
    },

    getCenterString() {
      return Util.toString({
        map : this,
        val : this.getCenter()
      })
    },

    getOptions(compOption) {
      return Core.getOptions({
        comp       : this,
        compOption : compOption
      })
    },

    getDiv() {
      return this.obj.getDiv()
    },

    getProjection() {
      return this.obj.getProjection()
    },

    getZoom() {
      return this.obj.getZoom()
    },

    labels(ids) {
      return Core.search({
        ids      : ids,
        map      : this,
        matching : true,
        type     : ComponentType.LABEL
      })
    },

    markers(ids) {
      return Core.search({
        ids      : ids,
        map      : this,
        matching : true,
        type     : ComponentType.MARKER
      })
    },

    off(type) {
      return Core.removeListener({
        comp : this,
        type : type
      })
    },

    on(type, func) {
      return Core.addListener({
        comp : this,
        func : func,
        type : type
      })
    },

    polygons(ids) {
      return Core.search({
        ids      : ids,
        map      : this,
        matching : true,
        type     : ComponentType.POLYGON
      })
    },

    polylines(ids) {
      return Core.search({
        ids      : ids,
        map      : this,
        matching : true,
        type     : ComponentType.POLYLINE
      })
    },

    rectangles(ids) {
      return Core.search({
        ids      : ids,
        map      : this,
        matching : true,
        type     : ComponentType.RECTANGLE
      })
    },

    reset() {
      return Core.reset({
        comp: this
      })
    },

    setCenter(center) {
      if (center !== undefined) {
        this.obj.setCenter(Util.toLatLng({
          map : this,
          val : center
        }))
      }
      return this
    },

    setOptions(compOptions, value) {
      return Core.setOptions({
        comp        : this,
        compOptions : compOptions,
        compType    : this.type,
        map         : this,
        value       : value
      })
    },

    setZoom(zoom) {
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
