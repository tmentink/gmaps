// ------------------------------------------------------------------------
// GMaps: core/coordinates.js
// ------------------------------------------------------------------------

!((Core, Util) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  Core.getPath = function(compArray, ids, delimited) {
    ids = Util.toArray(ids)

    const retVal = {}
    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]
      let comp = compArray[id]

      if (comp) {
        let path = comp.Obj.getPath()
        retVal[id] = delimited ? Util.toDelimitedString(path) : path
      }
    }

    return _formatRetVal(retVal)
  }

  Core.getPosition = function(compArray, ids, delimited) {
    ids = Util.toArray(ids)

    const retVal = {}
    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]
      let comp = compArray[id]

      if (comp) {
        let position = comp.Obj.getPosition()
        retVal[id] = delimited ? Util.toDelimitedString(position) : position
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
