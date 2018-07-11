
describe("Overlays/Polygon - Bounds", () => {
  let m, bounds

  before((done) => {
    m = new gmap({
      delimitedStrings: false,
      onLoad() {
        m.addOverlay("polygons", data.map((x) => {
          return {
            path: x.jsonPath,
            id: x.id
          }
        }))

        done()
      }
    })
  })

  it("should return all the polygons' bounds", () => {
    bounds = m.polygons().getBounds()
    chai.expect(bounds).to.be.an.instanceof(google.maps.LatLngBounds)
  })

  it("should center to all polygons", () => {
    const center = m.polygons().getCenter()
    m.polygons().center()
    chai.expect(JSON.stringify(center)).to.equal(JSON.stringify(m.getCenter()))
  })

  it("should zoom to all polygons", () => {
    const mapBounds = m.polygons().zoom().getBounds()
    chai.expect(JSON.stringify(mapBounds)).to.equal(JSON.stringify(bounds))
  })

  it("should return a single polygon's bounds", () => {
    bounds = m.polygons().findById(1).getBounds()
    chai.expect(bounds).to.be.an.instanceof(google.maps.LatLngBounds)
  })

  it("should zoom to a single polygon", () => {
    const mapBounds = m.polygons().findById(1).zoom().getBounds()
    chai.expect(JSON.stringify(mapBounds)).to.equal(JSON.stringify(bounds))
  })

})
