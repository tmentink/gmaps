// ------------------------------------------------------------------------
// GMaps: core/coordinates.js
// ------------------------------------------------------------------------

!((Core, Util) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Core.getPath = function(parms) {
    const compArray = parms.compArray
    const delimited = parms.delimited
    const ids       = Util.toArray(parms.ids)
    const retVal    = {}

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      const id   = ids[i]
      const comp = compArray[id]

      if (comp) {
        const path = comp.Obj.getPath()
        retVal[id] = delimited ? Util.toDelimitedString(path) : path
      }
    }

    return _formatRetVal(retVal)
  }

  Core.getPosition = function(parms) {
    const compArray = parms.compArray
    const delimited = parms.delimited
    const ids       = Util.toArray(parms.ids)
    const retVal    = {}

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      const id   = ids[i]
      const comp = compArray[id]

      if (comp) {
        const position = comp.Obj.getPosition()
        retVal[id]     = delimited ? Util.toDelimitedString(position) : position
      }
    }

    return _formatRetVal(retVal)
  }


  // ----------------------------------------------------------------------
  // Private Function
  // ----------------------------------------------------------------------

  function _formatRetVal(retVal) {
    const keys = Object.keys(retVal)
    return keys.length == 1 ? retVal[keys[0]] : retVal
  }


  return Core
})(gmap.Core || (gmap.Core = {}), gmap.Util)
