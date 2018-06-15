
describe("Map - Bounds", () => {
  let m, bounds
  const literal = {
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

  it("should return the map's bounds", () => {
    bounds = m.getBounds()
    chai.expect(bounds).to.be.an.instanceof(google.maps.LatLngBounds)
  })

  it("should fit the map's bounds to a LatLngBounds", () => {
    m.fitBounds(bounds)
  })

  it("should fit the map's bounds to a LatLngBoundsLiteral", () => {
    m.fitBounds(literal)
  })

  it("should fit the map's bounds to a BoundsInterface", () => {
    m.fitBounds({
      markers: null,
      polygons: [1,2,3]
    })
  })

  it("should reset the map's bounds", () => {
    m.fitBounds("initial")
  })

})
