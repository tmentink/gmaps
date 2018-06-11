
var Get = ((Get, GoogleClasses) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Get.boundsByInterface = function({map, ovls}) {
    const bounds = new google.maps[GoogleClasses.LAT_LNG_BOUNDS]()
    const types  = Object.keys(ovls)

    for (var i = 0, i_end = types.length; i < i_end; i++) {
      const type = Lookup.overlayType(types[i])
      const ids  = getIds(map.overlays[type], ovls[types[i]])

      bounds.union(Core.getBounds({
        ids      : ids,
        ovlArray : map.overlays[type]
      }))
    }

    return bounds
  }

  Get.boundsByPath = function({bounds, ovl}) {
    const path = ovl.obj.getPath()

    for (var i = 0, i_end = path.length; i < i_end; i++) {
      bounds.extend(path.getAt(i))
    }

    return bounds
  }

  Get.boundsByPaths = function({bounds, ovl}) {
    const paths = ovl.obj.getPaths()

    for (var i = 0, i_end = paths.length; i < i_end; i++) {
      const path = paths.getAt(i)

      for (var j = 0, j_end = path.getLength(); j < j_end; j++) {
        bounds.extend(path.getAt(j))
      }
    }

    return bounds
  }

  Get.boundsByPosition = function({bounds, ovl}) {
    bounds.extend(ovl.obj.getPosition())
    return bounds
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------

  function getIds(ovlArray, ids) {
    return ids === null || ids === "all"
      ? ovlArray.getIds()
      : ids
  }


  return Get
})(Get || (Get = {}), Const.GoogleClasses)
