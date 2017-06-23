// ------------------------------------------------------------------------
// GMaps: core/bounds.js
// ------------------------------------------------------------------------

var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const BoundsFunction = {
    Label: function(comp) {
      return _getBoundsByPosition(comp)
    },
    Marker: function(comp) {
      return _getBoundsByPosition(comp)
    },
    Polygon: function(comp) {
      return _getBoundsByPath(comp)
    }
  }


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Core.fitBounds = function(parms) {
    const comps = parms.comps
    const map   = parms.map

    if ($.type(comps) === "object") {
      const bounds = _getBoundsByComponents(map.Components, comps)
      map.Obj.fitBounds(bounds)
    }
    else if (comps === "init" || comps === "initial") {
      map.Obj.fitBounds(map.Init.Bounds)
      map.Obj.setZoom(map.Init.Options.zoom)
    }

    return map
  }

  Core.getBounds = function(parms) {
    const bounds    = new google.maps.LatLngBounds()
    const compArray = parms.compArray
    const ids       = Util.toArray(parms.ids)

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      const comp = compArray.findById(ids[i])
      if (comp) {
        bounds.union(BoundsFunction[compArray.getChildType()](comp))
      }
    }

    return bounds
  }

  Core.getCenter = function(parms) {
    const bounds = Core.getBounds({
      compArray : parms.compArray,
      ids       : parms.ids
    })

    return bounds.getCenter()
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _getBoundsByComponents(mapComps, comps) {
    const bounds = new google.maps.LatLngBounds()
    const types  = Object.keys(comps)

    for (var i = 0, i_end = types.length; i < i_end; i++) {
      const type = Util.getComponentType(types[i])
      const ids  = _getIds(mapComps[type], comps[types[i]])

      bounds.union(Core.getBounds({
        compArray : mapComps[type],
        ids       : ids
      }))
    }

    return bounds
  }

  function _getBoundsByPath(comp) {
    const bounds = new google.maps.LatLngBounds()
    const paths  = comp.Obj.getPaths()

    for (var i = 0, i_end = paths.length; i < i_end; i++) {
      const path = paths.getAt(i)

      for (var j = 0, j_end = path.getLength(); j < j_end; j++) {
        bounds.extend(path.getAt(j))
      }
    }

    return bounds
  }

  function _getBoundsByPosition(comp) {
    const bounds = new google.maps.LatLngBounds()
    bounds.extend(comp.Obj.getPosition())
    return bounds
  }

  function _getIds(compArray, ids) {
    return ids === null || ids === "all" ?
      Util.getIds({ compArray: compArray }) : ids
  }


  return Core
})(Core || (Core = {}))
