
describe("Overlays/Circle - Reset", () => {
  let m

  before((done) => {
    m = new gmap({
      delimitedStrings: false,
      onLoad() {
        m.addOverlay("circles", data.map((x) => {
          return {
            center: x.jsonCenter,
            id: x.id,
            radius: 10000
          }
        }))

        done()
      }
    })
  })

  it("should change all circles' visibility after initialization", () => {
    m.circles().setOptions("visible", false)
    chai.expect(m.circles(1).getOptions("visible")).to.be.false
  })

  it("should reset all the circles' visibility", () => {
    m.circles().reset()
    chai.expect(m.circles(1).getOptions("visible")).to.be.true
  })

  it("should change a single circle's visibility", () => {
    m.circles(1).setOptions("visible", false)
    chai.expect(m.circles(1).getOptions("visible")).to.be.false
  })

  it("should reset a single circle's visibility", () => {
    m.circles().findById(1).reset()
    chai.expect(m.circles(1).getOptions("visible")).to.be.true
  })

})
