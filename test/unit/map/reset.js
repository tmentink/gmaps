
describe("Map - Reset", () => {
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

  it("should change the map's options and bounds after initialization", () => {
    m.setOptions({
      mapTypeId: "satellite",
      zoom: 10
    })
    chai.expect(m.getOptions("mapTypeId")).to.not.equal(mapTypeId)
    chai.expect(JSON.stringify(m.getBounds())).to.not.equal(JSON.stringify(m.init.bounds))
  })

  it("should reset the map's options and bounds", () => {
    m.reset()
    chai.expect(m.getOptions("mapTypeId")).to.equal(mapTypeId)
    chai.expect(JSON.stringify(m.getBounds())).to.equal(JSON.stringify(m.init.bounds))
  })

})
