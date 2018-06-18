
describe("Overlays/Rectangle - Reset", () => {
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

  it("should change all rectangles' visibility after initialization", () => {
    m.rectangles().setOptions("visible", false)
    chai.expect(m.rectangles(1).getOptions("visible")).to.be.false
  })

  it("should reset all the rectangles' visibility", () => {
    m.rectangles().reset()
    chai.expect(m.rectangles(1).getOptions("visible")).to.be.true
  })

  it("should change a single rectangle's visibility", () => {
    m.rectangles(1).setOptions("visible", false)
    chai.expect(m.rectangles(1).getOptions("visible")).to.be.false
  })

  it("should reset a single rectangle's visibility", () => {
    m.rectangles().findById(1).reset()
    chai.expect(m.rectangles(1).getOptions("visible")).to.be.true
  })

})
