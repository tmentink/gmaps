
describe("Overlays/Circle - Remove", () => {
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

  it("should remove a single circle", () => {
    const circle = m.circles().findById(1).remove()
    chai.expect(circle.id).to.equal("1")
    chai.expect(m.circles().findById(1)).to.be.undefined
  })

  it("should shift a single circle", () => {
    const circles = m.circles().shift()
    chai.expect(circles.data).to.have.lengthOf(1)
    chai.expect(m.circles().findById(2)).to.be.undefined
  })

  it("should shift two circles", () => {
    const circles = m.circles().shift(2)
    chai.expect(circles.data).to.have.lengthOf(2)
    chai.expect(m.circles().findById(3)).to.be.undefined
    chai.expect(m.circles().findById(4)).to.be.undefined
  })

  it("should pop a single circle", () => {
    const circles = m.circles().pop()
    chai.expect(circles.data).to.have.lengthOf(1)
    chai.expect(m.circles().findById(58)).to.be.undefined
  })

  it("should pop two circles", () => {
    const circles = m.circles().pop(2)
    chai.expect(circles.data).to.have.lengthOf(2)
    chai.expect(m.circles().findById(57)).to.be.undefined
    chai.expect(m.circles().findById(56)).to.be.undefined
  })

  it("should search and remove circles 10 and 11", () => {
    const circles = m.circles([10,11]).remove()
    chai.expect(circles.data).to.have.lengthOf(2)
    chai.expect(m.circles().findById(10)).to.be.undefined
    chai.expect(m.circles().findById(11)).to.be.undefined
  })

  it("should remove all remaining circles", () => {
    const circles = m.circles().remove()
    chai.expect(circles.data).to.have.lengthOf(49)
    chai.expect(m.circles().data).to.have.lengthOf(0)
  })

})
