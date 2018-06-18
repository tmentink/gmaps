
describe("Overlays/Label - Options", () => {
  let m, visible = false

  before((done) => {
    m = new gmap({
      delimitedStrings: false,
      onLoad() {
        m.addOverlay("labels", data.map((x) => {
          return {
            position: x.jsonCenter,
            id: x.id,
            text: x.id,
            visible: visible
          }
        }))

        done()
      }
    })
  })

  it("should return all labels' options", () => {
    const options = m.labels().getOptions()
    chai.expect(options[1]).to.be.an("object").that.has.property("visible", visible)
  })

  it("should return all labels' visible option", () => {
    const options = m.labels().getOptions("visible")
    chai.expect(options[1]).to.equal(visible)
  })

  it("should return a single label's options", () => {
    const options = m.labels().findById(1).getOptions()
    chai.expect(options).to.be.an("object").that.has.property("visible", visible)
  })

  it("should return a single label's visible option", () => {
    const options = m.labels().findById(1).getOptions("visible")
    chai.expect(options).to.equal(visible)
  })

  it("should set all the labels' visible option", () => {
    m.labels().setOptions("visible", true)
    const options = m.labels().getOptions("visible")
    chai.expect(options[1]).to.be.true
  })

  it("should set a single label's visible option", () => {
    m.labels().findById(1).setOptions("visible", false)
    const options = m.labels().findById(1).getOptions("visible")
    chai.expect(options).to.be.false
  })

  it("should set all labels' visible and align option", () => {
    m.labels().setOptions({
      visible: false,
      align: "left"
    })
    const options = m.labels().findById(1).getOptions()
    chai.expect(options).to.be.an("object").that.has.property("visible", false)
    chai.expect(options).to.be.an("object").that.has.property("align", "left")
  })

  it("should set a single label's visible and clickable option", () => {
    m.labels().findById(1).setOptions({
      visible: false,
      align: "left"
    })
    const options = m.labels().findById(1).getOptions()
    chai.expect(options).to.be.an("object").that.has.property("visible", false)
    chai.expect(options).to.be.an("object").that.has.property("align", "left")
  })

})
