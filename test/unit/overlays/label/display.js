
describe("Overlays/Label - Display", () => {
  let m, display

  before((done) => {
    m = new gmap({
      delimitedStrings: false,
      onLoad() {
        m.addOverlay("labels", data.map((x) => {
          return {
            position: x.jsonCenter,
            id: x.id,
            text: x.id
          }
        }))

        done()
      }
    })
  })

  it("should hide all the labels", () => {
    m.labels().hide()
    display = m.labels(1).getOptions("visible")
    chai.expect(display).to.be.false
  })

  it("should show all the labels", () => {
    m.labels().show()
    display = m.labels(1).getOptions("visible")
    chai.expect(display).to.be.true
  })

  it("should toggle all the labels", () => {
    m.labels().toggle()
    display = m.labels(1).getOptions("visible")
    chai.expect(display).to.be.false
  })

  it("should hide a single label", () => {
    m.labels().findById(1).hide()
    display = m.labels(1).getOptions("visible")
    chai.expect(display).to.be.false
  })

  it("should show a single label", () => {
    m.labels().findById(1).show()
    display = m.labels(1).getOptions("visible")
    chai.expect(display).to.be.true
  })

  it("should toggle a single label", () => {
    m.labels().findById(1).toggle()
    display = m.labels(1).getOptions("visible")
    chai.expect(display).to.be.false
  })

})
