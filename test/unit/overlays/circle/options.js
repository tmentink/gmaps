
describe("Overlays/Circle - Options", () => {
  let m, visible = false

  before((done) => {
    m = new gmap({
      delimitedStrings: false,
      onLoad() {
        m.addOverlay("circles", data.map((x) => {
          return {
            center: x.jsonCenter,
            id: x.id,
            radius: 10000,
            visible: visible
          }
        }))

        done()
      }
    })
  })

  it("should return all circles' options", () => {
    const options = m.circles().getOptions()
    chai.expect(options[1]).to.be.an("object").that.has.property("visible", visible)
  })

  it("should return all circles' visible option", () => {
    const options = m.circles().getOptions("visible")
    chai.expect(options[1]).to.equal(visible)
  })

  it("should return a single circle's options", () => {
    const options = m.circles().findById(1).getOptions()
    chai.expect(options).to.be.an("object").that.has.property("visible", visible)
  })

  it("should return a single circle's visible option", () => {
    const options = m.circles().findById(1).getOptions("visible")
    chai.expect(options).to.equal(visible)
  })

  it("should set all the circles' visible option", () => {
    m.circles().setOptions("visible", true)
    const options = m.circles().getOptions("visible")
    chai.expect(options[1]).to.be.true
  })

  it("should set a single circle's visible option", () => {
    m.circles().findById(1).setOptions("visible", false)
    const options = m.circles().findById(1).getOptions("visible")
    chai.expect(options).to.be.false
  })

  it("should set all circles' visible and clickable option", () => {
    m.circles().setOptions({
      visible: false,
      clickable: false
    })
    const options = m.circles().findById(1).getOptions()
    chai.expect(options).to.be.an("object").that.has.property("visible", false)
    chai.expect(options).to.be.an("object").that.has.property("clickable", false)
  })

  it("should set a single circle's visible and clickable option", () => {
    m.circles().findById(1).setOptions({
      visible: false,
      clickable: false
    })
    const options = m.circles().findById(1).getOptions()
    chai.expect(options).to.be.an("object").that.has.property("visible", false)
    chai.expect(options).to.be.an("object").that.has.property("clickable", false)
  })

})
