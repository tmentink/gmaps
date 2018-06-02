
!((OverlayTypes) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  gmap.prototype = {

    addOverlay(type, options) {
      return Core.addOverlay({
        map     : this,
        options : options,
        type    : type
      })
    },

    circles(ids) {
      return Core.search({
        ids      : ids,
        matching : true,
        ovlArray : this.overlays[OverlayTypes.CIRCLE]
      })
    },

    fitBounds(ovls) {
      return Core.fitBounds({
        map  : this,
        ovls : ovls
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
      return Convert.toString({
        map : this,
        val : this.getCenter()
      })
    },

    getOptions(option) {
      return Core.getMapOptions({
        map    : this,
        option : option
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
        matching : true,
        ovlArray : this.overlays[OverlayTypes.LABEL]
      })
    },

    markers(ids) {
      return Core.search({
        ids      : ids,
        matching : true,
        ovlArray : this.overlays[OverlayTypes.MARKER]
      })
    },

    off(type) {
      return Core.removeListener({
        ovl  : this,
        type : type
      })
    },

    on(type, func) {
      return Core.addListener({
        ovl  : this,
        func : func,
        type : type
      })
    },

    polygons(ids) {
      return Core.search({
        ids      : ids,
        matching : true,
        ovlArray : this.overlays[OverlayTypes.POLYGON]
      })
    },

    polylines(ids) {
      return Core.search({
        ids      : ids,
        matching : true,
        ovlArray : this.overlays[OverlayTypes.POLYLINE]
      })
    },

    rectangles(ids) {
      return Core.search({
        ids      : ids,
        matching : true,
        ovlArray : this.overlays[OverlayTypes.RECTANGLE]
      })
    },

    reset() {
      return Core.resetMap({
        map: this
      })
    },

    setCenter(center) {
      if (center !== undefined) {
        this.obj.setCenter(Convert.toLatLng({
          map : this,
          val : center
        }))
      }
      return this
    },

    setOptions(option, value) {
      return Core.setMapOptions({
        map    : this,
        option : option,
        value  : value
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
        ovl  : this,
        type : type
      })
    }

  }


  return gmap
})(Const.OverlayTypes)
