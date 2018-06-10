
describe("Search - Polyline", () => {
  var m = new gmap({
    delimitedStrings: true
  })
  var oa
  
  it("should find all polylines", () => {
    oa = m.addOverlay("polylines", data.map((x) => {
      return {
        id: x.id,
        path: x.delimitedPath
      }
    }))
    var search = m.polylines()

    chai.expect(search.data.length).to.equal(oa.data.length)
  })

  it("should find one polyline", () => {
    var search = m.polylines("1")
    chai.expect(search.data.length).to.equal(1)
  })

  it("should find three polylines", () => {
    var search = m.polylines([1,2,3])
    chai.expect(search.data.length).to.equal(3)
  })

  it("should not find any polylines", () => {
    var search = m.polylines("doesNotExist")
    chai.expect(search.data.length).to.equal(0)
  })

  it("should find a polyline by Id", () => {
    var search = m.polylines().findById(1)
    chai.expect(search.id).to.equal("1")
  })

  it("should find other polylines from overlay array", () => {
    var search = m.polylines([1,2,3]).others()
    chai.expect(search.data.length).to.equal(oa.data.length - 3)
  })

  it("should find other polylines from overlay", () => {
    var search = m.polylines().findById(1).others()
    chai.expect(search.data.length).to.equal(oa.data.length - 1)
  })

})
