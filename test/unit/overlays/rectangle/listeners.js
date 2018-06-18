
describe("Overlays/Rectangle - Listeners", () => {
  let m

  before((done) => {
    m = new gmap({
      delimitedStrings: false,
      onLoad() {
        m.addOverlay("rectangles", data.map((x) => {
          return {
            bounds: x.jsonBounds,
            id: x.id
          }
        }))

        done()
      }
    })
  })

  afterEach(() => {
    m.rectangles().off("all")
  })


  // ----------------------------------------------------------------------
  // All Rectangles
  // ----------------------------------------------------------------------

  it("should add and trigger a click event for all rectangles", () => {
    let click = false
    m.rectangles().on("click", () => {
      click = true
    })

    m.rectangles().trigger("click")
    chai.expect(click).to.be.true
  })

  it("should add and trigger a double click event for all rectangles", () => {
    let dblClick = false
    m.rectangles().on("double click", () => {
      dblClick = true
    })

    m.rectangles().trigger("double click")
    chai.expect(dblClick).to.be.true
  })

  it("should remove the click event before it is triggered for all rectangles", () => {
    let click = false
    m.rectangles().on("click", () => {
      click = true
    })

    m.rectangles().off("click")
    m.rectangles().trigger("click")
    chai.expect(click).to.be.false
  })

  it("should remove the click event but not the double click event for all rectangles", () => {
    let click = false
    let dblClick = false
    m.rectangles().on("click", () => {
      click = true
    })
    m.rectangles().on("double click", () => {
      dblClick = true
    })

    m.rectangles().off("click")
    m.rectangles().trigger("click")
    m.rectangles().trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.true
  })

  it("should remove all events for all rectangles", () => {
    let click = false
    let dblClick = false
    m.rectangles().on("click", () => {
      click = true
    })
    m.rectangles().on("double click", () => {
      dblClick = true
    })

    m.rectangles().off("all")
    m.rectangles().trigger("click")
    m.rectangles().trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.false
  })


  // ----------------------------------------------------------------------
  // Single Rectangle
  // ----------------------------------------------------------------------

  it("should add and trigger a click event for a single rectangle", () => {
    let click = false
    m.rectangles().findById(1).on("click", () => {
      click = true
    })

    m.rectangles().findById(1).trigger("click")
    chai.expect(click).to.be.true
  })

  it("should add and trigger a double click event for a single rectangle", () => {
    let dblClick = false
    m.rectangles().findById(1).on("double click", () => {
      dblClick = true
    })

    m.rectangles().findById(1).trigger("double click")
    chai.expect(dblClick).to.be.true
  })

  it("should remove the click event before it is triggered for a single rectangle", () => {
    let click = false
    m.rectangles().findById(1).on("click", () => {
      click = true
    })

    m.rectangles().findById(1).off("click")
    m.rectangles().findById(1).trigger("click")
    chai.expect(click).to.be.false
  })

  it("should remove the click event but not the double click event for a single rectangle", () => {
    let click = false
    let dblClick = false
    m.rectangles().findById(1).on("click", () => {
      click = true
    })
    m.rectangles().findById(1).on("double click", () => {
      dblClick = true
    })

    m.rectangles().findById(1).off("click")
    m.rectangles().findById(1).trigger("click")
    m.rectangles().findById(1).trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.true
  })

  it("should remove all events for a single rectangle", () => {
    let click = false
    let dblClick = false
    m.rectangles().findById(1).on("click", () => {
      click = true
    })
    m.rectangles().findById(1).on("double click", () => {
      dblClick = true
    })

    m.rectangles().findById(1).off("all")
    m.rectangles().findById(1).trigger("click")
    m.rectangles().findById(1).trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.false
  })

})
