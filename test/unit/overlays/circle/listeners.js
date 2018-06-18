
describe("Overlays/Circle - Listeners", () => {
  let m

  before((done) => {
    m = new gmap({
      delimitedStrings: false,
      onLoad() {
        m.addOverlay("circles", data.map((x) => {
          return {
            center: x.jsonCenter,
            id: x.id,
            radius: 10000
          }
        }))

        done()
      }
    })
  })

  afterEach(() => {
    m.circles().off("all")
  })


  // ----------------------------------------------------------------------
  // All Circles
  // ----------------------------------------------------------------------

  it("should add and trigger a click event for all circles", () => {
    let click = false
    m.circles().on("click", () => {
      click = true
    })

    m.circles().trigger("click")
    chai.expect(click).to.be.true
  })

  it("should add and trigger a double click event for all circles", () => {
    let dblClick = false
    m.circles().on("double click", () => {
      dblClick = true
    })

    m.circles().trigger("double click")
    chai.expect(dblClick).to.be.true
  })

  it("should remove the click event before it is triggered for all circles", () => {
    let click = false
    m.circles().on("click", () => {
      click = true
    })

    m.circles().off("click")
    m.circles().trigger("click")
    chai.expect(click).to.be.false
  })

  it("should remove the click event but not the double click event for all circles", () => {
    let click = false
    let dblClick = false
    m.circles().on("click", () => {
      click = true
    })
    m.circles().on("double click", () => {
      dblClick = true
    })

    m.circles().off("click")
    m.circles().trigger("click")
    m.circles().trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.true
  })

  it("should remove all events for all circles", () => {
    let click = false
    let dblClick = false
    m.circles().on("click", () => {
      click = true
    })
    m.circles().on("double click", () => {
      dblClick = true
    })

    m.circles().off("all")
    m.circles().trigger("click")
    m.circles().trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.false
  })


  // ----------------------------------------------------------------------
  // Single Circle
  // ----------------------------------------------------------------------

  it("should add and trigger a click event for a single circle", () => {
    let click = false
    m.circles().findById(1).on("click", () => {
      click = true
    })

    m.circles().findById(1).trigger("click")
    chai.expect(click).to.be.true
  })

  it("should add and trigger a double click event for a single circle", () => {
    let dblClick = false
    m.circles().findById(1).on("double click", () => {
      dblClick = true
    })

    m.circles().findById(1).trigger("double click")
    chai.expect(dblClick).to.be.true
  })

  it("should remove the click event before it is triggered for a single circle", () => {
    let click = false
    m.circles().findById(1).on("click", () => {
      click = true
    })

    m.circles().findById(1).off("click")
    m.circles().findById(1).trigger("click")
    chai.expect(click).to.be.false
  })

  it("should remove the click event but not the double click event for a single circle", () => {
    let click = false
    let dblClick = false
    m.circles().findById(1).on("click", () => {
      click = true
    })
    m.circles().findById(1).on("double click", () => {
      dblClick = true
    })

    m.circles().findById(1).off("click")
    m.circles().findById(1).trigger("click")
    m.circles().findById(1).trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.true
  })

  it("should remove all events for a single circle", () => {
    let click = false
    let dblClick = false
    m.circles().findById(1).on("click", () => {
      click = true
    })
    m.circles().findById(1).on("double click", () => {
      dblClick = true
    })

    m.circles().findById(1).off("all")
    m.circles().findById(1).trigger("click")
    m.circles().findById(1).trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.false
  })

})
