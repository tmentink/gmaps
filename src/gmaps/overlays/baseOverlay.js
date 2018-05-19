
var Overlays = ((Overlays) => {
  "use strict"


  class BaseOverlay {

    constructor({map, obj, options, type}) {
      this.id   = options.id
      this.init = {
        options : options
      }
      this.map  = map
      this.obj  = obj
      this.obj["gmaps"] = {
        id      : this.id,
        map     : map,
        parent  : this,
        version : gmap.version
      }
      this.parent = map.overlays[type]
      this.type   = type

      // add overlay to map.overlays
      this.map.overlays[type].push(this)
    }


    // --------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------

    getBounds() {
      return Core.getBounds({
        ovl : this
      })
    }

    getCenter() {
      return Core.getCenter({
        ovl : this
      })
    }

    getCenterString() {
      return Convert.toString({
        map : this.map,
        val : this.getCenter()
      })
    }

    getOptions(option) {
      return Core.getOptions({
        option : option,
        ovl    : this
      })
    }

    hide() {
      return Core.hide({
        ovl : this
      })
    }

    others() {
      return Core.search({
        ids      : [this.id],
        matching : false,
        ovlArray : this.parent
      })
    }

    remove() {
      return Core.remove({
        ovl : this
      })
    }

    reset() {
      return Core.reset({
        ovl : this
      })
    }

    setOptions(option, value) {
      return Core.setOptions({
        option : option,
        ovl    : this,
        value  : value
      })
    }

    show() {
      return Core.show({
        ovl : this
      })
    }

    toggle(condition) {
      return Core.toggle({
        condition : condition,
        ovl       : this
      })
    }

    zoom() {
      const ovls = {}
      ovls[this.type] = this.id

      Core.fitBounds({
        map  : this.map,
        ovls : ovls
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
