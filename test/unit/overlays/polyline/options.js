
describe("Overlays/Polyline - Options", () => {
  let m, visible = false

  before((done) => {
    m = new gmap({
      delimitedStrings: true,
      onLoad() {
        m.addOverlay("polylines", data.map((x) => {
          return {
            path: x.delimitedPath,
            id: x.id,
            visible: visible
          }
        }))

        done()
      }
    })
  })

  it("should return all polylines' options", () => {
    const options = m.polylines().getOptions()
    chai.expect(options[1]).to.be.an("object").that.has.property("visible", visible)
  })

  it("should return all polylines' visible option", () => {
    const options = m.polylines().getOptions("visible")
    chai.expect(options[1]).to.equal(visible)
  })

  it("should return a single polyline's options", () => {
    const options = m.polylines().findById(1).getOptions()
    chai.expect(options).to.be.an("object").that.has.property("visible", visible)
  })

  it("should return a single polyline's visible option", () => {
    const options = m.polylines().findById(1).getOptions("visible")
    chai.expect(options).to.equal(visible)
  })

  it("should set all the polylines' visible option", () => {
    m.polylines().setOptions("visible", true)
    const options = m.polylines().getOptions("visible")
    chai.expect(options[1]).to.be.true
  })

  it("should set a single polyline's visible option", () => {
    m.polylines().findById(1).setOptions("visible", false)
    const options = m.polylines().findById(1).getOptions("visible")
    chai.expect(options).to.be.false
  })

  it("should set all polylines' visible and clickable option", () => {
    m.polylines().setOptions({
      visible: false,
      clickable: false
    })
    const options = m.polylines().findById(1).getOptions()
    chai.expect(options).to.be.an("object").that.has.property("visible", false)
    chai.expect(options).to.be.an("object").that.has.property("clickable", false)
  })

  it("should set a single polyline's visible and clickable option", () => {
    m.polylines().findById(1).setOptions({
      visible: false,
      clickable: false
    })
    const options = m.polylines().findById(1).getOptions()
    chai.expect(options).to.be.an("object").that.has.property("visible", false)
    chai.expect(options).to.be.an("object").that.has.property("clickable", false)
  })

})
