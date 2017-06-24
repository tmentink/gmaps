// ------------------------------------------------------------------------
// GMaps: util/lookup.js
// ------------------------------------------------------------------------

var Util = ((Util) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const ConfigAlias = {
    delimitedstrings : Const.Config.DELIMITED_STRINGS,
    delimiter        : Const.Config.DELIMITER,
    labeloptions     : Const.Config.LABEL_OPTIONS,
    mapid            : Const.Config.MAP_ID,
    mapoptions       : Const.Config.MAP_OPTIONS,
    markeroptions    : Const.Config.MARKER_OPTIONS,
    polygonoptions   : Const.Config.POLYGON_OPTIONS,
    urlprecision     : Const.Config.URL_PRECISION
  }

  const ComponentOptionAlias = {
    anchorpoint              : Const.ComponentOption.ANCHOR_POINT,
    animation                : Const.ComponentOption.ANIMATION,
    backgroundcolor          : Const.ComponentOption.BACKGROUND_COLOR,
    bounds                   : Const.ComponentOption.BOUNDS,
    center                   : Const.ComponentOption.CENTER,
    clickable                : Const.ComponentOption.CLICKABLE,
    clickableicons           : Const.ComponentOption.CLICKABLE_ICONS,
    content                  : Const.ComponentOption.CONTENT,
    crossondrag              : Const.ComponentOption.CROSS_ON_DRAG,
    cursor                   : Const.ComponentOption.CURSOR,
    disableautopan           : Const.ComponentOption.DISABLE_AUTO_PAN,
    disabledefaultui         : Const.ComponentOption.DISABLE_DEFAULT_UI,
    disabledoubleclickzoom   : Const.ComponentOption.DISABLE_DOUBLE_CLICK_ZOOM,
    draggable                : Const.ComponentOption.DRAGGABLE,
    draggablecursor          : Const.ComponentOption.DRAGGABLE_CURSOR,
    draggingcursor           : Const.ComponentOption.DRAGGING_CURSOR,
    editable                 : Const.ComponentOption.EDITABLE,
    fillcolor                : Const.ComponentOption.FILL_COLOR,
    fillopacity              : Const.ComponentOption.FILL_OPACITY,
    fullscreencontrol        : Const.ComponentOption.FULLSCREEN_CONTROL,
    fullscreencontroloptions : Const.ComponentOption.FULLSCREEN_CONTROL_OPTIONS,
    geodesic                 : Const.ComponentOption.GEODESIC,
    gesturehandling          : Const.ComponentOption.GESTURE_HANDLING,
    heading                  : Const.ComponentOption.HEADING,
    icon                     : Const.ComponentOption.ICON,
    icons                    : Const.ComponentOption.ICONS,
    keyboardshortcuts        : Const.ComponentOption.KEYBOARD_SHORTCUTS,
    label                    : Const.ComponentOption.LABEL,
    map                      : Const.ComponentOption.MAP,
    maptypecontrol           : Const.ComponentOption.MAP_TYPE_CONTROL,
    maptypecontroloptions    : Const.ComponentOption.MAP_TYPE_CONTROL_OPTIONS,
    maptypeid                : Const.ComponentOption.MAP_TYPE_ID,
    maxwidth                 : Const.ComponentOption.MAX_WIDTH,
    maxzoom                  : Const.ComponentOption.MAX_ZOOM,
    noclear                  : Const.ComponentOption.NO_CLEAR,
    opacity                  : Const.ComponentOption.OPACITY,
    optimized                : Const.ComponentOption.OPTIMIZED,
    pancontrol               : Const.ComponentOption.PAN_CONTROL,
    pancontroloptions        : Const.ComponentOption.PAN_CONTROL_OPTIONS,
    path                     : Const.ComponentOption.PATH,
    paths                    : Const.ComponentOption.PATHS,
    pixeloffset              : Const.ComponentOption.PIXEL_OFFSET,
    place                    : Const.ComponentOption.PLACE,
    position                 : Const.ComponentOption.POSITION,
    radius                   : Const.ComponentOption.RADIUS,
    rotatecontrol            : Const.ComponentOption.ROTATE_CONTROL,
    rotatecontroloptions     : Const.ComponentOption.ROTATE_CONTROL_OPTIONS,
    scalecontrol             : Const.ComponentOption.SCALE_CONTROL,
    scalecontroloptions      : Const.ComponentOption.SCALE_CONTROL_OPTIONS,
    scrollwheel              : Const.ComponentOption.SCROLL_WHEEL,
    shape                    : Const.ComponentOption.SHAPE,
    streetview               : Const.ComponentOption.STREET_VIEW,
    streetviewcontrol        : Const.ComponentOption.STREET_VIEW_CONTROL,
    streetviewcontroloptions : Const.ComponentOption.STREET_VIEW_CONTROL_OPTIONS,
    strokecolor              : Const.ComponentOption.STROKE_COLOR,
    strokeopacity            : Const.ComponentOption.STROKE_OPACITY,
    strokeposition           : Const.ComponentOption.STROKE_POSITION,
    strokeweight             : Const.ComponentOption.STROKE_WEIGHT,
    styles                   : Const.ComponentOption.STYLES,
    tilt                     : Const.ComponentOption.TILT,
    title                    : Const.ComponentOption.TITLE,
    visible                  : Const.ComponentOption.VISIBLE,
    zoom                     : Const.ComponentOption.ZOOM,
    zoomcontrol              : Const.ComponentOption.ZOOM_CONTROL,
    zoomcontroloptions       : Const.ComponentOption.ZOOM_CONTROL_OPTIONS,
    zindex                   : Const.ComponentOption.Z_INDEX
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

  Util.getConfigOption = function(option) {
    option = Util.toLowerCase(option)
    return ConfigAlias[option] || option
  }

  Util.getComponentOption = function(option) {
    option = Util.toLowerCase(option)
    return ComponentOptionAlias[option] || option
  }

  Util.getComponentType = function(type) {
    type = Util.toLowerCase(type)
    return ComponentTypeAlias[type] || type
  }

  Util.getEventType = function(event) {
    event = Util.toLowerCase(event)
    return EventTypeAlias[event] || event
  }


  return Util
})(Util || (Util = {}))
