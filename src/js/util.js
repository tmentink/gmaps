// ------------------------------------------------------------------------
// GMaps: util.js
// ------------------------------------------------------------------------

!((gmap) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const Conversions = {
    center: function(parms) {
      if ($.type(parms.center) == "string") {
        parms.center = gmap.Util.toLatLng(parms.center)
      }
    },
    paths: function(parms) {
      if ($.type(parms.paths) == "string") {
        parms.paths = gmap.Util.toLatLngArray(parms.paths)
      }
    },
    position: function(parms) {
      if ($.type(parms.position) == "string") {
        parms.position = gmap.Util.toLatLng(parms.position)
      }
    },
    text: function(parms) {
      parms.text = parms.text || parms.id
    }
  }

  const ConvertableComponentOptions = {
    Label: {
      position: Conversions.position,
      text:     Conversions.text
    },
    Map: {
      center:   Conversions.center
    },
    Marker: {
      position: Conversions.position
    },
    Polygon: {
      paths:    Conversions.paths
    }
  }

  const ComponentTypeAlias = {
    label:    gmap.Const.ComponentType.LABEL,
    labels:   gmap.Const.ComponentType.LABEL,
    map:      gmap.Const.ComponentType.MAP,
    maps:     gmap.Const.ComponentType.MAP,
    marker:   gmap.Const.ComponentType.MARKER,
    markers:  gmap.Const.ComponentType.MARKER,
    polygon:  gmap.Const.ComponentType.POLYGON,
    polygons: gmap.Const.ComponentType.POLYGON
  }

  const EventTypeAlias = {
    animationchanged:  gmap.Const.EventType.ANIMATION_CHANGED,
    boundschanged:     gmap.Const.EventType.BOUNDS_CHANGED,
    centerchanged:     gmap.Const.EventType.CENTER_CHANGED,
    click:             gmap.Const.EventType.CLICK,
    clickablechanged:  gmap.Const.EventType.CLICKABLE_CHANGED,
    cursorchanged:     gmap.Const.EventType.CURSOR_CHANGED,
    doubleclick:       gmap.Const.EventType.DOUBLE_CLICK,
    drag:              gmap.Const.EventType.DRAG,
    dragend:           gmap.Const.EventType.DRAG_END,
    dragstart:         gmap.Const.EventType.DRAG_START,
    draggablechanged:  gmap.Const.EventType.DRAGGABLE_CHANGED,
    flatchanged:       gmap.Const.EventType.FLAT_CHANGED,
    headingchanged:    gmap.Const.EventType.HEADING_CHANGED,
    iconchanged:       gmap.Const.EventType.ICON_CHANGED,
    idle:              gmap.Const.EventType.IDLE,
    maptypeidchanged:  gmap.Const.EventType.MAP_TYPE_ID_CHANGED,
    mousedown:         gmap.Const.EventType.MOUSE_DOWN,
    mousemove:         gmap.Const.EventType.MOUSE_MOVE,
    mouseout:          gmap.Const.EventType.MOUSE_OUT,
    mouseover:         gmap.Const.EventType.MOUSE_OVER,
    mouseup:           gmap.Const.EventType.MOUSE_UP,
    positionchanged:   gmap.Const.EventType.POSITION_CHANGED,
    projectionchanged: gmap.Const.EventType.PROJECTION_CHANGED,
    resize:            gmap.Const.EventType.RESIZE,
    rightclick:        gmap.Const.EventType.RIGHT_CLICK,
    shapechanged:      gmap.Const.EventType.SHAPE_CHANGED,
    tilesloaded:       gmap.Const.EventType.TILES_LOADED,
    tiltchanged:       gmap.Const.EventType.TILT_CHANGED,
    titlechanged:      gmap.Const.EventType.TITLE_CHANGED,
    visiblechanged:    gmap.Const.EventType.VISIBLE_CHANGED,
    zindexchanged:     gmap.Const.EventType.ZINDEX_CHANGED,
    zoomchanged:       gmap.Const.EventType.ZOOM_CHANGED
  }


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  /**
   * Converts the supplied parameters based on the component type
   */
  const convertCompOptions = function(type, parms) {
    type = type.replace("Array", "")

    Object.keys(ConvertableComponentOptions[type]).forEach(function(key) {
      ConvertableComponentOptions[type][key](parms)
    })

    return parms
  }

  /**
   * Returns a copy of source minus the values of exclude
   */
  const copy = function(source, exclude) {
    const src_copy = $.extend(true, {}, source)

    // convert exclude into an array
    if ($.type(exclude) == "object") {
      exclude = Object.keys(exclude)
    }
    else if ($.type(exclude) == "string") {
      exclude = exclude.split(",")
    }

    // get the source object's prototype
    const src_proto  = Object.keys(Object.getPrototypeOf(source))

    // get the baseComponentArray class' prototype
    const base_proto = Object.keys(Object.getPrototypeOf(new gmap.BaseComponentArray("", "")))

    // merge the src_proto and base_proto into the exclude array
    exclude = src_proto.concat(exclude)
    exclude = base_proto.concat(exclude)

    for (var i = 0, i_end = exclude.length; i < i_end; i++) {
      delete src_copy[exclude[i]]
    }

    const new_comp = source.Type ? new gmap[source.Type] : {}
    return $.extend(new_comp, src_copy)
  }

  /**
   * Returns component type constant
   */
  const getComponentType = function(type) {
    type = type.toLowerCase().replace(/\s+/g, "")
    return ComponentTypeAlias[type] || type
  }

  /**
   * Calculates destination point from the supplied parameters
   */
  const getDestinationPoint = function(latLng, bearing, distance) {
    bearing = bearing.toRad()
    distance = distance / 6371

    const src_lat = latLng.lat().toRad()
    const src_lng = latLng.lng().toRad()

    const dest_lat = Math.asin(Math.sin(src_lat) * Math.cos(distance) +
                               Math.cos(src_lat) * Math.sin(distance) *
                               Math.cos(bearing))

    const dest_lng = src_lng + Math.atan2(Math.sin(bearing) * Math.sin(distance) * Math.cos(src_lat),
                                          Math.cos(distance) - Math.sin(src_lat) * Math.sin(dest_lat))

    if (isNaN(src_lng) || isNaN(dest_lng)) {
      return null
    }

    return new google.maps.LatLng(dest_lat.toDeg(), dest_lng.toDeg())
  }

  /**
   * Returns event type constant
   */
  const getEventType = function(event) {
    event = event.toLowerCase().replace(/\s+/g, "")
    return EventTypeAlias[event] || event
  }

  /**
   * Returns an array of the component's google objects
   */
  const getGoogleObjects = function(compArray) {
    const ids = getIds(compArray)
    const googleObjects = ids.map(function(id) {
      return compArray[id].Obj
    })

    return googleObjects
  }

  /**
   * Returns an array of the component's ids
   */
  const getIds = function(compArray) {
    const ids = Object.keys(compArray)

    // remove component properties from array
    Object.keys(gmap.Const.ComponentProperty).forEach(function(key) {
      const index = ids.indexOf(gmap.Const.ComponentProperty[key])
      if (index !== -1) {
        ids.splice(index, 1)
      }
    })

    return ids
  }

  /**
   * Returns value converted into an array
   */
  const toArray = function(value) {
    if ($.type(value) == "number") {
      value = value.toString().split()
    }
    else if ($.type(value) == "string") {
      value = value.split()
    }
    else if ($.type(value) == "array") {
      value = value.toString().split(",")
    }

    return value
  }

  /**
   * Converts a MVCArray into a delimited string
   */
  const toDelimitedString = function(MVCArray) {
    const Delimiter = {
      LatLng: gmap.Config.Delimiter.LatLng || "|"
    }
    let str = ""

    MVCArray.forEach(function(el, i) {
      if (i > 0) {
        str += Delimiter.LatLng
      }
      str += el.toUrlValue(gmap.Config.UrlPrecision)
    })

    return str
  }

  /**
   * Converts a comma delimited string into a LatLng object
   */
  const toLatLng = function(str) {
    const points = str.split(",")
    return new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]))
  }

  /**
   * Converts a formatted string into an array of LatLng objects
   */
  const toLatLngArray = function(str) {
    const Delimiter = {
      LatLng: gmap.Config.Delimiter.LatLng || "|"
    }

    const latLngArray = []
    const coordPairs = str.split(Delimiter.LatLng)
    for (var i = 0, i_end = coordPairs.length; i < i_end; i++) {
      latLngArray.push(toLatLng(coordPairs[i]))
    }

    return latLngArray
  }

  /**
   * Converts a multidimensional MVCArray into a delimited string
   */
  const toMultiDelimitedString = function(MVCArray) {
    const Delimiter = {
      LatLngArray: gmap.Config.Delimiter.LatLngArray || "~"
    }
    let str = ""

    MVCArray.forEach(function(el, i) {
      if (i > 0) {
        str += Delimiter.LatLngArray
      }
      str += toDelimitedString(el)
    })

    return str
  }


  // ----------------------------------------------------------------------
  // Add Util Namespace
  // ----------------------------------------------------------------------

  gmap.Util = {
    convertCompOptions: convertCompOptions,
    copy: copy,
    getComponentType: getComponentType,
    getDestinationPoint: getDestinationPoint,
    getEventType: getEventType,
    getGoogleObjects: getGoogleObjects,
    getIds: getIds,
    toArray: toArray,
    toDelimitedString: toDelimitedString,
    toLatLng: toLatLng,
    toLatLngArray: toLatLngArray,
    toMultiDelimitedString: toMultiDelimitedString
  }

  return gmap
})(gmap || {})
