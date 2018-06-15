
var Is = ((Is, OverlayTypes) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  Is.BoundsInterface = function(val) {
    // eslint-disable-next-line eqeqeq
    if (val == null) return false

    const keys  = Object.keys(val)
    const types = Object.values(OverlayTypes)
    return keys.every((k) => {
      return types.includes(Lookup.overlayType(k))
    })
  }


  return Is
})(Is || (Is = {}), Const.OverlayTypes)