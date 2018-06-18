
describe("Overlays/Polyline - Reset", () => {
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

  it("should change all polylines' visibility after initialization", () => {
    m.polylines().setOptions("visible", false)
    chai.expect(m.polylines(1).getOptions("visible")).to.be.false
  })

  it("should reset all the polylines' visibility", () => {
    m.polylines().reset()
    chai.expect(m.polylines(1).getOptions("visible")).to.be.true
  })

  it("should change a single polyline's visibility", () => {
    m.polylines(1).setOptions("visible", false)
    chai.expect(m.polylines(1).getOptions("visible")).to.be.false
  })

  it("should reset a single polyline's visibility", () => {
    m.polylines().findById(1).reset()
    chai.expect(m.polylines(1).getOptions("visible")).to.be.true
  })

})
