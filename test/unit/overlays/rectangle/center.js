
describe("Overlays/Rectangle - Center", () => {
  let m, center

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

  it("should return the center point of all the rectangles", () => {
    center = m.rectangles().getCenter()
    chai.expect(center).to.be.an.instanceof(google.maps.LatLng)
  })

  it("should return the center point of all the rectangles as a json string", () => {
    m.settings.delimitedStrings = false
    m.rectangles().getCenterString()
  })

  it("should return the center point of all the rectangles as a delimited string", () => {
    m.settings.delimitedStrings = true
    m.rectangles().getCenterString()
  })

  it("should return a single rectangle's center point", () => {
    center = m.rectangles().findById(1).getCenter()
    chai.expect(center).to.be.an.instanceof(google.maps.LatLng)
  })

  it("should return a single rectangle's center point as a json string", () => {
    m.settings.delimitedStrings = false
    m.rectangles().findById(1).getCenterString()
  })

  it("should return a single rectangle's center point as a delimited string", () => {
    m.settings.delimitedStrings = true
    m.rectangles().findById(1).getCenterString()
  })

})
