
describe("Overlays/Marker - Reset", () => {
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

  it("should change all markers' visibility after initialization", () => {
    m.markers().setOptions("visible", false)
    chai.expect(m.markers(1).getOptions("visible")).to.be.false
  })

  it("should reset all the markers' visibility", () => {
    m.markers().reset()
    chai.expect(m.markers(1).getOptions("visible")).to.be.true
  })

  it("should change a single marker's visibility", () => {
    m.markers(1).setOptions("visible", false)
    chai.expect(m.markers(1).getOptions("visible")).to.be.false
  })

  it("should reset a single marker's visibility", () => {
    m.markers().findById(1).reset()
    chai.expect(m.markers(1).getOptions("visible")).to.be.true
  })

})
