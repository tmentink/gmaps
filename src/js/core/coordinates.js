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
    Polygon: function(obj, index) {
      // eslint-disable-next-line eqeqeq
      return index != null ? obj.getPaths().getAt(index) : obj.getPaths()
    },
    Polyline: function(obj) {
      return obj.getPath()
    }
  }


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Core.getCoordinates = function(parms) {
    let comp        = parms.comp
    let coords      = null
    const compArray = parms.compArray
    const ids       = Util.toArray(parms.ids)
    const index     = parms.index
    const stringify = parms.stringify
    const retVal    = {}

    if (comp) {
      coords = CoordinateFunctions[comp.type](comp.obj, index)
      return _getCoords(coords, comp.map, stringify)
    }

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      const id = ids[i]
      comp     = compArray.findById(id)
      if (comp) {
        coords     = CoordinateFunctions[comp.type](comp.obj, index)
        retVal[id] = _getCoords(coords, comp.map, stringify)
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

  function _getCoords(coords, map, stringify) {
    let retVal = coords

    if (stringify) {
      retVal = Util.toString({
        map : map,
        val : coords
      })
    }

    return retVal
  }


  return Core
})(Core || (Core = {}))
