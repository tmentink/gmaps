
var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Core.setOptions = function({option, ovl, ovlArray, value}) {
    const args  = arguments[0]
    args.option = formatUserOptions(args)

    return ovlArray
      ? multSetOptions(args)
      : setOptions(args)
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------

  function formatUserOptions({option, ovl, ovlArray, value}) {
    const Format = {
      object({option}) {
        return Get.renamedOptions({options: option})
      },
      string({option, value}) {
        return {[option]: value}
      }
    }

    return Get.convertedOptions({
      map     : ovlArray ? ovlArray.map : ovl.map,
      options : Format[Get.type(option)](arguments[0]),
      type    : ovlArray ? ovlArray.type : ovl.type,
    })
  }

  function multiSetOptions({option, ovlArray}) {
    const args        = arguments[0]
    const ids         = ovlArray.getIds()
    const newOvlArray = Get.newOverlayArray({ovlArray: ovlArray})

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      args.ovl = ovlArray.findById(ids[i])
      if (args.ovl) newOvlArray.push(setOptions(args))
    }

    return newOvlArray
  }

  function setOptions({option, ovl}) {
    ovl.obj.setOptions(option)
    return ovl
  }


  return Core
})(Core || (Core = {}))
