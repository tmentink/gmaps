
describe("Overlays/Circle - Display", () => {
  let m, display

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

  it("should hide all the circles", () => {
    m.circles().hide()
    display = m.circles(1).getOptions("visible")
    chai.expect(display).to.be.false
  })

  it("should show all the circles", () => {
    m.circles().show()
    display = m.circles(1).getOptions("visible")
    chai.expect(display).to.be.true
  })

  it("should toggle all the circles", () => {
    m.circles().toggle()
    display = m.circles(1).getOptions("visible")
    chai.expect(display).to.be.false
  })

  it("should hide a single circle", () => {
    m.circles().findById(1).hide()
    display = m.circles(1).getOptions("visible")
    chai.expect(display).to.be.false
  })

  it("should show a single circle", () => {
    m.circles().findById(1).show()
    display = m.circles(1).getOptions("visible")
    chai.expect(display).to.be.true
  })

  it("should toggle a single circle", () => {
    m.circles().findById(1).toggle()
    display = m.circles(1).getOptions("visible")
    chai.expect(display).to.be.false
  })

})
