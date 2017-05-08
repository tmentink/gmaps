// ------------------------------------------------------------------------
// GMaps: search.js
// ------------------------------------------------------------------------

!((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  Core.search = function(map, type, ids) {
    const compArray = map.Components[type]
    if (ids) {
      const exclude = _getIdsToExclude(compArray, gmap.Util.toArray(ids))
      return gmap.Util.copy(compArray, exclude)
    }
    return compArray
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _getIdsToExclude(compArray, ids) {
    const allIDs = compArray.getIds()
    const exclude = allIDs.filter(function(i) {
      return ids.indexOf(i) === -1
    })

    return exclude
  }


  return Core
})(gmap.Core || (gmap.Core = {}))
