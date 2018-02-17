
var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Core.search = function(parms) {
    const ids       = parms.ids
    const map       = parms.map
    const matching  = parms.matching
    const type      = parms.type
    const compArray = map.components[type]

    const newCompArray = Util.getNewComponentArray(compArray)
    newCompArray.data  = ids !== undefined ?
      _getDataByIds(compArray, _formatIds(ids), matching) : compArray.data.slice(0)

    return newCompArray
  }


  // ----------------------------------------------------------------------
  // Private
  // ----------------------------------------------------------------------

  function _formatIds(ids) {
    return Util.toArray(ids).map(function(id) {
      return id.toString()
    })
  }

  function _getDataByIds(compArray, ids, matching) {
    return compArray.data.filter(function(comp) {
      return matching === true ?
        ids.indexOf(comp.id) !== -1 : ids.indexOf(comp.id) === -1
    })
  }


  return Core
})(Core || (Core = {}))
