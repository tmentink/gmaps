
describe("Overlays/Polyline - Bounds", () => {
  let m, bounds

  before((done) => {
    m = new gmap({
      delimitedStrings: true,
      onLoad() {
        m.addOverlay("polylines", data.map((x) => {
          return {
            path: x.delimitedPath,
            id: x.id
          }
        }))

        done()
      }
    })
  })

  it("should return all the polylines' bounds", () => {
    bounds = m.polylines().getBounds()
    chai.expect(bounds).to.be.an.instanceof(google.maps.LatLngBounds)
  })

  it("should zoom to all polylines", () => {
    const mapBounds = m.polylines().zoom().getBounds()
    chai.expect(JSON.stringify(mapBounds)).to.equal(JSON.stringify(bounds))
  })

  it("should return a single polyline's bounds", () => {
    bounds = m.polylines().findById(1).getBounds()
    chai.expect(bounds).to.be.an.instanceof(google.maps.LatLngBounds)
  })

  it("should zoom to a single polyline", () => {
    const mapBounds = m.polylines().findById(1).zoom().getBounds()
    chai.expect(JSON.stringify(mapBounds)).to.equal(JSON.stringify(bounds))
  })

})
