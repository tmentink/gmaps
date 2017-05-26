// ------------------------------------------------------------------------
// GMaps: search.js
// ------------------------------------------------------------------------

!((Core, Util) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  Core.search = function(map, type, ids) {
    const compArray = map.Components[type]
    if (ids) {
      const exclude = _getIdsToExclude(compArray, Util.toArray(ids))
      return Util.copy(compArray, exclude)
    }
    return compArray
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _getIdsToExclude(compArray, ids) {
    // ensure ids are strings
    ids = ids.toString().split(",")

    const allIDs = compArray.getIds()
    const exclude = allIDs.filter(function(i) {
      return ids.indexOf(i) === -1
    })
    return exclude
  }


  return Core
})(gmap.Core || (gmap.Core = {}), gmap.Util)
