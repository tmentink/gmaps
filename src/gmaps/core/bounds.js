
var Core = ((Core, GoogleClasses) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Core.fitBounds = function({map, ovls}) {
    if (Is.LatLngBounds(ovls)) {
      map.obj.fitBounds(ovls)
    }
    else if (Is.Object(ovls)) {
      map.obj.fitBounds(Get.boundsByOverlayObject({map, ovls}))
    }
    else if (ovls === "init" || ovls === "initial") {
      map.obj.fitBounds(map.init.bounds)
      map.obj.setZoom(map.init.options.zoom)
    }

    return map
  }

  Core.getBounds = function({ids, ovl, ovlArray}) {
    const args  = arguments[0]
    args.bounds = new google.maps[GoogleClasses.LAT_LNG_BOUND]()

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
    Circle(ovl) {
      return ovl.obj.getBounds()
    },
    Label(ovl) {
      return Get.boundsByPosition({bounds, ovl})
    },
    Marker(ovl) {
      return Get.boundsByPosition({bounds, ovl})
    },
    Polygon(ovl) {
      return Get.boundsByPaths({bounds, ovl})
    },
    Polyline(ovl) {
      return Get.boundsByPath({bounds, ovl})
    },
    Rectangle(ovl) {
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
      if (args.ovl) bounds.union(BoundsFunction[ovl.type](args))
    }
  }


  return Core
})(Core || (Core = {}), Const.GoogleClasses)
