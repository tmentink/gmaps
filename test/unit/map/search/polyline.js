
describe("Map - Search Polylines", () => {
  let m, oa, search

  before((done) => {
    m = new gmap({
      delimitedStrings: true,
      onLoad() {
        done()
      }
    })
  })
  
  it("should find all polylines", () => {
    oa = m.addOverlay("polylines", data.map((x) => {
      return {
        id: x.id,
        path: x.delimitedPath
      }
    }))
    search = m.polylines()
    chai.expect(search.data.length).to.equal(oa.data.length)
  })

  it("should find one polyline", () => {
    search = m.polylines("1")
    chai.expect(search.data.length).to.equal(1)
  })

  it("should find three polylines", () => {
    search = m.polylines([1,2,3])
    chai.expect(search.data.length).to.equal(3)
  })

  it("should not find any polylines", () => {
    search = m.polylines("doesNotExist")
    chai.expect(search.data.length).to.equal(0)
  })

  it("should find a polyline by Id", () => {
    search = m.polylines().findById(1)
    chai.expect(search.id).to.equal("1")
  })

  it("should find other polylines from overlay array", () => {
    search = m.polylines([1,2,3]).others()
    chai.expect(search.data.length).to.equal(oa.data.length - 3)
  })

  it("should find other polylines from overlay", () => {
    search = m.polylines().findById(1).others()
    chai.expect(search.data.length).to.equal(oa.data.length - 1)
  })

})
