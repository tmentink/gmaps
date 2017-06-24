// ------------------------------------------------------------------------
// gmaps: components/baseComponent.js
// ------------------------------------------------------------------------

var Components = ((Components) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  class BaseComponent {

    constructor(parms){
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

  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Components.BaseComponent = BaseComponent

  return Components
})(Components || (Components = {}))
