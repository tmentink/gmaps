
var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Core.pop = function({count, ovlArray}) {
    const args  = arguments[0]
    args.action = Action.POP

    return pop(args)
  }

  Core.remove = function({ovl, ovlArray}) {
    const args = arguments[0]

    return ovlArray
      ? multiRemove(ovlArray)
      : remove(ovl)
  }

  Core.shift = function({count, ovlArray}) {
    const args  = arguments[0]
    args.action = Action.SHIFT

    return pop(args)
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------

  const Action = {
    POP    : "pop",
    SHIFT  : "shift"
  }

  const RemoveFunction = {
    pop(ovlArray) {
      const ovl = ovlArray.data.pop()
      return remove(ovl)
    },
    shift(ovlArray) {
      const ovl = ovlArray.data.shift()
      return remove(ovl)
    }
  }

  function remove(ovl) {
    const ovlArray = ovl.map.overlays[ovl.type]
    const index    = ovlArray.data.indexOf(ovl)

    ovl.obj.setMap(null)
    return ovlArray.data.splice(index, 1)[0]
  }

  function multiRemove(ovlArray) {
    const args        = arguments[0]
    const ids         = ovlArray.getIds()
    const newOvlArray = Get.newOverlayArray({ovlArray: ovlArray})

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      const ovl = ovlArray.findById(ids[i])
      if (ovl) newOvlArray.push(remove(ovl))
    }

    return newOvlArray
  }

  function pop({action, count=1, ovlArray}) {
    const newOvlArray = Get.newOverlayArray({ovlArray: ovlArray})

    while (count > 0 && ovlArray.data.length > 0) {
      newOvlArray.push(RemoveFunction[action](ovlArray))
      count --
    }

    return newOvlArray
  }


  return Core
})(Core || (Core = {}))
