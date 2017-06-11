// ------------------------------------------------------------------------
// GMaps: util/lookup.js
// ------------------------------------------------------------------------

!((Util, Const) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const ConfigAlias = {
    delimiter      : Const.Config.DELIMITER,
    labeloptions   : Const.Config.LABEL_OPTIONS,
    mapid          : Const.Config.MAP_ID,
    mapoptions     : Const.Config.MAP_OPTIONS,
    markeroptions  : Const.Config.MARKER_OPTIONS,
    polygonoptions : Const.Config.POLYGON_OPTIONS,
    urlprecision   : Const.Config.URL_PRECISION
  }

  const ComponentTypeAlias = {
    label    : Const.ComponentType.LABEL,
    labels   : Const.ComponentType.LABEL,
    map      : Const.ComponentType.MAP,
    maps     : Const.ComponentType.MAP,
    marker   : Const.ComponentType.MARKER,
    markers  : Const.ComponentType.MARKER,
    polygon  : Const.ComponentType.POLYGON,
    polygons : Const.ComponentType.POLYGON
  }

  const EventTypeAlias = {
    animationchanged  : Const.EventType.ANIMATION_CHANGED,
    boundschanged     : Const.EventType.BOUNDS_CHANGED,
    centerchanged     : Const.EventType.CENTER_CHANGED,
    click             : Const.EventType.CLICK,
    clickablechanged  : Const.EventType.CLICKABLE_CHANGED,
    cursorchanged     : Const.EventType.CURSOR_CHANGED,
    doubleclick       : Const.EventType.DOUBLE_CLICK,
    drag              : Const.EventType.DRAG,
    dragend           : Const.EventType.DRAG_END,
    dragstart         : Const.EventType.DRAG_START,
    draggablechanged  : Const.EventType.DRAGGABLE_CHANGED,
    flatchanged       : Const.EventType.FLAT_CHANGED,
    headingchanged    : Const.EventType.HEADING_CHANGED,
    iconchanged       : Const.EventType.ICON_CHANGED,
    idle              : Const.EventType.IDLE,
    maptypeidchanged  : Const.EventType.MAP_TYPE_ID_CHANGED,
    mousedown         : Const.EventType.MOUSE_DOWN,
    mousemove         : Const.EventType.MOUSE_MOVE,
    mouseout          : Const.EventType.MOUSE_OUT,
    mouseover         : Const.EventType.MOUSE_OVER,
    mouseup           : Const.EventType.MOUSE_UP,
    positionchanged   : Const.EventType.POSITION_CHANGED,
    projectionchanged : Const.EventType.PROJECTION_CHANGED,
    resize            : Const.EventType.RESIZE,
    rightclick        : Const.EventType.RIGHT_CLICK,
    shapechanged      : Const.EventType.SHAPE_CHANGED,
    tilesloaded       : Const.EventType.TILES_LOADED,
    tiltchanged       : Const.EventType.TILT_CHANGED,
    titlechanged      : Const.EventType.TITLE_CHANGED,
    visiblechanged    : Const.EventType.VISIBLE_CHANGED,
    zindexchanged     : Const.EventType.ZINDEX_CHANGED,
    zoomchanged       : Const.EventType.ZOOM_CHANGED
  }


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  const regex = /\s+|\_+/g

  Util.getConfigOption = function(option) {
    option = option.toLowerCase().replace(regex, "")
    return ConfigAlias[option] || option
  }

  Util.getComponentType = function(type) {
    type = type.toLowerCase().replace(regex, "")
    return ComponentTypeAlias[type] || type
  }

  Util.getEventType = function(event) {
    event = event.toLowerCase().replace(regex, "")
    return EventTypeAlias[event] || event
  }


  return Util
})(gmap.Util || (gmap.Util = {}), gmap.Const)
