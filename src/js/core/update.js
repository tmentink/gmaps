// ------------------------------------------------------------------------
// GMaps: update.js
// ------------------------------------------------------------------------

!((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  Core.update = function(comp, ids, options) {
    if (options == undefined) {
      throw "Error: Must supply options"
    }
    else {
      options = _getOptions(options)
    }

    if (comp.Type == gmap.Const.Component.Type.MAP) {
      return _update(comp, options)
    }

    if ($.isArray(ids)) {
      return _multiUpdate(comp, ids, options)
    }

    if (comp[ids]) {
      return _update(comp[ids], options)
    }
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _update(comp, options) {
    comp.Obj.setOptions(options)
    return comp
  }

  function _multiUpdate(compArray, ids, options) {
    const newCompArray = new gmap[compArray.Type](compArray.Map)

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let comp = compArray[ids[i]]

      if (comp) {
        newCompArray[ids[i]] = _update(comp, options)
      }
    }

    return newCompArray
  }

  // TODO: replace with a Object literal lookup based on component type
  function _getOptions(options) {
    if ($.type(options.center) == "string") {
      options.center = gmap.Util.toLatLng(options.center)
    }

    if ($.type(options.paths) == "string") {
      options.paths = gmap.Util.toLatLngArray(options.paths)
    }

    if ($.type(options.position) == "string") {
      options.position = gmap.Util.toLatLng(options.position)
    }

    return options
  }


  return Core
})(gmap.Core || (gmap.Core = {}))
