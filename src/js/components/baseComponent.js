// ------------------------------------------------------------------------
// gmaps: components/baseComponent.js
// ------------------------------------------------------------------------

var Components = ((Components) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class BaseComponent {

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
      return Util.toString(this.getCenter())
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
        value       : value
      })
    }

    show() {
      return Core.show({
        comp : this
      })
    }

    toggle() {
      return Core.toggle({
        comp : this
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

  Components.BaseComponent = BaseComponent

  return Components
})(Components || (Components = {}))
