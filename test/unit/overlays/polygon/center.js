
describe("Overlays/Polygon - Center", () => {
  let m, center

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

  it("should return the center point of all the polygons", () => {
    center = m.polygons().getCenter()
    chai.expect(center).to.be.an.instanceof(google.maps.LatLng)
  })

  it("should return the center point of all the polygons as a json string", () => {
    m.settings.delimitedStrings = false
    m.polygons().getCenterString()
  })

  it("should return the center point of all the polygons as a delimited string", () => {
    m.settings.delimitedStrings = true
    m.polygons().getCenterString()
  })

  it("should return a single polygon's center point", () => {
    center = m.polygons().findById(1).getCenter()
    chai.expect(center).to.be.an.instanceof(google.maps.LatLng)
  })

  it("should return a single polygon's center point as a json string", () => {
    m.settings.delimitedStrings = false
    m.polygons().findById(1).getCenterString()
  })

  it("should return a single polygon's center point as a delimited string", () => {
    m.settings.delimitedStrings = true
    m.polygons().findById(1).getCenterString()
  })

})
