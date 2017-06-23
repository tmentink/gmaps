// ------------------------------------------------------------------------
// GMaps: core/search.js
// ------------------------------------------------------------------------

var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Methods
  // ----------------------------------------------------------------------

  Core.search = function(parms) {
    const ids       = parms.ids
    const map       = parms.map
    const matching  = parms.matching
    const type      = parms.type
    const compArray = map.Components[type]

    const newCompArray = new Components[compArray.Type]({ map: map })
    newCompArray.Data  = ids !== undefined ?
      _getDataByIds(compArray, Util.toArray(ids), matching) : compArray.Data.slice(0)

    return newCompArray
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _getDataByIds(compArray, ids, matching) {
    return compArray.Data.filter(function(comp) {
      return matching === true ?
        ids.indexOf(comp.Id) !== -1 : ids.indexOf(comp.Id) === -1
    })
  }


  return Core
})(Core || (Core = {}))
