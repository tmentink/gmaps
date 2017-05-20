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
      text: Conversions.text
    },
    Map: {
      center: Conversions.center
    },
    Marker: {
      position: Conversions.position
    },
    Polygon: {
      paths: Conversions.paths
    }
  }

  const ComponentTypeAlias = {
    label    : gmap.Const.Component.Type.LABEL,
    labels   : gmap.Const.Component.Type.LABEL,
    map      : gmap.Const.Component.Type.MAP,
    maps     : gmap.Const.Component.Type.MAP,
    marker   : gmap.Const.Component.Type.MARKER,
    markers  : gmap.Const.Component.Type.MARKER,
    polygon  : gmap.Const.Component.Type.POLYGON,
    polygons : gmap.Const.Component.Type.POLYGON
  }

  const EventTypeAlias = {
    animationchanged  : gmap.Const.Event.Type.ANIMATION_CHANGED,
    boundschanged     : gmap.Const.Event.Type.BOUNDS_CHANGED,
    centerchanged     : gmap.Const.Event.Type.CENTER_CHANGED,
    click             : gmap.Const.Event.Type.CLICK,
    clickablechanged  : gmap.Const.Event.Type.CLICKABLE_CHANGED,
    cursorchanged     : gmap.Const.Event.Type.CURSOR_CHANGED,
    doubleclick       : gmap.Const.Event.Type.DOUBLE_CLICK,
    drag              : gmap.Const.Event.Type.DRAG,
    dragend           : gmap.Const.Event.Type.DRAG_END,
    dragstart         : gmap.Const.Event.Type.DRAG_START,
    draggablechanged  : gmap.Const.Event.Type.DRAGGABLE_CHANGED,
    flatchanged       : gmap.Const.Event.Type.FLAT_CHANGED,
    headingchanged    : gmap.Const.Event.Type.HEADING_CHANGED,
    iconchanged       : gmap.Const.Event.Type.ICON_CHANGED,
    idle              : gmap.Const.Event.Type.IDLE,
    maptypeidchanged  : gmap.Const.Event.Type.MAP_TYPE_ID_CHANGED,
    mousedown         : gmap.Const.Event.Type.MOUSE_DOWN,
    mousemove         : gmap.Const.Event.Type.MOUSE_MOVE,
    mouseout          : gmap.Const.Event.Type.MOUSE_OUT,
    mouseover         : gmap.Const.Event.Type.MOUSE_OVER,
    mouseup           : gmap.Const.Event.Type.MOUSE_UP,
    positionchanged   : gmap.Const.Event.Type.POSITION_CHANGED,
    projectionchanged : gmap.Const.Event.Type.PROJECTION_CHANGED,
    resize            : gmap.Const.Event.Type.RESIZE,
    rightclick        : gmap.Const.Event.Type.RIGHT_CLICK,
    shapechanged      : gmap.Const.Event.Type.SHAPE_CHANGED,
    tilesloaded       : gmap.Const.Event.Type.TILES_LOADED,
    tiltchanged       : gmap.Const.Event.Type.TILT_CHANGED,
    titlechanged      : gmap.Const.Event.Type.TITLE_CHANGED,
    visiblechanged    : gmap.Const.Event.Type.VISIBLE_CHANGED,
    zindexchanged     : gmap.Const.Event.Type.ZINDEX_CHANGED,
    zoomchanged       : gmap.Const.Event.Type.ZOOM_CHANGED
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

    // remove object properties from array
    for (var prop in gmap.Const.Component.Properties) {
      const index = ids.indexOf(gmap.Const.Component.Properties[prop])
      if (index !== -1) {
        ids.splice(index, 1)
      }
    }

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
   * Converts a formatted string into a LatLng object
   */
  const toLatLng = function(str) {
    const Delimiter = {
      LatLng: gmap.Config.Delimiter.LatLng || ","
    }

    const points = str.split(Delimiter.LatLng)
    return new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]))
  }

  /**
   * Converts a formatted string into an array of LatLng objects
   */
  const toLatLngArray = function(str) {
    const Delimiter = {
      LatLng: gmap.Config.Delimiter.LatLng || ",",
      LatLngPair: gmap.Config.Delimiter.LatLngPair || "|"
    }

    const latLngArray = []
    const coordPairs = str.split(Delimiter.LatLngPair)

    for (var i = 0, i_end = coordPairs.length; i < i_end; i++) {
      let points = coordPairs[i].split(Delimiter.LatLng)
      let latLng = new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]))
      latLngArray.push(latLng)
    }

    return latLngArray
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
    toLatLng: toLatLng,
    toLatLngArray: toLatLngArray
  }

  return gmap
})(gmap || {})
