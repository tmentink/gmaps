
describe("Overlays/Polygon - Display", () => {
  let m, display

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

  it("should hide all the polygons", () => {
    m.polygons().hide()
    display = m.polygons(1).getOptions("visible")
    chai.expect(display).to.be.false
  })

  it("should show all the polygons", () => {
    m.polygons().show()
    display = m.polygons(1).getOptions("visible")
    chai.expect(display).to.be.true
  })

  it("should toggle all the polygons", () => {
    m.polygons().toggle()
    display = m.polygons(1).getOptions("visible")
    chai.expect(display).to.be.false
  })

  it("should hide a single polygon", () => {
    m.polygons().findById(1).hide()
    display = m.polygons(1).getOptions("visible")
    chai.expect(display).to.be.false
  })

  it("should show a single polygon", () => {
    m.polygons().findById(1).show()
    display = m.polygons(1).getOptions("visible")
    chai.expect(display).to.be.true
  })

  it("should toggle a single polygon", () => {
    m.polygons().findById(1).toggle()
    display = m.polygons(1).getOptions("visible")
    chai.expect(display).to.be.false
  })

})
