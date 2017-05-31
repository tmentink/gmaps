// ------------------------------------------------------------------------
// GMaps: core/search.js
// ------------------------------------------------------------------------

!((Core, Util) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Core.search = function(parms) {
    const map       = parms.map
    const ids       = parms.ids
    const type      = parms.type
    const compArray = map.Components[type]

    if (ids) {
      return Util.copy({
        compArray : compArray,
        exclude   : _getIdsToExclude(compArray, Util.toArray(ids))
      })
    }
    return compArray
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _getIdsToExclude(compArray, ids) {
    // ensure ids are strings
    ids = ids.toString().split(",")

    const allIDs  = compArray.getIds()
    const exclude = allIDs.filter(function(i) {
      return ids.indexOf(i) === -1
    })
    return exclude
  }


  return Core
})(gmap.Core || (gmap.Core = {}), gmap.Util)
