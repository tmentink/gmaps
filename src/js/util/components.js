// ------------------------------------------------------------------------
// GMaps: util/components.js
// ------------------------------------------------------------------------

var Util = ((Util) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  const Conversions = {
    center: function(parms) {
      parms.center = Util.toLatLng(parms.center)
    },
    path: function(parms) {
      if (parms.paths || parms.path) {
        parms.paths = Util.toLatLngArray(parms.paths || parms.path)
        delete parms.path
      }
    },
    position: function(parms) {
      parms.position = Util.toLatLng(parms.position)
    },
    text: function(parms) {
      parms.text = parms.text || parms.id
    }
  }

  const ConvertableOptions = {
    Label: {
      position : Conversions.position,
      text     : Conversions.text
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


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Util.convertCompOptions = function(parms) {
    const compOptions = parms.compOptions
    const compType    = parms.compType.replace("Array", "")

    Object.keys(ConvertableOptions[compType]).forEach(function(key) {
      ConvertableOptions[compType][key](compOptions)
    })

    return compOptions
  }

  Util.copy = function(parms) {
    const compArray = parms.compArray
    const new_comp  = new Components[compArray.Type]({ map: compArray.Map })
    const proto     = _getPrototypes(compArray)
    const copy      = $.extend(true, new_comp, compArray)

    // remove proto from copy
    for (var i = 0, i_end = proto.length; i < i_end; i++) {
      delete copy[proto[i]]
    }

    return copy
  }

  Util.getGoogleObjects = function(parms) {
    return parms.compArray.Data.map(function(comp) {
      return comp.Obj
    })
  }

  Util.getIds = function(parms) {
    return parms.compArray.Data.map(function(comp) {
      return comp.Id
    })
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
})(Util || (Util = {}))
