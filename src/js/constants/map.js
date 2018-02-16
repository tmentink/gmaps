// ------------------------------------------------------------------------
// gmaps: constants/map.js
// ------------------------------------------------------------------------

var Const = ((Const) => {
  "use strict"


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
      { name : Options.BACKGROUND_COLOR },
      {
        name : Options.CENTER,
        convertable : true,
        required    : true
      },
      { name : Options.CLICKABLE_ICONS },
      { name : Options.DISABLE_DEFAULT_UI },
      { name : Options.DISABLE_DOUBLE_CLICK_ZOOM },
      { name : Options.DRAGGABLE },
      { name : Options.DRAGGABLE_CURSOR },
      { name : Options.DRAGGING_CURSOR },
      { name : Options.FULLSCREEN_CONTROL },
      { name : Options.FULLSCREEN_CONTROL_OPTIONS },
      { name : Options.GESTURE_HANDLING },
      { name : Options.HEADING },
      { name : Options.KEYBOARD_SHORTCUTS },
      { name : Options.MAP_TYPE_CONTROL },
      { name : Options.MAP_TYPE_CONTROL_OPTIONS },
      { name : Options.MAP_TYPE_ID },
      { name : Options.MAX_ZOOM },
      { name : Options.MIN_ZOOM },
      { name : Options.NO_CLEAR },
      { name : Options.PAN_CONTROL },
      { name : Options.PAN_CONTROL_OPTIONS },
      { name : Options.ROTATE_CONTROL },
      { name : Options.ROTATE_CONTROL_OPTIONS },
      { name : Options.SCALE_CONTROL },
      { name : Options.SCALE_CONTROL_OPTIONS },
      { name : Options.SCROLL_WHEEL },
      { name : Options.STREET_VIEW },
      { name : Options.STREET_VIEW_CONTROL },
      { name : Options.STREET_VIEW_CONTROL_OPTIONS },
      { name : Options.STYLES },
      { name : Options.TILT },
      {
        name     : Options.ZOOM,
        required : true
      },
      { name : Options.ZOOM_CONTROL },
      { name : Options.ZOOM_CONTROL_OPTIONS }
    ]
  }


  // ----------------------------------------------------------------------
  // Namespace
  // ----------------------------------------------------------------------

  Const.Map        = Map
  Const.MapOptions = Options


  return Const
})(Const || (Const = {}))
