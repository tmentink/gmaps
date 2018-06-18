
describe("Overlays/Polygon - Remove", () => {
  let m

  before((done) => {
    m = new gmap({
      delimitedStrings: false,
      onLoad() {
        m.addOverlay("polygons", data.map((x) => {
          return {
            path: x.jsonPath,
            id: x.id
          }
        }))

        done()
      }
    })
  })

  it("should remove a single polygon", () => {
    const polygon = m.polygons().findById(1).remove()
    chai.expect(polygon.id).to.equal("1")
    chai.expect(m.polygons().findById(1)).to.be.undefined
  })

  it("should shift a single polygon", () => {
    const polygons = m.polygons().shift()
    chai.expect(polygons.data).to.have.lengthOf(1)
    chai.expect(m.polygons().findById(2)).to.be.undefined
  })

  it("should shift two polygons", () => {
    const polygons = m.polygons().shift(2)
    chai.expect(polygons.data).to.have.lengthOf(2)
    chai.expect(m.polygons().findById(3)).to.be.undefined
    chai.expect(m.polygons().findById(4)).to.be.undefined
  })

  it("should pop a single polygon", () => {
    const polygons = m.polygons().pop()
    chai.expect(polygons.data).to.have.lengthOf(1)
    chai.expect(m.polygons().findById(58)).to.be.undefined
  })

  it("should pop two polygons", () => {
    const polygons = m.polygons().pop(2)
    chai.expect(polygons.data).to.have.lengthOf(2)
    chai.expect(m.polygons().findById(57)).to.be.undefined
    chai.expect(m.polygons().findById(56)).to.be.undefined
  })

  it("should search and remove polygons 10 and 11", () => {
    const polygons = m.polygons([10,11]).remove()
    chai.expect(polygons.data).to.have.lengthOf(2)
    chai.expect(m.polygons().findById(10)).to.be.undefined
    chai.expect(m.polygons().findById(11)).to.be.undefined
  })

  it("should remove all remaining polygons", () => {
    const polygons = m.polygons().remove()
    chai.expect(polygons.data).to.have.lengthOf(49)
    chai.expect(m.polygons().data).to.have.lengthOf(0)
  })

})
