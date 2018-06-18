
describe("Overlays/Rectangle - Display", () => {
  let m, display

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

  it("should hide all the rectangles", () => {
    m.rectangles().hide()
    display = m.rectangles(1).getOptions("visible")
    chai.expect(display).to.be.false
  })

  it("should show all the rectangles", () => {
    m.rectangles().show()
    display = m.rectangles(1).getOptions("visible")
    chai.expect(display).to.be.true
  })

  it("should toggle all the rectangles", () => {
    m.rectangles().toggle()
    display = m.rectangles(1).getOptions("visible")
    chai.expect(display).to.be.false
  })

  it("should hide a single rectangle", () => {
    m.rectangles().findById(1).hide()
    display = m.rectangles(1).getOptions("visible")
    chai.expect(display).to.be.false
  })

  it("should show a single rectangle", () => {
    m.rectangles().findById(1).show()
    display = m.rectangles(1).getOptions("visible")
    chai.expect(display).to.be.true
  })

  it("should toggle a single rectangle", () => {
    m.rectangles().findById(1).toggle()
    display = m.rectangles(1).getOptions("visible")
    chai.expect(display).to.be.false
  })

})
