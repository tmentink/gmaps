// ------------------------------------------------------------------------
// gmaps: overlays/baseOverlayArray.js
// ------------------------------------------------------------------------

var Overlays = ((Overlays) => {
  "use strict"


  class BaseOverlayArray {

    constructor({map, type}) {
      this.data = []
      this.map  = map
      this.seed = 0
      this.type = type
    }


    // --------------------------------------------------------------------
    // Public
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
        // eslint-disable-next-line eqeqeq
        return id != null ? comp.id === id.toString() : false
      })
    }

    forEach(fn) {
      this.data.forEach(fn)
      return this
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

    getCenterString() {
      return Util.toString({
        map : this.map,
        val : this.getCenter()
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
        map         : this.map,
        value       : value
      })
    }

    toggle(condition) {
      return Core.toggle({
        compArray : this,
        condition : condition,
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

  Overlays.BaseOverlayArray = BaseOverlayArray


  return Overlays
})(Overlays || (Overlays = {}))
