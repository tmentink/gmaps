
var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Core.hide = function({ovl, ovlArray}) {
    const args  = arguments[0]
    args.action = Action.HIDE

    return display(args)
  }

  Core.show = function({ovl, ovlArray}) {
    const args  = arguments[0]
    args.action = Action.SHOW

    return display(args)
  }

  Core.toggle = function({condition, ovl, ovlArray}) {
    const args  = arguments[0]
    args.action = Action.TOGGLE

    if (Is.Boolean(condition)) {
      args.action = condition ? Action.SHOW : Action.HIDE
    }

    return display(args)
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------

  const Action = {
    HIDE   : "hide",
    SHOW   : "show",
    TOGGLE : "toggle"
  }

  const Visibility = {
    hide() {
      return false
    },
    show() {
      return true
    },
    toggle(ovl) {
      return !ovl.obj.getVisible()
    }
  }

  function display({action, ovl}) {
    ovl.obj.setOptions({visible: Visibility[action](ovl)})
    return ovl
  }

  function multiDisplay({action, ovlArray}) {
    const args        = arguments[0]
    const ids         = ovlArray.getIds()
    const newOvlArray = Get.newOverlayArray({ovlArray: ovlArray})

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      args.ovl = ovlArray.findById(ids[i])
      if (args.ovl) newOvlArray.push(display(args))
    }

    return newOvlArray
  }

  function setDisplay({action, ovl, ovlArray}) {
    const args = arguments[0]
    return ovlArray
      ? multiDisplay(args)
      : display(args)
  }


  return Core
})(Core || (Core = {}))
