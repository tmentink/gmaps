
describe("Overlays/Marker - Bounds", () => {
  let m, bounds

  before((done) => {
    m = new gmap({
      delimitedStrings: false,
      onLoad() {
        m.addOverlay("markers", data.map((x) => {
          return {
            position: x.jsonCenter,
            id: x.id
          }
        }))

        done()
      }
    })
  })

  it("should return all the markers' bounds", () => {
    bounds = m.markers().getBounds()
    chai.expect(bounds).to.be.an.instanceof(google.maps.LatLngBounds)
  })

  it("should zoom to all markers", () => {
    const mapBounds = m.markers().zoom().getBounds()
    chai.expect(JSON.stringify(mapBounds)).to.equal(JSON.stringify(bounds))
  })

  it("should return a single marker's bounds", () => {
    bounds = m.markers().findById(1).getBounds()
    chai.expect(bounds).to.be.an.instanceof(google.maps.LatLngBounds)
  })

  it("should zoom to a single marker", () => {
    const mapBounds = m.markers().findById(1).zoom().getBounds()
    chai.expect(JSON.stringify(mapBounds)).to.equal(JSON.stringify(bounds))
  })

})
