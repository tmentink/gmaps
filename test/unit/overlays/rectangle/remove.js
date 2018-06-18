
describe("Overlays/Rectangle - Remove", () => {
  let m

  before((done) => {
    m = new gmap({
      delimitedStrings: false,
      onLoad() {
        m.addOverlay("rectangles", data.map((x) => {
          return {
            bounds: x.jsonBounds,
            id: x.id
          }
        }))

        done()
      }
    })
  })

  it("should remove a single rectangle", () => {
    const rectangle = m.rectangles().findById(1).remove()
    chai.expect(rectangle.id).to.equal("1")
    chai.expect(m.rectangles().findById(1)).to.be.undefined
  })

  it("should shift a single rectangle", () => {
    const rectangles = m.rectangles().shift()
    chai.expect(rectangles.data).to.have.lengthOf(1)
    chai.expect(m.rectangles().findById(2)).to.be.undefined
  })

  it("should shift two rectangles", () => {
    const rectangles = m.rectangles().shift(2)
    chai.expect(rectangles.data).to.have.lengthOf(2)
    chai.expect(m.rectangles().findById(3)).to.be.undefined
    chai.expect(m.rectangles().findById(4)).to.be.undefined
  })

  it("should pop a single rectangle", () => {
    const rectangles = m.rectangles().pop()
    chai.expect(rectangles.data).to.have.lengthOf(1)
    chai.expect(m.rectangles().findById(58)).to.be.undefined
  })

  it("should pop two rectangles", () => {
    const rectangles = m.rectangles().pop(2)
    chai.expect(rectangles.data).to.have.lengthOf(2)
    chai.expect(m.rectangles().findById(57)).to.be.undefined
    chai.expect(m.rectangles().findById(56)).to.be.undefined
  })

  it("should search and remove rectangles 10 and 11", () => {
    const rectangles = m.rectangles([10,11]).remove()
    chai.expect(rectangles.data).to.have.lengthOf(2)
    chai.expect(m.rectangles().findById(10)).to.be.undefined
    chai.expect(m.rectangles().findById(11)).to.be.undefined
  })

  it("should remove all remaining rectangles", () => {
    const rectangles = m.rectangles().remove()
    chai.expect(rectangles.data).to.have.lengthOf(49)
    chai.expect(m.rectangles().data).to.have.lengthOf(0)
  })

})
