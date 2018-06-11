
describe("Map - Search Rectangles", () => {
  var m = new gmap()
  var oa
  
  it("should find all rectangles", () => {
    oa = m.addOverlay("rectangles", data.map((x) => {
      return {
        bounds: x.jsonBounds,
        id: x.id
      }
    }))
    var search = m.rectangles()

    chai.expect(search.data.length).to.equal(oa.data.length)
  })

  it("should find one rectangle", () => {
    var search = m.rectangles("1")
    chai.expect(search.data.length).to.equal(1)
  })

  it("should find three rectangles", () => {
    var search = m.rectangles([1,2,3])
    chai.expect(search.data.length).to.equal(3)
  })

  it("should not find any rectangles", () => {
    var search = m.rectangles("doesNotExist")
    chai.expect(search.data.length).to.equal(0)
  })

  it("should find a rectangle by Id", () => {
    var search = m.rectangles().findById(1)
    chai.expect(search.id).to.equal("1")
  })

  it("should find other rectangles from overlay array", () => {
    var search = m.rectangles([1,2,3]).others()
    chai.expect(search.data.length).to.equal(oa.data.length - 3)
  })

  it("should find other rectangles from overlay", () => {
    var search = m.rectangles().findById(1).others()
    chai.expect(search.data.length).to.equal(oa.data.length - 1)
  })

})
