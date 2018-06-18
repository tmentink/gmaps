
describe("Overlays/Polyline - Remove", () => {
  let m

  before((done) => {
    m = new gmap({
      delimitedStrings: true,
      onLoad() {
        m.addOverlay("polylines", data.map((x) => {
          return {
            path: x.delimitedPath,
            id: x.id
          }
        }))

        done()
      }
    })
  })

  it("should remove a single polyline", () => {
    const polyline = m.polylines().findById(1).remove()
    chai.expect(polyline.id).to.equal("1")
    chai.expect(m.polylines().findById(1)).to.be.undefined
  })

  it("should shift a single polyline", () => {
    const polylines = m.polylines().shift()
    chai.expect(polylines.data).to.have.lengthOf(1)
    chai.expect(m.polylines().findById(2)).to.be.undefined
  })

  it("should shift two polylines", () => {
    const polylines = m.polylines().shift(2)
    chai.expect(polylines.data).to.have.lengthOf(2)
    chai.expect(m.polylines().findById(3)).to.be.undefined
    chai.expect(m.polylines().findById(4)).to.be.undefined
  })

  it("should pop a single polyline", () => {
    const polylines = m.polylines().pop()
    chai.expect(polylines.data).to.have.lengthOf(1)
    chai.expect(m.polylines().findById(58)).to.be.undefined
  })

  it("should pop two polylines", () => {
    const polylines = m.polylines().pop(2)
    chai.expect(polylines.data).to.have.lengthOf(2)
    chai.expect(m.polylines().findById(57)).to.be.undefined
    chai.expect(m.polylines().findById(56)).to.be.undefined
  })

  it("should search and remove polylines 10 and 11", () => {
    const polylines = m.polylines([10,11]).remove()
    chai.expect(polylines.data).to.have.lengthOf(2)
    chai.expect(m.polylines().findById(10)).to.be.undefined
    chai.expect(m.polylines().findById(11)).to.be.undefined
  })

  it("should remove all remaining polylines", () => {
    const polylines = m.polylines().remove()
    chai.expect(polylines.data).to.have.lengthOf(49)
    chai.expect(m.polylines().data).to.have.lengthOf(0)
  })

})
