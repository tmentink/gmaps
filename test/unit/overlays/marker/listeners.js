
describe("Overlays/Marker - Listeners", () => {
  let m, oa, ovl

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

        oa = m.markers()
        ovl = oa.findById(1)

        done()
      }
    })
  })

  afterEach(() => {
    oa.off("all")
    ovl.off("all")
  })


  // ----------------------------------------------------------------------
  // All Markers
  // ----------------------------------------------------------------------

  it("ALL: should add and trigger a click event", () => {
    let click = false
    oa.on("click", () => {
      click = true
    })

    oa.trigger("click")
    chai.expect(click).to.be.true
  })

  it("ALL: should add and trigger a double click event", () => {
    let dblClick = false
    oa.on("double click", () => {
      dblClick = true
    })

    oa.trigger("double click")
    chai.expect(dblClick).to.be.true
  })

  it("ALL: should remove the click event before it is triggered", () => {
    let click = false
    oa.on("click", () => {
      click = true
    })

    oa.off("click")
    oa.trigger("click")
    chai.expect(click).to.be.false
  })

  it("ALL: should remove the click event but not the double click event", () => {
    let click = false
    let dblClick = false
    oa.on("click", () => {
      click = true
    })
    oa.on("double click", () => {
      dblClick = true
    })

    oa.off("click")
    oa.trigger("click")
    oa.trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.true
  })

  it("ALL: should remove all events", () => {
    let click = false
    let dblClick = false
    oa.on("click", () => {
      click = true
    })
    oa.on("double click", () => {
      dblClick = true
    })

    oa.off("all")
    oa.trigger("click")
    oa.trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.false
  })

  it("ALL: should add a click event that only triggers once", () => {
    let click = 1
    oa.one("click", () => {
      click += 1
    })

    oa.trigger("click")
    oa.trigger("click")
    chai.expect(click).to.equal(59)
  })


  // ----------------------------------------------------------------------
  // Single Marker
  // ----------------------------------------------------------------------

  it("ONE: should add and trigger a click event", () => {
    let click = false
    ovl.on("click", () => {
      click = true
    })

    ovl.trigger("click")
    chai.expect(click).to.be.true
  })

  it("ONE: should add and trigger a double click event", () => {
    let dblClick = false
    ovl.on("double click", () => {
      dblClick = true
    })

    ovl.trigger("double click")
    chai.expect(dblClick).to.be.true
  })

  it("ONE: should remove the click event before it is triggered", () => {
    let click = false
    ovl.on("click", () => {
      click = true
    })

    ovl.off("click")
    ovl.trigger("click")
    chai.expect(click).to.be.false
  })

  it("ONE: should remove the click event but not the double click event", () => {
    let click = false
    let dblClick = false
    ovl.on("click", () => {
      click = true
    })
    ovl.on("double click", () => {
      dblClick = true
    })

    ovl.off("click")
    ovl.trigger("click")
    ovl.trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.true
  })

  it("ONE: should remove all events", () => {
    let click = false
    let dblClick = false
    ovl.on("click", () => {
      click = true
    })
    ovl.on("double click", () => {
      dblClick = true
    })

    ovl.off("all")
    ovl.trigger("click")
    ovl.trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.false
  })

  it("ONE: should add a click event that only triggers once", () => {
    let click = 1
    ovl.one("click", () => {
      click += 1
    })

    ovl.trigger("click")
    ovl.trigger("click")
    chai.expect(click).to.equal(2)
  })

})
