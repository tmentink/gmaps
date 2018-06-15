
describe("Map - Search Labels", () => {
  let m, oa, search

  before((done) => {
    m = new gmap({
      onLoad() {
        done()
      }
    })
  })
  
  it("should find all labels", () => {
    oa = m.addOverlay("labels", data.map((x) => {
      return {
        id: x.id,
        position: x.jsonCenter,
        text: "test"
      }
    }))
    search = m.labels()
    chai.expect(search.data.length).to.equal(oa.data.length)
  })

  it("should find one label", () => {
    search = m.labels("1")
    chai.expect(search.data.length).to.equal(1)
  })

  it("should find three labels", () => {
    search = m.labels([1,2,3])
    chai.expect(search.data.length).to.equal(3)
  })

  it("should not find any labels", () => {
    search = m.labels("doesNotExist")
    chai.expect(search.data.length).to.equal(0)
  })

  it("should find a label by Id", () => {
    search = m.labels().findById(1)
    chai.expect(search.id).to.equal("1")
  })

  it("should find other labels from overlay array", () => {
    search = m.labels([1,2,3]).others()
    chai.expect(search.data.length).to.equal(oa.data.length - 3)
  })

  it("should find other labels from overlay", () => {
    search = m.labels().findById(1).others()
    chai.expect(search.data.length).to.equal(oa.data.length - 1)
  })

})
