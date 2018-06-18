
describe("Overlays/Polygon - Options", () => {
  let m, visible = false

  before((done) => {
    m = new gmap({
      delimitedStrings: false,
      onLoad() {
        m.addOverlay("polygons", data.map((x) => {
          return {
            path: x.jsonPath,
            id: x.id,
            visible: visible
          }
        }))

        done()
      }
    })
  })

  it("should return all polygons' options", () => {
    const options = m.polygons().getOptions()
    chai.expect(options[1]).to.be.an("object").that.has.property("visible", visible)
  })

  it("should return all polygons' visible option", () => {
    const options = m.polygons().getOptions("visible")
    chai.expect(options[1]).to.equal(visible)
  })

  it("should return a single polygon's options", () => {
    const options = m.polygons().findById(1).getOptions()
    chai.expect(options).to.be.an("object").that.has.property("visible", visible)
  })

  it("should return a single polygon's visible option", () => {
    const options = m.polygons().findById(1).getOptions("visible")
    chai.expect(options).to.equal(visible)
  })

  it("should set all the polygons' visible option", () => {
    m.polygons().setOptions("visible", true)
    const options = m.polygons().getOptions("visible")
    chai.expect(options[1]).to.be.true
  })

  it("should set a single polygon's visible option", () => {
    m.polygons().findById(1).setOptions("visible", false)
    const options = m.polygons().findById(1).getOptions("visible")
    chai.expect(options).to.be.false
  })

  it("should set all polygons' visible and clickable option", () => {
    m.polygons().setOptions({
      visible: false,
      clickable: false
    })
    const options = m.polygons().findById(1).getOptions()
    chai.expect(options).to.be.an("object").that.has.property("visible", false)
    chai.expect(options).to.be.an("object").that.has.property("clickable", false)
  })

  it("should set a single polygon's visible and clickable option", () => {
    m.polygons().findById(1).setOptions({
      visible: false,
      clickable: false
    })
    const options = m.polygons().findById(1).getOptions()
    chai.expect(options).to.be.an("object").that.has.property("visible", false)
    chai.expect(options).to.be.an("object").that.has.property("clickable", false)
  })

})
