
describe("Overlays/Marker - Options", () => {
  let m, visible = false

  before((done) => {
    m = new gmap({
      delimitedStrings: false,
      onLoad() {
        m.addOverlay("markers", data.map((x) => {
          return {
            position: x.jsonCenter,
            id: x.id,
            visible: visible
          }
        }))

        done()
      }
    })
  })

  it("should return all markers' options", () => {
    const options = m.markers().getOptions()
    chai.expect(options[1]).to.be.an("object").that.has.property("visible", visible)
  })

  it("should return all markers' visible option", () => {
    const options = m.markers().getOptions("visible")
    chai.expect(options[1]).to.equal(visible)
  })

  it("should return a single marker's options", () => {
    const options = m.markers().findById(1).getOptions()
    chai.expect(options).to.be.an("object").that.has.property("visible", visible)
  })

  it("should return a single marker's visible option", () => {
    const options = m.markers().findById(1).getOptions("visible")
    chai.expect(options).to.equal(visible)
  })

  it("should set all the markers' visible option", () => {
    m.markers().setOptions("visible", true)
    const options = m.markers().getOptions("visible")
    chai.expect(options[1]).to.be.true
  })

  it("should set a single marker's visible option", () => {
    m.markers().findById(1).setOptions("visible", false)
    const options = m.markers().findById(1).getOptions("visible")
    chai.expect(options).to.be.false
  })

  it("should set all markers' visible and clickable option", () => {
    m.markers().setOptions({
      visible: false,
      clickable: false
    })
    const options = m.markers().findById(1).getOptions()
    chai.expect(options).to.be.an("object").that.has.property("visible", false)
    chai.expect(options).to.be.an("object").that.has.property("clickable", false)
  })

  it("should set a single marker's visible and clickable option", () => {
    m.markers().findById(1).setOptions({
      visible: false,
      clickable: false
    })
    const options = m.markers().findById(1).getOptions()
    chai.expect(options).to.be.an("object").that.has.property("visible", false)
    chai.expect(options).to.be.an("object").that.has.property("clickable", false)
  })

})
