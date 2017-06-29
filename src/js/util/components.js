// ------------------------------------------------------------------------
// gmaps: util/components.js
// ------------------------------------------------------------------------

var Util = ((Util, ComponentOption) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const Conversions = {
    center: function(parms) {
      if (parms.center) {
        parms.center = Util.toLatLng(parms.center)
      }
    },
    path: function(parms) {
      if (parms.paths || parms.path) {
        parms.paths = Util.toLatLngArray(parms.paths || parms.path)
        delete parms.path
      }
    },
    position: function(parms) {
      if (parms.position) {
        parms.position = Util.toLatLng(parms.position)
      }
    }
  }

  const ConvertableOptions = {
    Label: {
      position : Conversions.position
    },
    Map: {
      center   : Conversions.center
    },
    Marker: {
      position : Conversions.position
    },
    Polygon: {
      path     : Conversions.path,
      paths    : Conversions.path
    }
  }

  const ComponentOptions = {
    Circle : [
      ComponentOption.CENTER,
      ComponentOption.CLICKABLE,
      ComponentOption.DRAGGABLE,
      ComponentOption.EDITABLE,
      ComponentOption.FILL_COLOR,
      ComponentOption.FILL_OPACITY,
      ComponentOption.MAP,
      ComponentOption.RADIUS,
      ComponentOption.STROKE_COLOR,
      ComponentOption.STROKE_OPACITY,
      ComponentOption.STROKE_POSITION,
      ComponentOption.STROKE_WEIGHT,
      ComponentOption.VISIBLE,
      ComponentOption.Z_INDEX
    ],
    GroundOverlay : [
      ComponentOption.CLICKABLE,
      ComponentOption.MAP,
      ComponentOption.OPACITY
    ],
    InfoWindow : [
      ComponentOption.CONTENT,
      ComponentOption.DISABLE_AUTO_PAN,
      ComponentOption.MAX_WIDTH,
      ComponentOption.PIXEL_OFFSET,
      ComponentOption.POSITION,
      ComponentOption.Z_INDEX
    ],
    Map : [
      ComponentOption.BACKGROUND_COLOR,
      ComponentOption.CENTER,
      ComponentOption.CLICKABLE_ICONS,
      ComponentOption.DISABLE_DEFAULT_UI,
      ComponentOption.DISABLE_DOUBLE_CLICK_ZOOM,
      ComponentOption.DRAGGABLE,
      ComponentOption.DRAGGABLE_CURSOR,
      ComponentOption.DRAGGING_CURSOR,
      ComponentOption.FULLSCREEN_CONTROL,
      ComponentOption.FULLSCREEN_CONTROL_OPTIONS,
      ComponentOption.GESTURE_HANDLING,
      ComponentOption.HEADING,
      ComponentOption.KEYBOARD_SHORTCUTS,
      ComponentOption.MAP_TYPE_CONTROL,
      ComponentOption.MAP_TYPE_CONTROL_OPTIONS,
      ComponentOption.MAP_TYPE_ID,
      ComponentOption.MAX_ZOOM,
      ComponentOption.NO_CLEAR,
      ComponentOption.PAN_CONTROL,
      ComponentOption.PAN_CONTROL_OPTIONS,
      ComponentOption.ROTATE_CONTROL,
      ComponentOption.ROTATE_CONTROL_OPTIONS,
      ComponentOption.SCALE_CONTROL,
      ComponentOption.SCALE_CONTROL_OPTIONS,
      ComponentOption.SCROLL_WHEEL,
      ComponentOption.STREET_VIEW,
      ComponentOption.STREET_VIEW_CONTROL,
      ComponentOption.STREET_VIEW_CONTROL_OPTIONS,
      ComponentOption.STYLES,
      ComponentOption.TILT,
      ComponentOption.ZOOM,
      ComponentOption.ZOOM_CONTROL,
      ComponentOption.ZOOM_CONTROL_OPTIONS
    ],
    Marker : [
      ComponentOption.ANCHOR_POINT,
      ComponentOption.ANIMATION,
      ComponentOption.CLICKABLE,
      ComponentOption.CROSS_ON_DRAG,
      ComponentOption.CURSOR,
      ComponentOption.DRAGGABLE,
      ComponentOption.ICON,
      ComponentOption.LABEL,
      ComponentOption.MAP,
      ComponentOption.OPACITY,
      ComponentOption.OPTIMIZED,
      ComponentOption.PLACE,
      ComponentOption.POSITION,
      ComponentOption.SHAPE,
      ComponentOption.TITLE,
      ComponentOption.VISIBLE,
      ComponentOption.Z_INDEX
    ],
    Polyline : [
      ComponentOption.CLICKABLE,
      ComponentOption.DRAGGABLE,
      ComponentOption.EDITABLE,
      ComponentOption.GEODESIC,
      ComponentOption.ICONS,
      ComponentOption.MAP,
      ComponentOption.PATH,
      ComponentOption.STROKE_COLOR,
      ComponentOption.STROKE_OPACITY,
      ComponentOption.STROKE_WEIGHT,
      ComponentOption.VISIBLE,
      ComponentOption.Z_INDEX
    ],
    Polygon : [
      ComponentOption.CLICKABLE,
      ComponentOption.DRAGGABLE,
      ComponentOption.EDITABLE,
      ComponentOption.FILL_COLOR,
      ComponentOption.FILL_OPACITY,
      ComponentOption.GEODESIC,
      ComponentOption.MAP,
      ComponentOption.PATHS,
      ComponentOption.STROKE_COLOR,
      ComponentOption.STROKE_OPACITY,
      ComponentOption.STROKE_POSITION,
      ComponentOption.STROKE_WEIGHT,
      ComponentOption.VISIBLE,
      ComponentOption.Z_INDEX
    ],
    Rectangle : [
      ComponentOption.BOUNDS,
      ComponentOption.CLICKABLE,
      ComponentOption.DRAGGABLE,
      ComponentOption.EDITABLE,
      ComponentOption.FILL_COLOR,
      ComponentOption.FILL_OPACITY,
      ComponentOption.MAP,
      ComponentOption.STROKE_COLOR,
      ComponentOption.STROKE_OPACITY,
      ComponentOption.STROKE_POSITION,
      ComponentOption.STROKE_WEIGHT,
      ComponentOption.VISIBLE,
      ComponentOption.Z_INDEX
    ]
  }

  const MapComponents = [
    Const.ComponentType.LABEL,
    Const.ComponentType.MARKER,
    Const.ComponentType.POLYGON
  ]


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Util.cleanComponentOptions = function(parms) {
    const compOptions = parms.compOptions
    const compType    = parms.compType.replace("Array", "")

    Object.keys(compOptions).forEach(function(key) {
      if (ComponentOptions[compType].indexOf(key) === -1) {
        delete compOptions[key]
      }
    })
    return compOptions
  }

  Util.convertComponentOptions = function(parms) {
    const compOptions = parms.compOptions
    const compType    = parms.compType.replace("Array", "")

    Object.keys(ConvertableOptions[compType]).forEach(function(key) {
      ConvertableOptions[compType][key](compOptions)
    })

    return compOptions
  }

  Util.copy = function(parms) {
    const compArray = parms.compArray
    const new_comp  = Util.getNewComponentArray(compArray)
    const proto     = _getPrototypes(compArray)
    const copy      = $.extend(true, new_comp, compArray)

    // remove proto from copy
    for (var i = 0, i_end = proto.length; i < i_end; i++) {
      delete copy[proto[i]]
    }

    return copy
  }

  Util.getGoogleObjects = function(parms) {
    return parms.compArray.data.map(function(comp) {
      return comp.obj
    })
  }

  Util.getIds = function(parms) {
    return parms.compArray.data.map(function(comp) {
      return comp.id
    })
  }

  Util.getNewComponentArray = function(compArray, map) {
    if ($.type(compArray) === "string") {
      return new Components[`${compArray}Array`]({ map: map })
    }

    return new Components[compArray.type]({ map: compArray.map })
  }

  Util.renameComponentOptions = function(compOptions) {
    Object.keys(compOptions).forEach(function(key) {
      Util.renameProperty({
        newName : Util.lookupComponentOption(key),
        obj     : compOptions,
        oldName : key
      })
    })
    return compOptions
  }

  Util.validComponentOption = function(parms) {
    const compType   = parms.compType
    const compOption = parms.compOption
    return ComponentOptions[compType].includes(compOption)
  }

  Util.validMapComponent = function(type) {
    return MapComponents.includes(type)
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _getPrototypes(compArray) {
    const proto      = Object.keys(Object.getPrototypeOf(compArray))
    const base_proto = Object.keys(
      Object.getPrototypeOf(new Components.BaseComponentArray({}))
    )

    return proto.concat(base_proto)
  }


  return Util
})(Util || (Util = {}), Const.ComponentOption)
