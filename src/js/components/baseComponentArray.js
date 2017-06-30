// ------------------------------------------------------------------------
// gmaps: components/baseComponentArray.js
// ------------------------------------------------------------------------

var Components = ((Components) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class BaseComponentArray {

    constructor(parms) {
      this.data = []
      this.map  = parms.map
      this.seed = 0
      this.type = parms.type
    }


    // --------------------------------------------------------------------
    // Public Methods
    // --------------------------------------------------------------------

    copy() {
      return Util.copy({
        compArray : this
      })
    }

    filter(fn) {
      return this.data.filter(fn)
    }

    find(fn) {
      return this.data.find(fn)
    }

    findById(id) {
      return this.data.find(function(comp) {
        return comp.id === id
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
      return this.type.replace("Array", "")
    }

    getGoogleObjects() {
      return this.data.map(function(comp) {
        return comp.obj
      })
    }

    getIds() {
      return this.data.map(function(comp) {
        return comp.id
      })
    }

    getOptions(compOption) {
      return Core.getOptions({
        compArray  : this,
        compOption : compOption,
        compType   : this.getChildType(),
        ids        : this.getIds()
      })
    }

    hide() {
      return Core.hide({
        compArray : this,
        ids       : this.getIds()
      })
    }

    includes(id) {
      return this.findById(id) !== undefined
    }

    others() {
      return Core.search({
        ids      : this.getIds(),
        map      : this.map,
        matching : false,
        type     : this.getChildType()
      })
    }

    pop(count) {
      return Core.pop({
        count : count,
        map   : this.map,
        type  : this.getChildType()
      })
    }

    push(comp) {
      return this.data.push(comp)
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
        map   : this.map,
        type  : this.getChildType()
      })
    }

    show() {
      return Core.show({
        compArray : this,
        ids       : this.getIds()
      })
    }

    setOptions(compOptions, value) {
      return Core.setOptions({
        compArray   : this,
        compOptions : compOptions,
        compType    : this.getChildType(),
        ids         : this.getIds(),
        value       : value
      })
    }

    toggle() {
      return Core.toggle({
        compArray : this,
        ids       : this.getIds()
      })
    }

    zoom() {
      const comps = {}
      comps[this.getChildType()] = this.getIds()

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

  Components.BaseComponentArray = BaseComponentArray

  return Components
})(Components || (Components = {}))
