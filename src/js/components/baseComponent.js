// ------------------------------------------------------------------------
// GMaps: components/baseComponent.js
// ------------------------------------------------------------------------

!((gmap) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class BaseComponent {

    constructor(parms){
      const id      = parms.id
      const map     = parms.options.map.GMaps.Parent
      const obj     = parms.obj
      const options = parms.options
      const type    = parms.type

      this.Id   = id
      this.Init = {
        Options : options
      }
      this.Map  = map
      this.Obj  = obj
      this.Obj["GMaps"] = {
        Id      : id,
        Map     : map,
        Parent  : this,
        Version : gmap.Version
      }
      this.Type = type
    }

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  gmap.BaseComponent = BaseComponent

  return gmap
})(gmap)
