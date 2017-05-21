// ------------------------------------------------------------------------
// GMaps: baseComponentArray.js
// ------------------------------------------------------------------------


!((gmap, Core, Util) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class BaseComponentArray {

    constructor(map, type, childType) {
      this.ChildType = childType
      this.Map = map
      this.Type = type
    }


    // --------------------------------------------------------------------
    // Public Methods
    // --------------------------------------------------------------------

    getBounds() {
      return Core.getBounds(this, this.getIds())
    }

    getCenter() {
      return Core.getCenter(this, this.getIds())
    }

    getGoogleObjects() {
      return Util.getGoogleObjects(this)
    }

    getIds() {
      return Util.getIds(this)
    }

    hide() {
      return Core.hide(this, this.getIds())
    }

    others() {
      return Util.copy(this.Map.Components[this.ChildType], this.getIds())
    }

    remove() {
      return Core.remove(this, this.getIds())
    }

    reset() {
      return Core.reset(this, this.getIds())
    }

    show() {
      return Core.show(this, this.getIds())
    }

    toggle() {
      return Core.toggle(this, this.getIds())
    }

    update(options) {
      return Core.update(this, this.getIds(), options)
    }

    zoom() {
      let parms = {}
      parms[this.ChildType] = this.getIds()

      Core.setBounds(this.Map, parms)
      return this
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  gmap.BaseComponentArray = BaseComponentArray

  return gmap
})(gmap, gmap.Core, gmap.Util)
