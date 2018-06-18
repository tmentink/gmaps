
describe("Overlays/Label - Reset", () => {
  let m

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

  it("should change all labels' visibility after initialization", () => {
    m.labels().setOptions("visible", false)
    chai.expect(m.labels(1).getOptions("visible")).to.be.false
  })

  it("should reset all the labels' visibility", () => {
    m.labels().reset()
    chai.expect(m.labels(1).getOptions("visible")).to.be.true
  })

  it("should change a single label's visibility", () => {
    m.labels(1).setOptions("visible", false)
    chai.expect(m.labels(1).getOptions("visible")).to.be.false
  })

  it("should reset a single label's visibility", () => {
    m.labels().findById(1).reset()
    chai.expect(m.labels(1).getOptions("visible")).to.be.true
  })

})
