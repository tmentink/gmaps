
describe("Map - Search Circles", () => {
  let m, oa, search

  before((done) => {
    m = new gmap({
      onLoad() {
        done()
      }
    })
  })
  
  it("should find all circles", () => {
    oa = m.addOverlay("circles", data.map((x) => {
      return {
        center: x.jsonCenter,
        id: x.id,
        radius: 2000
      }
    }))
    search = m.circles()
    chai.expect(search.data.length).to.equal(oa.data.length)
  })

  it("should find one circle", () => {
    search = m.circles("1")
    chai.expect(search.data.length).to.equal(1)
  })

  it("should find three circles", () => {
    search = m.circles([1,2,3])
    chai.expect(search.data.length).to.equal(3)
  })

  it("should not find any circles", () => {
    search = m.circles("doesNotExist")
    chai.expect(search.data.length).to.equal(0)
  })

  it("should find a circle by Id", () => {
    search = m.circles().findById(1)
    chai.expect(search.id).to.equal("1")
  })

  it("should find other circles from overlay array", () => {
    search = m.circles([1,2,3]).others()
    chai.expect(search.data.length).to.equal(oa.data.length - 3)
  })

  it("should find other circles from overlay", () => {
    search = m.circles().findById(1).others()
    chai.expect(search.data.length).to.equal(oa.data.length - 1)
  })

})
