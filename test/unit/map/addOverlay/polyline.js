
describe("Map - Add Polyline", () => {
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

  it("should create a polyline with default settings", () => {
    const defaults = gmap.settings.polylineOptions
    const oa = m.addOverlay("polyline", {
      path: path
    })

    chai.expect(oa.data[0].init.options.clickable).to.equal(defaults.clickable)
  })

  it("should create a polyline with custom settings", () => {
    const oa = m.addOverlay("polyline", {
      clickable: false,
      id: 1,
      path: path
    })

    chai.expect(oa.data[0].init.options.clickable).to.equal(false)
  })

  it("should not create a polyline with the same id", () => {
    const oa = m.addOverlay("polyline", {
      id: 1,
      path: path
    })

    chai.expect(oa.data).to.have.lengthOf(0)
  })

  it("should create multiple polylines with json strings", () => {
    m.settings.delimitedStrings = false

    const oa = m.addOverlay("polylines", data.map((x) => {
      return {
        path: JSON.stringify(path)
      }
    }))

    chai.expect(oa.data).to.have.lengthOf(58)
  })

  it("should create multiple polylines with delimited strings", () => {
    m.settings.delimitedStrings = true

    const oa = m.addOverlay("polylines", data.map((x) => {
      return {
        path: x.delimitedPath
      }
    }))

    chai.expect(oa.data).to.have.lengthOf(58)
  })

})
