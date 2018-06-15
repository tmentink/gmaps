
describe("Map - Options", () => {
  let m, mapTypeId = "roadmap"

  before((done) => {
    m = new gmap({
      mapOptions: {
        mapTypeId: mapTypeId
      },
      onLoad() {
        done()
      }
    })
  })

  it("should return all the map's options", () => {
    chai.expect(m.getOptions()).to.be.an("object").that.has.property("mapTypeId", mapTypeId)
  })

  it("should return the value of the specified option", () => {
    chai.expect(m.getOptions("mapTypeID")).to.equal(mapTypeId)
  })

  it("should set the specified option", () => {
    mapTypeId = "satellite"
    m.setOptions("mapTypeId", mapTypeId)
    chai.expect(m.getOptions("mapTypeID")).to.equal(mapTypeId)
  })

  it("should set several map options based on the supplied object", () => {
    m.setOptions({
      mapTypeId: "roadmap",
      zoom: 10
    })
    const options = m.getOptions()
    chai.expect(options).to.be.an("object").that.has.property("mapTypeId", "roadmap")
    chai.expect(options).to.be.an("object").that.has.property("zoom", 10)
  })

})
