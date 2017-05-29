// ------------------------------------------------------------------------
// GMaps: components/baseComponent.js
// ------------------------------------------------------------------------

!((gmap) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class BaseComponent {

    constructor(id, options, obj, type){
      const map = options.map.GMaps.Parent

      this.Id = id
      this.Init = {
        Options: options
      }
      this.Map = map
      this.Obj = obj
      this.Obj["GMaps"] = {
        Id:      id,
        Map:     map,
        Parent:  this,
        Version: gmap.Version
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
