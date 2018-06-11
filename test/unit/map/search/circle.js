
describe("Map - Search Circles", () => {
  var m = new gmap()
  var oa
  
  it("should find all circles", () => {
    oa = m.addOverlay("circles", data.map((x) => {
      return {
        center: x.jsonCenter,
        id: x.id,
        radius: 2000
      }
    }))
    var search = m.circles()

    chai.expect(search.data.length).to.equal(oa.data.length)
  })

  it("should find one circle", () => {
    var search = m.circles("1")
    chai.expect(search.data.length).to.equal(1)
  })

  it("should find three circles", () => {
    var search = m.circles([1,2,3])
    chai.expect(search.data.length).to.equal(3)
  })

  it("should not find any circles", () => {
    var search = m.circles("doesNotExist")
    chai.expect(search.data.length).to.equal(0)
  })

  it("should find a circle by Id", () => {
    var search = m.circles().findById(1)
    chai.expect(search.id).to.equal("1")
  })

  it("should find other circles from overlay array", () => {
    var search = m.circles([1,2,3]).others()
    chai.expect(search.data.length).to.equal(oa.data.length - 3)
  })

  it("should find other circles from overlay", () => {
    var search = m.circles().findById(1).others()
    chai.expect(search.data.length).to.equal(oa.data.length - 1)
  })

})
