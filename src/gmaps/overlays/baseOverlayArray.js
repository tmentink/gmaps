
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

    filter(fn) {
      return this.data.filter(fn)
    }

    find(fn) {
      return this.data.find(fn)
    }

    findById(id) {
      return this.data.find((ovl) => {
        // eslint-disable-next-line eqeqeq
        return id != null
          ? ovl.id === id.toString()
          : false
      })
    }

    forEach(fn) {
      this.data.forEach(fn)
      return this
    }

    getBounds() {
      return Core.getBounds({
        ids      : this.getIds(),
        ovlArray : this
      })
    }

    getCenter() {
      return Core.getCenter({
        ids      : this.getIds(),
        ovlArray : this
      })
    }

    getCenterString() {
      return Convert.toString({
        map : this.map,
        val : this.getCenter()
      })
    }

    getChildType() {
      return this.type.replace("Array", "")
    }

    getGoogleObjects() {
      return this.data.map((ovl) => {
        return ovl.obj
      })
    }

    getIds() {
      return this.data.map((ovl) => {
        return ovl.id
      })
    }

    getOptions(option) {
      return Core.getOptions({
        option    : option,
        ovlArray  : this
      })
    }

    hide() {
      return Core.hide({
        ids      : this.getIds(),
        ovlArray : this
      })
    }

    includes(id) {
      return this.findById(id) !== undefined
    }

    others() {
      return Core.search({
        ids      : this.getIds(),
        matching : false,
        ovlArray : this.map.overlays[this.getChildType()]
      })
    }

    pop(count) {
      return Core.pop({
        count    : count,
        ovlArray : this.map
      })
    }

    push(ovl) {
      return this.data.push(ovl)
    }

    remove() {
      return Core.remove({
        ovlArray : this
      })
    }

    reset() {
      return Core.reset({
        ids      : this.getIds(),
        ovlArray : this
      })
    }

    shift(count) {
      return Core.shift({
        count    : count,
        ovlArray : this.map
      })
    }

    show() {
      return Core.show({
        ids      : this.getIds(),
        ovlArray : this
      })
    }

    setOptions(option, value) {
      return Core.setOptions({
        option   : option,
        ovlArray : this,
        value    : value
      })
    }

    toggle(condition) {
      return Core.toggle({
        condition : condition,
        ids       : this.getIds(),
        ovlArray  : this
      })
    }

    zoom() {
      const ovls = {}
      ovls[this.getChildType()] = this.getIds()

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

  Overlays.BaseOverlayArray = BaseOverlayArray


  return Overlays
})(Overlays || (Overlays = {}))
