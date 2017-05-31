// ------------------------------------------------------------------------
// GMaps: util/components.js
// ------------------------------------------------------------------------

!((Util, Const) => {
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
    const exclude   = _addPrototypesToArray(compArray, parms.exclude)

    const copy = $.extend(true, {}, compArray)
    for (var i = 0, i_end = exclude.length; i < i_end; i++) {
      delete copy[exclude[i]]
    }

    const new_comp = new gmap[compArray.Type]({ map: compArray.Map })
    return $.extend(new_comp, copy)
  }

  Util.getGoogleObjects = function(parms) {
    const compArray = parms.compArray
    const ids       = Util.getIds(compArray)

    return ids.map(function(id) {
      return compArray[id].Obj
    })
  }

  Util.getIds = function(parms) {
    const ids = Object.keys(parms.compArray)
    return _removeComponentProperties(ids)
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _addPrototypesToArray(compArray, array) {
    const proto      = Object.keys(Object.getPrototypeOf(compArray))
    const base_proto = Object.keys(Object.getPrototypeOf(new gmap.BaseComponentArray({})))

    array = proto.concat(array)
    array = base_proto.concat(array)
    return array
  }

  function _removeComponentProperties(ids) {
    Object.keys(Const.ComponentProperty).forEach(function(key) {
      const index = ids.indexOf(Const.ComponentProperty[key])
      if (index !== -1) {
        ids.splice(index, 1)
      }
    })

    return ids
  }


  return Util
})(gmap.Util || (gmap.Util = {}), gmap.Const)
