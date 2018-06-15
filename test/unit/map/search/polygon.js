
describe("Map - Search Polygons", () => {
  let m, oa, search

  before((done) => {
    m = new gmap({
      onLoad() {
        done()
      }
    })
  })
  
  it("should find all polygons", () => {
    oa = m.addOverlay("polygons", data.map((x) => {
      return {
        id: x.id,
        path: x.jsonPath
      }
    }))
    search = m.polygons()
    chai.expect(search.data.length).to.equal(oa.data.length)
  })

  it("should find one polygon", () => {
    search = m.polygons("1")
    chai.expect(search.data.length).to.equal(1)
  })

  it("should find three polygons", () => {
    search = m.polygons([1,2,3])
    chai.expect(search.data.length).to.equal(3)
  })

  it("should not find any polygons", () => {
    search = m.polygons("doesNotExist")
    chai.expect(search.data.length).to.equal(0)
  })

  it("should find a polygon by Id", () => {
    search = m.polygons().findById(1)
    chai.expect(search.id).to.equal("1")
  })

  it("should find other polygons from overlay array", () => {
    search = m.polygons([1,2,3]).others()
    chai.expect(search.data.length).to.equal(oa.data.length - 3)
  })

  it("should find other polygons from overlay", () => {
    search = m.polygons().findById(1).others()
    chai.expect(search.data.length).to.equal(oa.data.length - 1)
  })

})
