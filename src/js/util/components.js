// ------------------------------------------------------------------------
// GMaps: components.js
// ------------------------------------------------------------------------

!((Util, Const) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  Util.copy = function(compArray, exclude) {
    if ($.type(exclude) == "object") {
      exclude = Object.keys(exclude)
    }
    exclude = _addPrototypesToArray(compArray, exclude)

    const copy = $.extend(true, {}, compArray)
    for (var i = 0, i_end = exclude.length; i < i_end; i++) {
      delete copy[exclude[i]]
    }

    const new_comp = new gmap[compArray.Type]()
    return $.extend(new_comp, copy)
  }

  Util.getGoogleObjects = function(compArray) {
    const ids = Util.getIds(compArray)
    const googleObjects = ids.map(function(id) {
      return compArray[id].Obj
    })

    return googleObjects
  }

  Util.getIds = function(compArray) {
    const ids = Object.keys(compArray)
    return _removeComponentProperties(ids)
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _addPrototypesToArray(compArray, array) {
    const proto  = Object.keys(Object.getPrototypeOf(compArray))
    const base_proto = Object.keys(Object.getPrototypeOf(new gmap.BaseComponentArray("", "")))

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
