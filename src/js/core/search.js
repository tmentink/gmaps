// ------------------------------------------------------------------------
// gmaps: core/search.js
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
    const compArray = map.components[type]

    const newCompArray = new Components[compArray.type]({ map: map })
    newCompArray.data  = ids !== undefined ?
      _getDataByIds(compArray, Util.toArray(ids), matching) : compArray.data.slice(0)

    return newCompArray
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function _getDataByIds(compArray, ids, matching) {
    return compArray.data.filter(function(comp) {
      return matching === true ?
        ids.indexOf(comp.id) !== -1 : ids.indexOf(comp.id) === -1
    })
  }


  return Core
})(Core || (Core = {}))
