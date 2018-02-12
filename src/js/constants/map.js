// ------------------------------------------------------------------------
// gmaps: constants/map.js
// ------------------------------------------------------------------------

var Const = ((Const) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Map Constants
  // ----------------------------------------------------------------------

  const Options = {
    BACKGROUND_COLOR            : "backgroundColor",
    CENTER                      : "center",
    CLICKABLE_ICONS             : "clickableIcons",
    DISABLE_DEFAULT_UI          : "disableDefaultUI",
    DISABLE_DOUBLE_CLICK_ZOOM   : "disableDoubleClickZoom",
    DRAGGABLE                   : "draggable",
    DRAGGABLE_CURSOR            : "draggableCursor",
    DRAGGING_CURSOR             : "draggingCursor",
    FULLSCREEN_CONTROL          : "fullscreenControl",
    FULLSCREEN_CONTROL_OPTIONS  : "fullscreenControlOptions",
    GESTURE_HANDLING            : "gestureHandling",
    HEADING                     : "heading",
    KEYBOARD_SHORTCUTS          : "keyboardShortcuts",
    MAP_TYPE_CONTROL            : "mapTypeControl",
    MAP_TYPE_CONTROL_OPTIONS    : "mapTypeControlOptions",
    MAP_TYPE_ID                 : "mapTypeId",
    MAX_ZOOM                    : "maxZoom",
    MIN_ZOOM                    : "minZoom",
    NO_CLEAR                    : "noClear",
    PAN_CONTROL                 : "panControl",
    PAN_CONTROL_OPTIONS         : "panControlOptions",
    ROTATE_CONTROL              : "rotateControl",
    ROTATE_CONTROL_OPTIONS      : "rotateControlOptions",
    SCALE_CONTROL               : "scaleControl",
    SCALE_CONTROL_OPTIONS       : "scaleControlOptions",
    SCROLL_WHEEL                : "scrollWheel",
    STREET_VIEW                 : "streetView",
    STREET_VIEW_CONTROL         : "streetViewControl",
    STREET_VIEW_CONTROL_OPTIONS : "streetViewControlOptions",
    STYLES                      : "styles",
    TILT                        : "tilt",
    ZOOM                        : "zoom",
    ZOOM_CONTROL                : "zoomControl",
    ZOOM_CONTROL_OPTIONS        : "zoomControlOptions"
  }

  const Map = {
    options : [
      { name : Option.BACKGROUND_COLOR },
      {
        name : Option.CENTER,
        convertable : true,
        required    : true
      },
      { name : Option.CLICKABLE_ICONS },
      { name : Option.DISABLE_DEFAULT_UI },
      { name : Option.DISABLE_DOUBLE_CLICK_ZOOM },
      { name : Option.DRAGGABLE },
      { name : Option.DRAGGABLE_CURSOR },
      { name : Option.DRAGGING_CURSOR },
      { name : Option.FULLSCREEN_CONTROL },
      { name : Option.FULLSCREEN_CONTROL_OPTIONS },
      { name : Option.GESTURE_HANDLING },
      { name : Option.HEADING },
      { name : Option.KEYBOARD_SHORTCUTS },
      { name : Option.MAP_TYPE_CONTROL },
      { name : Option.MAP_TYPE_CONTROL_OPTIONS },
      { name : Option.MAP_TYPE_ID },
      { name : Option.MAX_ZOOM },
      { name : Option.MIN_ZOOM },
      { name : Option.NO_CLEAR },
      { name : Option.PAN_CONTROL },
      { name : Option.PAN_CONTROL_OPTIONS },
      { name : Option.ROTATE_CONTROL },
      { name : Option.ROTATE_CONTROL_OPTIONS },
      { name : Option.SCALE_CONTROL },
      { name : Option.SCALE_CONTROL_OPTIONS },
      { name : Option.SCROLL_WHEEL },
      { name : Option.STREET_VIEW },
      { name : Option.STREET_VIEW_CONTROL },
      { name : Option.STREET_VIEW_CONTROL_OPTIONS },
      { name : Option.STYLES },
      { name : Option.TILT },
      {
        name     : Option.ZOOM,
        required : true
      },
      { name : Option.ZOOM_CONTROL },
      { name : Option.ZOOM_CONTROL_OPTIONS }
    ]
  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Const.Map        = Map
  Const.MapOptions = Options


  return Const
})(Const || (Const = {}))
