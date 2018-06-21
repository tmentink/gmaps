
describe("Map - Add Circle", () => {
  let m
  const center = {
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

  it("should create a circle with default settings", () => {
    const defaults = gmap.settings.circleOptions
    const oa = m.addOverlay("circle", {
      center: center,
      radius: 5
    })

    chai.expect(oa.data[0].init.options.clickable).to.equal(defaults.clickable)
  })

  it("should create a circle with custom settings", () => {
    const oa = m.addOverlay("circle", {
      center: center,
      clickable: false,
      id: 1,
      radius: 5
    })

    chai.expect(oa.data[0].init.options.clickable).to.be.false
  })

  it("should not create a circle with the same id", () => {
    const oa = m.addOverlay("circle", {
      center: center,
      id: 1,
      radius: 5
    })

    chai.expect(oa.data).to.have.lengthOf(0)
  })

  it("should create multiple circles with json strings", () => {
    m.settings.delimitedStrings = false

    const oa = m.addOverlay("circles", data.map((x) => {
      return {
        center: x.jsonCenter,
        radius: 10
      }
    }))

    chai.expect(oa.data).to.have.lengthOf(58)
  })

  it("should create multiple circles with delimited strings", () => {
    m.settings.delimitedStrings = true

    const oa = m.addOverlay("circles", data.map((x) => {
      return {
        center: x.delimitedCenter,
        radius: 10
      }
    }))

    chai.expect(oa.data).to.have.lengthOf(58)
  })

})
