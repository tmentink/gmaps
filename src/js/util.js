// ------------------------------------------------------------------------
// GMaps: util.js
// ------------------------------------------------------------------------

!((gmap) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const Comp   = gmap.__gmap__.Components
  const Config = gmap.Config
  const Const  = gmap.__gmap__.Constants

  const ComponentTypeAlias = {
    label    : Const.Component.Type.LABEL,
    labels   : Const.Component.Type.LABEL,
    map      : Const.Component.Type.MAP,
    maps     : Const.Component.Type.MAP,
    marker   : Const.Component.Type.MARKER,
    markers  : Const.Component.Type.MARKER,
    polygon  : Const.Component.Type.POLYGON,
    polygons : Const.Component.Type.POLYGON
  }

  const EventTypeAlias = {
    animationchanged  : Const.Event.Type.ANIMATION_CHANGED,
    boundschanged     : Const.Event.Type.BOUNDS_CHANGED,
    centerchanged     : Const.Event.Type.CENTER_CHANGED,
    click             : Const.Event.Type.CLICK,
    clickablechanged  : Const.Event.Type.CLICKABLE_CHANGED,
    cursorchanged     : Const.Event.Type.CURSOR_CHANGED,
    doubleclick       : Const.Event.Type.DOUBLE_CLICK,
    drag              : Const.Event.Type.DRAG,
    dragend           : Const.Event.Type.DRAG_END,
    dragstart         : Const.Event.Type.DRAG_START,
    draggablechanged  : Const.Event.Type.DRAGGABLE_CHANGED,
    flatchanged       : Const.Event.Type.FLAT_CHANGED,
    headingchanged    : Const.Event.Type.HEADING_CHANGED,
    iconchanged       : Const.Event.Type.ICON_CHANGED,
    idle              : Const.Event.Type.IDLE,
    maptypeidchanged  : Const.Event.Type.MAP_TYPE_ID_CHANGED,
    mousedown         : Const.Event.Type.MOUSE_DOWN,
    mousemove         : Const.Event.Type.MOUSE_MOVE,
    mouseout          : Const.Event.Type.MOUSE_OUT,
    mouseover         : Const.Event.Type.MOUSE_OVER,
    mouseup           : Const.Event.Type.MOUSE_UP,
    positionchanged   : Const.Event.Type.POSITION_CHANGED,
    projectionchanged : Const.Event.Type.PROJECTION_CHANGED,
    resize            : Const.Event.Type.RESIZE,
    rightclick        : Const.Event.Type.RIGHT_CLICK,
    shapechanged      : Const.Event.Type.SHAPE_CHANGED,
    tilesloaded       : Const.Event.Type.TILES_LOADED,
    tiltchanged       : Const.Event.Type.TILT_CHANGED,
    titlechanged      : Const.Event.Type.TITLE_CHANGED,
    visiblechanged    : Const.Event.Type.VISIBLE_CHANGED,
    zindexchanged     : Const.Event.Type.ZINDEX_CHANGED,
    zoomchanged       : Const.Event.Type.ZOOM_CHANGED
  }


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

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
    const base_proto = Object.keys(Object.getPrototypeOf(new Comp.BaseComponentArray("", "")))

    // merge the src_proto and base_proto into the exclude array
    exclude = src_proto.concat(exclude)
    exclude = base_proto.concat(exclude)

    for (var i = 0, i_end = exclude.length; i < i_end; i++) {
      delete src_copy[exclude[i]]
    }

    const new_comp = source.Type ? new Comp[source.Type] : {}
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
    const ids = getIDs(compArray)
    const googleObjects = ids.map(function(id) {
      return compArray[id].Obj
    })

    return googleObjects
  }

  /**
   * Returns an array of the component's ids
   */
  const getIDs = function(compArray) {
    const ids = Object.keys(compArray)

    // remove object properties from array
    for (var prop in Const.Component.Properties) {
      const index = ids.indexOf(Const.Component.Properties[prop])
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
      LatLng: Config.Delimiter.LatLng || ","
    }

    const points = str.split(Delimiter.LatLng)
    return new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]))
  }

  /**
   * Converts a formatted string into an array of LatLng objects
   */
  const toLatLngArray = function(str) {
    const Delimiter = {
      LatLng: Config.Delimiter.LatLng || ",",
      LatLngPair: Config.Delimiter.LatLngPair || "|"
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
    copy:             copy,
    getComponentType: getComponentType,
    getEventType:     getEventType,
    getGoogleObjects: getGoogleObjects,
    getIDs:           getIDs,
    toArray:          toArray,
    toLatLng:         toLatLng,
    toLatLngArray:    toLatLngArray
  }

  return gmap
})(gmap || {})
