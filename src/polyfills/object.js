
!(() => {
  "use strict"


  // ----------------------------------------------------------------------
  // Object.values
  // ----------------------------------------------------------------------

  if (!Object.values) {
    Object.values = function(obj) {

      // eslint-disable-next-line eqeqeq
      if (obj == null) return

      const values = []
      for (const key in obj) {
        values.push(obj[key])
      }

      return values
    }
  }


})()
