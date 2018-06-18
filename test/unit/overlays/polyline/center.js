
describe("Overlays/Polyline - Center", () => {
  let m, center

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

  it("should return the center point of all the polylines", () => {
    center = m.polylines().getCenter()
    chai.expect(center).to.be.an.instanceof(google.maps.LatLng)
  })

  it("should return the center point of all the polylines as a json string", () => {
    m.settings.delimitedStrings = false
    m.polylines().getCenterString()
  })

  it("should return the center point of all the polylines as a delimited string", () => {
    m.settings.delimitedStrings = true
    m.polylines().getCenterString()
  })

  it("should return a single polyline's center point", () => {
    center = m.polylines().findById(1).getCenter()
    chai.expect(center).to.be.an.instanceof(google.maps.LatLng)
  })

  it("should return a single polyline's center point as a json string", () => {
    m.settings.delimitedStrings = false
    m.polylines().findById(1).getCenterString()
  })

  it("should return a single polyline's center point as a delimited string", () => {
    m.settings.delimitedStrings = true
    m.polylines().findById(1).getCenterString()
  })

})
