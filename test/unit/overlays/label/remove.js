
describe("Overlays/Label - Remove", () => {
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

  it("should remove a single label", () => {
    const label = m.labels().findById(1).remove()
    chai.expect(label.id).to.equal("1")
    chai.expect(m.labels().findById(1)).to.be.undefined
  })

  it("should shift a single label", () => {
    const labels = m.labels().shift()
    chai.expect(labels.data).to.have.lengthOf(1)
    chai.expect(m.labels().findById(2)).to.be.undefined
  })

  it("should shift two labels", () => {
    const labels = m.labels().shift(2)
    chai.expect(labels.data).to.have.lengthOf(2)
    chai.expect(m.labels().findById(3)).to.be.undefined
    chai.expect(m.labels().findById(4)).to.be.undefined
  })

  it("should pop a single label", () => {
    const labels = m.labels().pop()
    chai.expect(labels.data).to.have.lengthOf(1)
    chai.expect(m.labels().findById(58)).to.be.undefined
  })

  it("should pop two labels", () => {
    const labels = m.labels().pop(2)
    chai.expect(labels.data).to.have.lengthOf(2)
    chai.expect(m.labels().findById(57)).to.be.undefined
    chai.expect(m.labels().findById(56)).to.be.undefined
  })

  it("should search and remove labels 10 and 11", () => {
    const labels = m.labels([10,11]).remove()
    chai.expect(labels.data).to.have.lengthOf(2)
    chai.expect(m.labels().findById(10)).to.be.undefined
    chai.expect(m.labels().findById(11)).to.be.undefined
  })

  it("should remove all remaining labels", () => {
    const labels = m.labels().remove()
    chai.expect(labels.data).to.have.lengthOf(49)
    chai.expect(m.labels().data).to.have.lengthOf(0)
  })

})
