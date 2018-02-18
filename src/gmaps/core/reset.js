
var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Core.reset = function({ovl, ovlArray}) {
    const args = arguments[0]

    return ovlArray
      ? multiReset(ovlArray)
      : reset(ovl)
  }

  Core.resetMap = function({map}) {
    map.obj.fitBounds(map.init.bounds)
    map.obj.setOptions(map.init.options)
    return map
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------

  function reset(ovl) {
    ovl.obj.setOptions(ovl.init.options)
    return ovl
  }

  function multiReset(ovlArray) {
    const args        = arguments[0]
    const ids         = ovlArray.getIds()
    const newOvlArray = Get.newOverlayArray({ovlArray: ovlArray})

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      const ovl = ovlArray.findById(ids[i])
      if (ovl) newOvlArray.push(reset(ovl))
    }

    return newOvlArray
  }


  return Core
})(Core || (Core = {}))
