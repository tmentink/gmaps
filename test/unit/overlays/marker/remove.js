
describe("Overlays/Marker - Remove", () => {
  let m

  before((done) => {
    m = new gmap({
      delimitedStrings: false,
      onLoad() {
        m.addOverlay("markers", data.map((x) => {
          return {
            position: x.jsonCenter,
            id: x.id
          }
        }))

        done()
      }
    })
  })

  it("should remove a single marker", () => {
    const marker = m.markers().findById(1).remove()
    chai.expect(marker.id).to.equal("1")
    chai.expect(m.markers().findById(1)).to.be.undefined
  })

  it("should shift a single marker", () => {
    const markers = m.markers().shift()
    chai.expect(markers.data).to.have.lengthOf(1)
    chai.expect(m.markers().findById(2)).to.be.undefined
  })

  it("should shift two markers", () => {
    const markers = m.markers().shift(2)
    chai.expect(markers.data).to.have.lengthOf(2)
    chai.expect(m.markers().findById(3)).to.be.undefined
    chai.expect(m.markers().findById(4)).to.be.undefined
  })

  it("should pop a single marker", () => {
    const markers = m.markers().pop()
    chai.expect(markers.data).to.have.lengthOf(1)
    chai.expect(m.markers().findById(58)).to.be.undefined
  })

  it("should pop two markers", () => {
    const markers = m.markers().pop(2)
    chai.expect(markers.data).to.have.lengthOf(2)
    chai.expect(m.markers().findById(57)).to.be.undefined
    chai.expect(m.markers().findById(56)).to.be.undefined
  })

  it("should search and remove markers 10 and 11", () => {
    const markers = m.markers([10,11]).remove()
    chai.expect(markers.data).to.have.lengthOf(2)
    chai.expect(m.markers().findById(10)).to.be.undefined
    chai.expect(m.markers().findById(11)).to.be.undefined
  })

  it("should remove all remaining markers", () => {
    const markers = m.markers().remove()
    chai.expect(markers.data).to.have.lengthOf(49)
    chai.expect(m.markers().data).to.have.lengthOf(0)
  })

})
