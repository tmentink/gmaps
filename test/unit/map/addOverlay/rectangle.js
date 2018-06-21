
describe("Map - Add Rectangle", () => {
  let m
  const bounds = {
    north: 33.685,
    south: 33.671,
    east: -116.234,
    west: -116.251
  }

  before((done) => {
    m = new gmap({
      onLoad() {
        done()
      }
    })
  })

  it("should create a rectangle with default settings", () => {
    const defaults = gmap.settings.rectangleOptions
    const oa = m.addOverlay("rectangle", {
      bounds: bounds
    })

    chai.expect(oa.data[0].init.options.clickable).to.equal(defaults.clickable)
  })

  it("should create a rectangle with custom settings", () => {
    const oa = m.addOverlay("rectangle", {
      bounds: bounds,
      clickable: false,
      id: 1
    })

    chai.expect(oa.data[0].init.options.clickable).to.equal(false)
  })

  it("should not create a rectangle with the same id", () => {
    const oa = m.addOverlay("rectangle", {
      bounds: bounds,
      id: 1
    })

    chai.expect(oa.data).to.have.lengthOf(0)
  })

  it("should create multiple rectangles with json strings", () => {
    m.settings.delimitedStrings = false

    const oa = m.addOverlay("rectangles", data.map((x) => {
      return {
        bounds: x.jsonBounds
      }
    }))

    chai.expect(oa.data).to.have.lengthOf(58)
  })

})
