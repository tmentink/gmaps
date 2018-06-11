
describe("Map - Search Polygons", () => {
  var m = new gmap()
  var oa
  
  it("should find all polygons", () => {
    oa = m.addOverlay("polygons", data.map((x) => {
      return {
        id: x.id,
        path: x.jsonPath
      }
    }))
    var search = m.polygons()

    chai.expect(search.data.length).to.equal(oa.data.length)
  })

  it("should find one polygon", () => {
    var search = m.polygons("1")
    chai.expect(search.data.length).to.equal(1)
  })

  it("should find three polygons", () => {
    var search = m.polygons([1,2,3])
    chai.expect(search.data.length).to.equal(3)
  })

  it("should not find any polygons", () => {
    var search = m.polygons("doesNotExist")
    chai.expect(search.data.length).to.equal(0)
  })

  it("should find a polygon by Id", () => {
    var search = m.polygons().findById(1)
    chai.expect(search.id).to.equal("1")
  })

  it("should find other polygons from overlay array", () => {
    var search = m.polygons([1,2,3]).others()
    chai.expect(search.data.length).to.equal(oa.data.length - 3)
  })

  it("should find other polygons from overlay", () => {
    var search = m.polygons().findById(1).others()
    chai.expect(search.data.length).to.equal(oa.data.length - 1)
  })

})
