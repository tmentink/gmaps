
var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Core.search = function({ids, matching, ovlArray}) {
    const args        = arguments[0]
    const map         = ovlArray.map
    const newOvlArray = Get.newOverlayArray({ovlArray: ovlArray})

    newOvlArray.data  = ids === undefined
      ? ovlArray.data.slice(0)
      : getDataByIds(args)

    return newOvlArray
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------

  function formatIds(ids) {
    return Convert.toArray(ids).map(id => id.toString())
  }

  function getDataByIds({ids, matching, ovlArray}) {
    ids = formatIds(ids)
    return ovlArray.data.filter(ovl => {
      return matching === true
        ? ids.indexOf(ovl.id) !== -1
        : ids.indexOf(ovl.id) === -1
    })
  }


  return Core
})(Core || (Core = {}))
