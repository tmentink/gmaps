
describe("Map - Search Markers", () => {
  let m, oa, search

  before((done) => {
    m = new gmap({
      onLoad() {
        done()
      }
    })
  })
  
  it("should find all markers", () => {
    oa = m.addOverlay("markers", data.map((x) => {
      return {
        id: x.id,
        position: x.jsonCenter
      }
    }))
    search = m.markers()
    chai.expect(search.data.length).to.equal(oa.data.length)
  })

  it("should find one marker", () => {
    search = m.markers("1")
    chai.expect(search.data.length).to.equal(1)
  })

  it("should find three markers", () => {
    search = m.markers([1,2,3])
    chai.expect(search.data.length).to.equal(3)
  })

  it("should not find any markers", () => {
    search = m.markers("doesNotExist")
    chai.expect(search.data.length).to.equal(0)
  })

  it("should find a marker by Id", () => {
    search = m.markers().findById(1)
    chai.expect(search.id).to.equal("1")
  })

  it("should find other markers from overlay array", () => {
    search = m.markers([1,2,3]).others()
    chai.expect(search.data.length).to.equal(oa.data.length - 3)
  })

  it("should find other markers from overlay", () => {
    search = m.markers().findById(1).others()
    chai.expect(search.data.length).to.equal(oa.data.length - 1)
  })

})
