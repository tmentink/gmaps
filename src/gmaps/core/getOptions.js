
var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Core.getOptions = function({option, ovl, ovlArray}) {
    const args  = arguments[0]
    args.option = Lookup.overlayOption(option)

    return ovlArray
      ? multiGetOptions(args)
      : getOptions(args)
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------

  function formatMultiReturn(retVal) {
    const keys = Object.keys(retVal)
    return keys.length === 1
      ? retVal[keys[0]]
      : retVal
  }

  function getAllObjectsOptions({obj, ovl}) {
    const options = Const.Overlays[ovl.type].options.map(opt => opt.name)

    Object.keys(obj).forEach((key) => {
      if (options.indexOf(key) === -1) delete obj[key]
    })

    return obj
  }

  function getOptions({option, ovl}) {
    const obj = Util.extend({}, ovl.obj)

    return option !== undefined
      ? obj[option]
      : getAllObjectsOptions({obj, ovl})
  }

  function multiGetOptions({option, ovlArray}) {
    const args   = arguments[0]
    const ids    = ovlArray.getIds()
    const retVal = {}

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      args.ovl = ovlArray.findById(ids[i])
      if (args.ovl) retVal[id] = getOptions(args)
    }

    return formatMultiReturn(retVal)
  }


  return Core
})(Core || (Core = {}))
