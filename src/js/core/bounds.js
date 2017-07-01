// ------------------------------------------------------------------------
// gmaps: core/bounds.js
// ------------------------------------------------------------------------

var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const BoundsFunction = {
    Circle: function(comp) {
      return comp.obj.getBounds()
    },
    Label: function(comp) {
      return _getBoundsByPosition(comp)
    },
    Marker: function(comp) {
      return _getBoundsByPosition(comp)
    },
    Polygon: function(comp) {
      return _getBoundsByPaths(comp)
    },
    Polyline: function(comp) {
      return _getBoundsByPath(comp)
    },
    Rectangle: function(comp) {
      return comp.obj.getBounds()
    }
  }


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Core.fitBounds = function(parms) {
    const comps = parms.comps
    const map   = parms.map

    if (comps instanceof google.maps.LatLngBounds) {
      map.obj.fitBounds(comps)
    }
    else if ($.type(comps) === "object") {
      const bounds = _getBoundsByComponents(map.components, comps)
      map.obj.fitBounds(bounds)
    }
    else if (comps === "init" || comps === "initial") {
      map.obj.fitBounds(map.init.bounds)
      map.obj.setZoom(map.init.options.zoom)
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
      const type = Util.lookupComponentType(types[i])
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
    const path  = comp.obj.getPath()

    for (var i = 0, i_end = path.length; i < i_end; i++) {
      bounds.extend(path.getAt(i))
    }

    return bounds
  }

  function _getBoundsByPaths(comp) {
    const bounds = new google.maps.LatLngBounds()
    const paths  = comp.obj.getPaths()

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
    bounds.extend(comp.obj.getPosition())
    return bounds
  }

  function _getIds(compArray, ids) {
    return ids === null || ids === "all" ? compArray.getIds() : ids
  }


  return Core
})(Core || (Core = {}))
