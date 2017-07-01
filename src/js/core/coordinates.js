// ------------------------------------------------------------------------
// gmaps: core/coordinates.js
// ------------------------------------------------------------------------

var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const CoordinateFunctions = {
    Label: function(obj) {
      return obj.getPosition()
    },
    Marker: function(obj) {
      return obj.getPosition()
    },
    Polygon: function(obj) {
      return obj.getPaths()
    },
    Polyline: function(obj) {
      return obj.getPath()
    }
  }


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Core.getCoordinates = function(parms) {
    const compArray = parms.compArray
    const stringify = parms.stringify
    const ids       = Util.toArray(parms.ids)
    const retVal    = {}

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      const id   = ids[i]
      const comp = compArray.findById(id)
      if (comp) {
        const coords = CoordinateFunctions[comp.type](comp.obj)
        retVal[id]   = stringify ? Util.toString(coords) : coords
      }
    }

    return _formatRetVal(retVal)
  }


  // ----------------------------------------------------------------------
  // Private Function
  // ----------------------------------------------------------------------

  function _formatRetVal(retVal) {
    const keys = Object.keys(retVal)
    return keys.length === 1 ? retVal[keys[0]] : retVal
  }


  return Core
})(Core || (Core = {}))
