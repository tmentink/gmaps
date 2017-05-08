// ------------------------------------------------------------------------
// GMaps: baseComponentArray.js
// ------------------------------------------------------------------------


!((gmap) => {
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
      return gmap.Core.getBounds(this, this.getIds())
    }

    getCenter() {
      return gmap.Core.getCenter(this, this.getIds())
    }

    getGoogleObjects() {
      return gmap.Util.getGoogleObjects(this)
    }

    getIds() {
      return gmap.Util.getIds(this)
    }

    hide() {
      return gmap.Core.hide(this, this.getIds())
    }

    not() {
      return gmap.Util.copy(this.Map.Components[this.ChildType], this.getIds())
    }

    remove() {
      return gmap.Core.remove(this, this.getIds())
    }

    reset() {
      return gmap.Core.reset(this, this.getIds())
    }

    show() {
      return gmap.Core.show(this, this.getIds())
    }

    toggle() {
      return gmap.Core.toggle(this, this.getIds())
    }

    update(options) {
      return gmap.Core.update(this, this.getIds(), options)
    }

  }

  gmap.BaseComponentArray = BaseComponentArray

  return gmap
})(gmap || {})
