
describe("Overlays/Polyline - Display", () => {
  let m, display

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

  it("should hide all the polylines", () => {
    m.polylines().hide()
    display = m.polylines(1).getOptions("visible")
    chai.expect(display).to.be.false
  })

  it("should show all the polylines", () => {
    m.polylines().show()
    display = m.polylines(1).getOptions("visible")
    chai.expect(display).to.be.true
  })

  it("should toggle all the polylines", () => {
    m.polylines().toggle()
    display = m.polylines(1).getOptions("visible")
    chai.expect(display).to.be.false
  })

  it("should hide a single polyline", () => {
    m.polylines().findById(1).hide()
    display = m.polylines(1).getOptions("visible")
    chai.expect(display).to.be.false
  })

  it("should show a single polyline", () => {
    m.polylines().findById(1).show()
    display = m.polylines(1).getOptions("visible")
    chai.expect(display).to.be.true
  })

  it("should toggle a single polyline", () => {
    m.polylines().findById(1).toggle()
    display = m.polylines(1).getOptions("visible")
    chai.expect(display).to.be.false
  })

})
