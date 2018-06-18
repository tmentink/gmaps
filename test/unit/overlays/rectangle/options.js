
describe("Overlays/Rectangle - Options", () => {
  let m, visible = false

  before((done) => {
    m = new gmap({
      delimitedStrings: false,
      onLoad() {
        m.addOverlay("rectangles", data.map((x) => {
          return {
            bounds: x.jsonBounds,
            id: x.id,
            visible: visible
          }
        }))

        done()
      }
    })
  })

  it("should return all rectangles' options", () => {
    const options = m.rectangles().getOptions()
    chai.expect(options[1]).to.be.an("object").that.has.property("visible", visible)
  })

  it("should return all rectangles' visible option", () => {
    const options = m.rectangles().getOptions("visible")
    chai.expect(options[1]).to.equal(visible)
  })

  it("should return a single rectangle's options", () => {
    const options = m.rectangles().findById(1).getOptions()
    chai.expect(options).to.be.an("object").that.has.property("visible", visible)
  })

  it("should return a single rectangle's visible option", () => {
    const options = m.rectangles().findById(1).getOptions("visible")
    chai.expect(options).to.equal(visible)
  })

  it("should set all the rectangles' visible option", () => {
    m.rectangles().setOptions("visible", true)
    const options = m.rectangles().getOptions("visible")
    chai.expect(options[1]).to.be.true
  })

  it("should set a single rectangle's visible option", () => {
    m.rectangles().findById(1).setOptions("visible", false)
    const options = m.rectangles().findById(1).getOptions("visible")
    chai.expect(options).to.be.false
  })

  it("should set all rectangles' visible and clickable option", () => {
    m.rectangles().setOptions({
      visible: false,
      clickable: false
    })
    const options = m.rectangles().findById(1).getOptions()
    chai.expect(options).to.be.an("object").that.has.property("visible", false)
    chai.expect(options).to.be.an("object").that.has.property("clickable", false)
  })

  it("should set a single rectangle's visible and clickable option", () => {
    m.rectangles().findById(1).setOptions({
      visible: false,
      clickable: false
    })
    const options = m.rectangles().findById(1).getOptions()
    chai.expect(options).to.be.an("object").that.has.property("visible", false)
    chai.expect(options).to.be.an("object").that.has.property("clickable", false)
  })

})
