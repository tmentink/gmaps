
describe("Map - Add Polygon", () => {
  let m
  const path = [
    {lat: 25.774, lng: -80.190},
    {lat: 18.466, lng: -66.118},
    {lat: 32.321, lng: -64.757}
  ]

  before((done) => {
    m = new gmap({
      onLoad() {
        done()
      }
    })
  })

  it("should create a polygon with default settings", () => {
    const defaults = gmap.settings.polygonOptions
    const oa = m.addOverlay("polygon", {
      path: path
    })

    chai.expect(oa.data[0].init.options.clickable).to.equal(defaults.clickable)
  })

  it("should create a polygon with custom settings", () => {
    const oa = m.addOverlay("polygon", {
      clickable: false,
      id: 1,
      path: path
    })

    chai.expect(oa.data[0].init.options.clickable).to.equal(false)
  })

  it("should not create a polygon with the same id", () => {
    const oa = m.addOverlay("polygon", {
      id: 1,
      path: path
    })

    chai.expect(oa.data).to.have.lengthOf(0)
  })

  it("should create multiple polygons with json strings", () => {
    m.settings.delimitedStrings = false

    const oa = m.addOverlay("polygons", data.map((x) => {
      return {
        path: x.jsonPath
      }
    }))

    chai.expect(oa.data).to.have.lengthOf(58)
  })

  it("should create multiple polygons with delimited strings", () => {
    m.settings.delimitedStrings = true

    const oa = m.addOverlay("polygons", data.map((x) => {
      return {
        path: x.delimitedPath
      }
    }))

    chai.expect(oa.data).to.have.lengthOf(58)
  })

})
