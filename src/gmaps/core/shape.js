
var Core = ((Core, GoogleClasses, ShapeDegrees) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Core.shape = function({map, type, options}) {
    const args = arguments[0]
    args.type  = Lookup.shapeType(type)

    if (IsValid.shapeType(args.type) === false) {
      return Error.throw({
        method  : "shape",
        msg     : `${type} is not a valid shape`,
        args    : {type, options}
      })
    }

    return getShapePath(args)
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------


  function getDestinationPoint({bearing, distance, lat, lng}) {
    bearing  = Convert.toRad(bearing)
    distance = distance / 6371
    lat      = Convert.toRad(lat)
    lng      = Convert.toRad(lng)

    let dest_lat = Math.asin(
      Math.sin(lat) * Math.cos(distance) +
      Math.cos(lat) * Math.sin(distance) *
      Math.cos(bearing)
    )

    let dest_lng = lng + Math.atan2(
      Math.sin(bearing) * Math.sin(distance) * Math.cos(lat),
      Math.cos(distance) - Math.sin(lat) * Math.sin(dest_lat)
    )

    if (isNaN(lng) || isNaN(dest_lng)) {
      return null
    }

    dest_lat = Convert.toDeg(dest_lat)
    dest_lng = Convert.toDeg(dest_lng)

    return new google.maps[GoogleClasses.LAT_LNG](dest_lat, dest_lng)
  }

  function getShapePath({map, options, type}) {
    let center = options.center || map.getCenter()
    let size   = options.size || getSizeFromMapZoom(map)

    if (Is.LatLng(center) === false) {
      center = Convert.toLatLng(center)
    }

    const path = []
    for (var i = 0, i_end = ShapeDegrees[type].length; i < i_end; i++) {
      const latLng = getDestinationPoint({
        bearing  : ShapeDegrees[type][i],
        distance : size,
        lat      : center.lat(),
        lng      : center.lng()
      })

      path.push(latLng)
    }

    return path
  }

  function getSizeFromMapZoom(map) {
    const minZoom = 5
    const size    = 500
    const zoom    = map.getZoom()

    return zoom <= minZoom
      ? size
      : size / Math.pow(2, zoom - minZoom)
  }


  return Core
})(Core || (Core = {}), Const.GoogleClasses, Const.ShapeDegrees)
