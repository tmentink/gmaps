
describe("Overlays/Marker - Center", () => {
  let m, center

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

  it("should return the center point of all the markers", () => {
    center = m.markers().getCenter()
    chai.expect(center).to.be.an.instanceof(google.maps.LatLng)
  })

  it("should return the center point of all the markers as a json string", () => {
    m.settings.delimitedStrings = false
    m.markers().getCenterString()
  })

  it("should return the center point of all the markers as a delimited string", () => {
    m.settings.delimitedStrings = true
    m.markers().getCenterString()
  })

  it("should return a single marker's center point", () => {
    center = m.markers().findById(1).getCenter()
    chai.expect(center).to.be.an.instanceof(google.maps.LatLng)
  })

  it("should return a single marker's center point as a json string", () => {
    m.settings.delimitedStrings = false
    m.markers().findById(1).getCenterString()
  })

  it("should return a single marker's center point as a delimited string", () => {
    m.settings.delimitedStrings = true
    m.markers().findById(1).getCenterString()
  })

})
