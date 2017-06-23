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
      this.Data = []
      this.Map  = parms.map
      this.Seed = 0
      this.Type = parms.type
    }


    // --------------------------------------------------------------------
    // Public Methods
    // --------------------------------------------------------------------

    copy() {
      return Util.copy({
        compArray : this
      })
    }

    find(id) {
      return this.Data.find(function(comp) {
        return comp.Id === id
      })
    }

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

    getChildType() {
      return this.Type.replace("Array", "")
    }

    getGoogleObjects() {
      return Util.getGoogleObjects({
        compArray: this
      })
    }

    getIds() {
      return Util.getIds({
        compArray: this
      })
    }

    hide() {
      return Core.hide({
        compArray : this,
        ids       : this.getIds()
      })
    }

    includes(id) {
      return this.find(id) !== undefined
    }

    pop(count) {
      return Core.pop({
        count : count,
        map   : this.Map,
        type  : this.getChildType()
      })
    }

    push(comp) {
      return this.Data.push(comp)
    }

    others() {
      return Core.search({
        ids      : this.getIds(),
        map      : this.Map,
        matching : false,
        type     : this.getChildType()
      })
    }

    reset() {
      return Core.reset({
        compArray : this,
        ids       : this.getIds()
      })
    }

    shift(count) {
      return Core.shift({
        count : count,
        map   : this.Map,
        type  : this.getChildType()
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
      comps[this.getChildType()] = this.getIds()

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
