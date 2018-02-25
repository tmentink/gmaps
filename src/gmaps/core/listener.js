
var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Core.addListener = function({func, ovl, ovlArray, type}) {
    const args  = arguments[0]
    args.action = Action.ADD

    return listener(args)
  }

  Core.removeListener = function({func, ovl, ovlArray, type}) {
    const args  = arguments[0]
    args.action = type !== "all" ? Action.REMOVE_TYPE : Action.REMOVE_ALL

    return listener(args)
  }

  Core.triggerListener = function({func, ovl, ovlArray, type}) {
    const args  = arguments[0]
    args.action = Action.TRIGGER

    return listener(args)
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------

  const Action = {
    ADD         : "add",
    REMOVE_ALL  : "remove_all",
    REMOVE_TYPE : "remove_type",
    TRIGGER     : "trigger"
  }

  const Execute = {
    add({func, ovl, type}) {
      google.maps.event.addListener(ovl.obj, type, func)
      return ovl
    },
    remove_all({ovl}) {
      google.maps.event.clearInstanceListeners(ovl.obj)
      return ovl
    },
    remove_type({ovl, type}) {
      google.maps.event.clearListeners(ovl.obj, type)
      return ovl
    },
    trigger({ovl, type}) {
      google.maps.event.trigger(ovl.obj, type, {})
      return ovl
    }
  }

  function listener({action, func, ovl, ovlArray, type}) {
    const args = arguments[0]
    args.type  = Lookup.eventType(type)

    return ovlArray
      ? multiListener(args)
      : Execute[action](args)
  }

  function multiListener({action, func, ovlArray, type}) {
    const args        = arguments[0]
    const ids         = ovlArray.getIds()
    const newOvlArray = Get.newOverlayArray({ovlArray: ovlArray})

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      args.ovl = ovlArray.findById(ids[i])
      if (args.ovl) newOvlArray.push(Execute[action](args))
    }

    return newOvlArray
  }


  return Core
})(Core || (Core = {}))
