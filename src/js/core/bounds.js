// ------------------------------------------------------------------------
// GMaps: bounds.js
// ------------------------------------------------------------------------

!((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const BoundsFunction = {
    Label   : function(comp) { return _getBoundsByPosition(comp) },
    Marker  : function(comp) { return _getBoundsByPosition(comp) },
    Polygon : function(comp) { return _getBoundsByPath(comp) }
  }


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  Core.getBounds = function(compArray, ids) {
    ids = gmap.Util.toArray(ids)

    const bounds = new google.maps.LatLngBounds()
    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let comp = compArray[ids[i]]

      if (comp) {
        bounds.union(BoundsFunction[compArray.ChildType](comp))
      }
    }
    return bounds
  }

  Core.getCenter = function(compArray, ids) {
    return Core.getBounds(compArray, ids).getCenter()
  }

  Core.setBounds = function(map, parms) {
    if ($.type(parms) == "object") {
      const bounds = _getBoundsByComponents(map.Components, parms)
      map.Obj.fitBounds(bounds)
    }
    else if (parms == "init" || parms == "initial") {
      map.Obj.fitBounds(map.Init.Bounds)
      map.Obj.setZoom(map.Init.Options.zoom)
    }

    return map
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _getBoundsByComponents(mapComps, parms) {
    const bounds = new google.maps.LatLngBounds()

    const types = Object.keys(parms)
    for (var i = 0, i_end = types.length; i < i_end; i++) {
      let type = gmap.Util.getComponentType(types[i])
      let ids = _getIds(mapComps[type], parms[types[i]])

      bounds.union(gmap.Core.getBounds(mapComps[type], ids))
    }

    return bounds
  }

  function _getBoundsByPath(comp) {
    const bounds = new google.maps.LatLngBounds()
    const paths = comp.Obj.getPaths()

    for (var i = 0, i_end = paths.length; i < i_end; i++) {
      let path = paths.getAt(i)

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

  function _getIds(comp, ids) {
    return ids == null || ids == "all" ? gmap.Util.getIds(comp) : ids
  }


  return Core
})(gmap.Core || (gmap.Core = {}))
