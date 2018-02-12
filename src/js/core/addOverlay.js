// ------------------------------------------------------------------------
// gmaps: core/addOverlay.js
// ------------------------------------------------------------------------

var Core = ((Core) => {
  "use strict"


  // ----------------------------------------------------------------------
  // Public Functions
  // ----------------------------------------------------------------------

  // map     {gmap}
  // options {object || array<object>}
  // type    {string}
  Core.addOverlay = function(p) {
    p.type = Lookup.overlayType(p.type)

    if (IsValid.overlayType(p.type) === false) {
      return Error.throw({
        method  : "addOverlay",
        msg     : `${p.type} is not a valid overlay type`,
        obj     : {type: p.type}
      })
    }

    return $.isArray(p.options)
      ? multiAdd(p)
      : add(p)
  }


  // ----------------------------------------------------------------------
  // Private Functions
  // ----------------------------------------------------------------------

  function add(p) {
    p.options.id = Get.formattedId({
      id   : p.options.id,
      map  : p.map,
      type : p.type
    })

    p.options = Get.mergedOptions({
      convert : true,
      map     : p.map,
      options : p.options,
      type    : p.type
    })

    if (IsValid.overlayOptions(p.options)) {
      return new Overlays[p.type]({
        id      : p.options.id,
        options : p.options
      })
    }
  }

  function multiAdd(p) {
    const overlayArray = Get.newOverlayArray(p)

    for (var i = 0, i_end = p.options.length; i < i_end; i++) {
      const overlay = add({
        map     : p.map,
        options : p.options[i],
        type    : p.type
      })

      if (overlay) overlayArray.push(overlay)
    }

    return overlayArray
  }


  return Core
})(Core || (Core = {}))
