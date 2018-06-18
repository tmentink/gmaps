
describe("Overlays/Rectangle - Bounds", () => {
  let m, bounds

  before((done) => {
    m = new gmap({
      delimitedStrings: false,
      onLoad() {
        m.addOverlay("rectangles", data.map((x) => {
          return {
            bounds: x.jsonBounds,
            id: x.id
          }
        }))

        done()
      }
    })
  })

  it("should return all the rectangles' bounds", () => {
    bounds = m.rectangles().getBounds()
    chai.expect(bounds).to.be.an.instanceof(google.maps.LatLngBounds)
  })

  it("should zoom to all rectangles", () => {
    const mapBounds = m.rectangles().zoom().getBounds()
    chai.expect(JSON.stringify(mapBounds)).to.equal(JSON.stringify(bounds))
  })

  it("should return a single rectangle's bounds", () => {
    bounds = m.rectangles().findById(1).getBounds()
    chai.expect(bounds).to.be.an.instanceof(google.maps.LatLngBounds)
  })

  it("should zoom to a single rectangle", () => {
    const mapBounds = m.rectangles().findById(1).zoom().getBounds()
    chai.expect(JSON.stringify(mapBounds)).to.equal(JSON.stringify(bounds))
  })

})
