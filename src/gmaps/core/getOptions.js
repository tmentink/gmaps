
var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Core.getMapOptions = function({map, option}) {
    option = Lookup.mapOption(option)

    return option !== undefined
      ? map.obj[option]
      : getAllObjectsOptions({map})
  }

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

  function getAllObjectsOptions({map, ovl}) {
    const obj = ovl !== undefined
      ? ovl.obj
      : map.obj

    const options = ovl !== undefined
      ? Const.Overlays[ovl.type].options.map(opt => opt.name)
      : Const.Map.options.map(opt => opt.name)

    const retVal = {}
    for (var i = 0, i_end = options.length; i < i_end; i++) {
      const key = options[i]
      if (obj[key] !== undefined) {
        retVal[key] = obj[key]
      }
    }

    return retVal
  }

  function getOptions({option, ovl}) {
    return option !== undefined
      ? ovl.obj[option]
      : getAllObjectsOptions({ovl})
  }

  function multiGetOptions({option, ovlArray}) {
    const args   = arguments[0]
    const ids    = ovlArray.getIds()
    const retVal = {}

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      args.ovl = ovlArray.findById(ids[i])
      if (args.ovl) retVal[ids[i]] = getOptions(args)
    }

    return formatMultiReturn(retVal)
  }


  return Core
})(Core || (Core = {}))
