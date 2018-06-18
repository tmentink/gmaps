
describe("Overlays/Polygon - Listeners", () => {
  let m

  before((done) => {
    m = new gmap({
      delimitedStrings: false,
      onLoad() {
        m.addOverlay("polygons", data.map((x) => {
          return {
            path: x.jsonPath,
            id: x.id
          }
        }))

        done()
      }
    })
  })

  afterEach(() => {
    m.polygons().off("all")
  })


  // ----------------------------------------------------------------------
  // All Polygons
  // ----------------------------------------------------------------------

  it("should add and trigger a click event for all polygons", () => {
    let click = false
    m.polygons().on("click", () => {
      click = true
    })

    m.polygons().trigger("click")
    chai.expect(click).to.be.true
  })

  it("should add and trigger a double click event for all polygons", () => {
    let dblClick = false
    m.polygons().on("double click", () => {
      dblClick = true
    })

    m.polygons().trigger("double click")
    chai.expect(dblClick).to.be.true
  })

  it("should remove the click event before it is triggered for all polygons", () => {
    let click = false
    m.polygons().on("click", () => {
      click = true
    })

    m.polygons().off("click")
    m.polygons().trigger("click")
    chai.expect(click).to.be.false
  })

  it("should remove the click event but not the double click event for all polygons", () => {
    let click = false
    let dblClick = false
    m.polygons().on("click", () => {
      click = true
    })
    m.polygons().on("double click", () => {
      dblClick = true
    })

    m.polygons().off("click")
    m.polygons().trigger("click")
    m.polygons().trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.true
  })

  it("should remove all events for all polygons", () => {
    let click = false
    let dblClick = false
    m.polygons().on("click", () => {
      click = true
    })
    m.polygons().on("double click", () => {
      dblClick = true
    })

    m.polygons().off("all")
    m.polygons().trigger("click")
    m.polygons().trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.false
  })


  // ----------------------------------------------------------------------
  // Single Polygon
  // ----------------------------------------------------------------------

  it("should add and trigger a click event for a single polygon", () => {
    let click = false
    m.polygons().findById(1).on("click", () => {
      click = true
    })

    m.polygons().findById(1).trigger("click")
    chai.expect(click).to.be.true
  })

  it("should add and trigger a double click event for a single polygon", () => {
    let dblClick = false
    m.polygons().findById(1).on("double click", () => {
      dblClick = true
    })

    m.polygons().findById(1).trigger("double click")
    chai.expect(dblClick).to.be.true
  })

  it("should remove the click event before it is triggered for a single polygon", () => {
    let click = false
    m.polygons().findById(1).on("click", () => {
      click = true
    })

    m.polygons().findById(1).off("click")
    m.polygons().findById(1).trigger("click")
    chai.expect(click).to.be.false
  })

  it("should remove the click event but not the double click event for a single polygon", () => {
    let click = false
    let dblClick = false
    m.polygons().findById(1).on("click", () => {
      click = true
    })
    m.polygons().findById(1).on("double click", () => {
      dblClick = true
    })

    m.polygons().findById(1).off("click")
    m.polygons().findById(1).trigger("click")
    m.polygons().findById(1).trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.true
  })

  it("should remove all events for a single polygon", () => {
    let click = false
    let dblClick = false
    m.polygons().findById(1).on("click", () => {
      click = true
    })
    m.polygons().findById(1).on("double click", () => {
      dblClick = true
    })

    m.polygons().findById(1).off("all")
    m.polygons().findById(1).trigger("click")
    m.polygons().findById(1).trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.false
  })

})
