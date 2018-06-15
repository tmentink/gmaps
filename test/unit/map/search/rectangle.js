
describe("Map - Search Rectangles", () => {
  let m, oa, search

  before((done) => {
    m = new gmap({
      onLoad() {
        done()
      }
    })
  })
  
  it("should find all rectangles", () => {
    oa = m.addOverlay("rectangles", data.map((x) => {
      return {
        bounds: x.jsonBounds,
        id: x.id
      }
    }))
    search = m.rectangles()
    chai.expect(search.data.length).to.equal(oa.data.length)
  })

  it("should find one rectangle", () => {
    search = m.rectangles("1")
    chai.expect(search.data.length).to.equal(1)
  })

  it("should find three rectangles", () => {
    search = m.rectangles([1,2,3])
    chai.expect(search.data.length).to.equal(3)
  })

  it("should not find any rectangles", () => {
    search = m.rectangles("doesNotExist")
    chai.expect(search.data.length).to.equal(0)
  })

  it("should find a rectangle by Id", () => {
    search = m.rectangles().findById(1)
    chai.expect(search.id).to.equal("1")
  })

  it("should find other rectangles from overlay array", () => {
    search = m.rectangles([1,2,3]).others()
    chai.expect(search.data.length).to.equal(oa.data.length - 3)
  })

  it("should find other rectangles from overlay", () => {
    search = m.rectangles().findById(1).others()
    chai.expect(search.data.length).to.equal(oa.data.length - 1)
  })

})
