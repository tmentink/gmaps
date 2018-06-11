
var Core = ((Core, GoogleClasses) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Core.fitBounds = function({map, ovls}) {
    if (Is.LatLngBounds(ovls) || Is.LatLngBoundsLiteral(ovls)) {
      map.obj.fitBounds(ovls)
    }
    else if (Is.BoundsInterface(ovls)) {
      map.obj.fitBounds(Get.boundsByInterface({map, ovls}))
    }
    else if (ovls === "init" || ovls === "initial") {
      map.obj.fitBounds(map.init.bounds)
      map.obj.setZoom(map.init.options.zoom)
    }

    return map
  }

  Core.getBounds = function({ids, ovl, ovlArray}) {
    const args  = arguments[0]
    args.bounds = new google.maps[GoogleClasses.LAT_LNG_BOUNDS]()

    return ovlArray
      ? multiGetBounds(args)
      : getBounds(args)
  }

  Core.getCenter = function({ovl, ovlArray}) {
    const bounds = Core.getBounds(arguments[0])
    return bounds.getCenter()
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------

  const BoundsFunction = {
    Circle({ovl}) {
      return ovl.obj.getBounds()
    },
    Label({bounds, ovl}) {
      return Get.boundsByPosition({bounds, ovl})
    },
    Marker({bounds, ovl}) {
      return Get.boundsByPosition({bounds, ovl})
    },
    Polygon({bounds, ovl}) {
      return Get.boundsByPaths({bounds, ovl})
    },
    Polyline({bounds, ovl}) {
      return Get.boundsByPath({bounds, ovl})
    },
    Rectangle({ovl}) {
      return ovl.obj.getBounds()
    }
  }

  function getBounds({bounds, ovl}) {
    return bounds.union(BoundsFunction[ovl.type](arguments[0]))
  }

  function multiGetBounds({bounds, ids, ovlArray}) {
    const args = arguments[0]
    ids        = ids || ovlArray.getIds()

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      args.ovl = ovlArray.findById(ids[i])
      if (args.ovl) bounds.union(BoundsFunction[args.ovl.type](args))
    }

    return bounds
  }


  return Core
})(Core || (Core = {}), Const.GoogleClasses)
