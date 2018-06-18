
describe("Overlays/Marker - Listeners", () => {
  let m

  before((done) => {
    m = new gmap({
      delimitedStrings: false,
      onLoad() {
        m.addOverlay("markers", data.map((x) => {
          return {
            position: x.jsonCenter,
            id: x.id
          }
        }))

        done()
      }
    })
  })

  afterEach(() => {
    m.markers().off("all")
  })


  // ----------------------------------------------------------------------
  // All Markers
  // ----------------------------------------------------------------------

  it("should add and trigger a click event for all markers", () => {
    let click = false
    m.markers().on("click", () => {
      click = true
    })

    m.markers().trigger("click")
    chai.expect(click).to.be.true
  })

  it("should add and trigger a double click event for all markers", () => {
    let dblClick = false
    m.markers().on("double click", () => {
      dblClick = true
    })

    m.markers().trigger("double click")
    chai.expect(dblClick).to.be.true
  })

  it("should remove the click event before it is triggered for all markers", () => {
    let click = false
    m.markers().on("click", () => {
      click = true
    })

    m.markers().off("click")
    m.markers().trigger("click")
    chai.expect(click).to.be.false
  })

  it("should remove the click event but not the double click event for all markers", () => {
    let click = false
    let dblClick = false
    m.markers().on("click", () => {
      click = true
    })
    m.markers().on("double click", () => {
      dblClick = true
    })

    m.markers().off("click")
    m.markers().trigger("click")
    m.markers().trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.true
  })

  it("should remove all events for all markers", () => {
    let click = false
    let dblClick = false
    m.markers().on("click", () => {
      click = true
    })
    m.markers().on("double click", () => {
      dblClick = true
    })

    m.markers().off("all")
    m.markers().trigger("click")
    m.markers().trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.false
  })


  // ----------------------------------------------------------------------
  // Single Marker
  // ----------------------------------------------------------------------

  it("should add and trigger a click event for a single marker", () => {
    let click = false
    m.markers().findById(1).on("click", () => {
      click = true
    })

    m.markers().findById(1).trigger("click")
    chai.expect(click).to.be.true
  })

  it("should add and trigger a double click event for a single marker", () => {
    let dblClick = false
    m.markers().findById(1).on("double click", () => {
      dblClick = true
    })

    m.markers().findById(1).trigger("double click")
    chai.expect(dblClick).to.be.true
  })

  it("should remove the click event before it is triggered for a single marker", () => {
    let click = false
    m.markers().findById(1).on("click", () => {
      click = true
    })

    m.markers().findById(1).off("click")
    m.markers().findById(1).trigger("click")
    chai.expect(click).to.be.false
  })

  it("should remove the click event but not the double click event for a single marker", () => {
    let click = false
    let dblClick = false
    m.markers().findById(1).on("click", () => {
      click = true
    })
    m.markers().findById(1).on("double click", () => {
      dblClick = true
    })

    m.markers().findById(1).off("click")
    m.markers().findById(1).trigger("click")
    m.markers().findById(1).trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.true
  })

  it("should remove all events for a single marker", () => {
    let click = false
    let dblClick = false
    m.markers().findById(1).on("click", () => {
      click = true
    })
    m.markers().findById(1).on("double click", () => {
      dblClick = true
    })

    m.markers().findById(1).off("all")
    m.markers().findById(1).trigger("click")
    m.markers().findById(1).trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.false
  })

})
