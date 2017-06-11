// ------------------------------------------------------------------------
// GMaps: components/baseComponentArray.js
// ------------------------------------------------------------------------

var Components = ((Components) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class BaseComponentArray {

    constructor(parms) {
      this.ChildType = parms.childType
      this.Map       = parms.map
      this.Type      = parms.type
    }


    // --------------------------------------------------------------------
    // Public Methods
    // --------------------------------------------------------------------

    getBounds() {
      return Core.getBounds({
        compArray : this,
        ids       : this.getIds()
      })
    }

    getCenter() {
      return Core.getCenter({
        compArray : this,
        ids       : this.getIds()
      })
    }

    getGoogleObjects() {
      return Util.getGoogleObjects({ compArray: this })
    }

    getIds() {
      return Util.getIds({ compArray: this })
    }

    hide() {
      return Core.hide({
        compArray : this,
        ids       : this.getIds()
      })
    }

    others() {
      return Util.copy({
        compArray : this.Map.Components[this.ChildType],
        exclude   : this.getIds()
      })
    }

    remove() {
      return Core.remove({
        compArray : this,
        ids       : this.getIds()
      })
    }

    reset() {
      return Core.reset({
        compArray : this,
        ids       : this.getIds()
      })
    }

    show() {
      return Core.show({
        compArray : this,
        ids       : this.getIds()
      })
    }

    toggle() {
      return Core.toggle({
        compArray : this,
        ids       : this.getIds()
      })
    }

    update(compOptions) {
      return Core.update({
        compArray   : this,
        compOptions : compOptions,
        ids         : this.getIds()
      })
    }

    zoom() {
      const comps = {}
      comps[this.ChildType] = this.getIds()

      Core.fitBounds({
        map   : this.Map,
        comps : comps
      })

      return this
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Components.BaseComponentArray = BaseComponentArray

  return Components
})(Components || (Components = {}))
