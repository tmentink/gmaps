
describe("Overlays/Polyline - Listeners", () => {
  let m

  before((done) => {
    m = new gmap({
      delimitedStrings: true,
      onLoad() {
        m.addOverlay("polylines", data.map((x) => {
          return {
            path: x.delimitedPath,
            id: x.id
          }
        }))

        done()
      }
    })
  })

  afterEach(() => {
    m.polylines().off("all")
  })


  // ----------------------------------------------------------------------
  // All Polylines
  // ----------------------------------------------------------------------

  it("should add and trigger a click event for all polylines", () => {
    let click = false
    m.polylines().on("click", () => {
      click = true
    })

    m.polylines().trigger("click")
    chai.expect(click).to.be.true
  })

  it("should add and trigger a double click event for all polylines", () => {
    let dblClick = false
    m.polylines().on("double click", () => {
      dblClick = true
    })

    m.polylines().trigger("double click")
    chai.expect(dblClick).to.be.true
  })

  it("should remove the click event before it is triggered for all polylines", () => {
    let click = false
    m.polylines().on("click", () => {
      click = true
    })

    m.polylines().off("click")
    m.polylines().trigger("click")
    chai.expect(click).to.be.false
  })

  it("should remove the click event but not the double click event for all polylines", () => {
    let click = false
    let dblClick = false
    m.polylines().on("click", () => {
      click = true
    })
    m.polylines().on("double click", () => {
      dblClick = true
    })

    m.polylines().off("click")
    m.polylines().trigger("click")
    m.polylines().trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.true
  })

  it("should remove all events for all polylines", () => {
    let click = false
    let dblClick = false
    m.polylines().on("click", () => {
      click = true
    })
    m.polylines().on("double click", () => {
      dblClick = true
    })

    m.polylines().off("all")
    m.polylines().trigger("click")
    m.polylines().trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.false
  })


  // ----------------------------------------------------------------------
  // Single Polyline
  // ----------------------------------------------------------------------

  it("should add and trigger a click event for a single polyline", () => {
    let click = false
    m.polylines().findById(1).on("click", () => {
      click = true
    })

    m.polylines().findById(1).trigger("click")
    chai.expect(click).to.be.true
  })

  it("should add and trigger a double click event for a single polyline", () => {
    let dblClick = false
    m.polylines().findById(1).on("double click", () => {
      dblClick = true
    })

    m.polylines().findById(1).trigger("double click")
    chai.expect(dblClick).to.be.true
  })

  it("should remove the click event before it is triggered for a single polyline", () => {
    let click = false
    m.polylines().findById(1).on("click", () => {
      click = true
    })

    m.polylines().findById(1).off("click")
    m.polylines().findById(1).trigger("click")
    chai.expect(click).to.be.false
  })

  it("should remove the click event but not the double click event for a single polyline", () => {
    let click = false
    let dblClick = false
    m.polylines().findById(1).on("click", () => {
      click = true
    })
    m.polylines().findById(1).on("double click", () => {
      dblClick = true
    })

    m.polylines().findById(1).off("click")
    m.polylines().findById(1).trigger("click")
    m.polylines().findById(1).trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.true
  })

  it("should remove all events for a single polyline", () => {
    let click = false
    let dblClick = false
    m.polylines().findById(1).on("click", () => {
      click = true
    })
    m.polylines().findById(1).on("double click", () => {
      dblClick = true
    })

    m.polylines().findById(1).off("all")
    m.polylines().findById(1).trigger("click")
    m.polylines().findById(1).trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.false
  })

})
