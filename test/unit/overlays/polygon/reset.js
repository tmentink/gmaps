
describe("Overlays/Polygon - Reset", () => {
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

  it("should change all polygons' visibility after initialization", () => {
    m.polygons().setOptions("visible", false)
    chai.expect(m.polygons(1).getOptions("visible")).to.be.false
  })

  it("should reset all the polygons' visibility", () => {
    m.polygons().reset()
    chai.expect(m.polygons(1).getOptions("visible")).to.be.true
  })

  it("should change a single polygon's visibility", () => {
    m.polygons(1).setOptions("visible", false)
    chai.expect(m.polygons(1).getOptions("visible")).to.be.false
  })

  it("should reset a single polygon's visibility", () => {
    m.polygons().findById(1).reset()
    chai.expect(m.polygons(1).getOptions("visible")).to.be.true
  })

})
