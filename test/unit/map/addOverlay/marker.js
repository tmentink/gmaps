
describe("Map - Add Marker", () => {
  let m
  const position = {
    lat: 39.59190,
    lng: -122.40150
  }

  before((done) => {
    m = new gmap({
      onLoad() {
        done()
      }
    })
  })

  it("should create a marker with default settings", () => {
    const defaults = gmap.settings.markerOptions
    const oa = m.addOverlay("marker", {
      position: position
    })

    chai.expect(oa.data[0].init.options.clickable).to.equal(defaults.clickable)
  })

  it("should create a marker with custom settings", () => {
    const oa = m.addOverlay("marker", {
      clickable: false,
      id: 1,
      position: position
    })

    chai.expect(oa.data[0].init.options.clickable).to.equal(false)
  })

  it("should not create a marker with the same id", () => {
    const oa = m.addOverlay("marker", {
      id: 1,
      position: position
    })

    chai.expect(oa.data).to.have.lengthOf(0)
  })

  it("should create multiple markers with json strings", () => {
    m.settings.delimitedStrings = false

    const oa = m.addOverlay("markers", data.map((x) => {
      return {
        position: x.jsonCenter
      }
    }))

    chai.expect(oa.data).to.have.lengthOf(58)
  })

  it("should create multiple markers with delimited strings", () => {
    m.settings.delimitedStrings = true

    const oa = m.addOverlay("markers", data.map((x) => {
      return {
        position: x.delimitedCenter
      }
    }))

    chai.expect(oa.data).to.have.lengthOf(58)
  })

})
