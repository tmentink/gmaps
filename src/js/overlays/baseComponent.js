// ------------------------------------------------------------------------
// gmaps: overlays/baseOverlay.js
// ------------------------------------------------------------------------

var Overlays = ((Overlays) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class BaseOverlay {

    constructor(parms) {
      const id      = parms.id
      const map     = parms.options.map.gmaps.parent
      const obj     = parms.obj
      const options = parms.options
      const type    = parms.type

      this.id   = id
      this.init = {
        options : options
      }
      this.map  = map
      this.obj  = obj
      this.obj["gmaps"] = {
        id      : id,
        map     : map,
        parent  : this,
        version : gmap.version
      }
      this.type = type
    }


    // --------------------------------------------------------------------
    // Public Methods
    // --------------------------------------------------------------------

    getBounds() {
      return Core.getBounds({
        comp : this
      })
    }

    getCenter() {
      return Core.getCenter({
        comp : this
      })
    }

    getCenterString() {
      return Util.toString({
        map : this.map,
        val : this.getCenter()
      })
    }

    getOptions(compOption) {
      return Core.getOptions({
        comp       : this,
        compOption : compOption
      })
    }

    hide() {
      return Core.hide({
        comp : this
      })
    }

    others() {
      return Core.search({
        ids      : [this.id],
        map      : this.map,
        matching : false,
        type     : this.type
      })
    }

    reset() {
      return Core.reset({
        comp : this
      })
    }

    setOptions(compOptions, value) {
      return Core.setOptions({
        comp        : this,
        compOptions : compOptions,
        compType    : this.type,
        map         : this.map,
        value       : value
      })
    }

    show() {
      return Core.show({
        comp : this
      })
    }

    toggle(condition) {
      return Core.toggle({
        comp      : this,
        condition : condition
      })
    }

    zoom() {
      const comps = {}
      comps[this.type] = this.id

      Core.fitBounds({
        map   : this.map,
        comps : comps
      })

      return this
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Overlays.BaseOverlay = BaseOverlay

  return Overlays
})(Overlays || (Overlays = {}))
