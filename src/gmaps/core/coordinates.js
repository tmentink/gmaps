
var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Core.getCoordinates = function({index, ovl, ovlArray, stringify}) {
    return ovlArray
      ? multiGetCoords(args)
      : getCoords(args)
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------

  const Coordinates = {
    Label: function({ovl}) {
      return ovl.obj.getPosition()
    },
    Marker: function({ovl}) {
      return ovl.obj.getPosition()
    },
    Polygon: function({index, ovl}) {
      return index >= 0
        ? ovl.obj.getPaths().getAt(index)
        : ovl.obj.getPaths()
    },
    Polyline: function({ovl}) {
      return ovl.obj.getPath()
    }
  }

  function formatCoords({val, map, stringify}) {
    return stringify
      ? Convert.toString(arguments[0])
      : val
  }

  function formatRetVal(retVal) {
    const keys = Object.keys(retVal)
    return keys.length === 1
      ? retVal[keys[0]]
      : retVal
  }

  function getCoords({index, ovl, stringify}) {
    const args = arguments[0]
    args.val   = Coordinates[ovl.type](args)

    return formatCoords(args)
  }

  function multiGetCoords({index, ovlArray, stringify}) {
    const args   = arguments[0]
    const ids    = ovlArray.getIds()
    const retVal = {}

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      args.ovl = ovlArray.findById(ids[i])
      if (args.ovl) retVal[id] = getCoords(args)
    }

    return formatRetVal(retVal)
  }


  return Core
})(Core || (Core = {}))
