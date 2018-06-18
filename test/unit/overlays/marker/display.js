
describe("Overlays/Marker - Display", () => {
  let m, display

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

  it("should hide all the markers", () => {
    m.markers().hide()
    display = m.markers(1).getOptions("visible")
    chai.expect(display).to.be.false
  })

  it("should show all the markers", () => {
    m.markers().show()
    display = m.markers(1).getOptions("visible")
    chai.expect(display).to.be.true
  })

  it("should toggle all the markers", () => {
    m.markers().toggle()
    display = m.markers(1).getOptions("visible")
    chai.expect(display).to.be.false
  })

  it("should hide a single marker", () => {
    m.markers().findById(1).hide()
    display = m.markers(1).getOptions("visible")
    chai.expect(display).to.be.false
  })

  it("should show a single marker", () => {
    m.markers().findById(1).show()
    display = m.markers(1).getOptions("visible")
    chai.expect(display).to.be.true
  })

  it("should toggle a single marker", () => {
    m.markers().findById(1).toggle()
    display = m.markers(1).getOptions("visible")
    chai.expect(display).to.be.false
  })

})
