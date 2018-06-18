
describe("Overlays/Circle - Center", () => {
  let m, center

  before((done) => {
    m = new gmap({
      delimitedStrings: false,
      onLoad() {
        m.addOverlay("circles", data.map((x) => {
          return {
            center: x.jsonCenter,
            id: x.id,
            radius: 10000
          }
        }))

        done()
      }
    })
  })

  it("should return the center point of all the circles", () => {
    center = m.circles().getCenter()
    chai.expect(center).to.be.an.instanceof(google.maps.LatLng)
  })

  it("should return the center point of all the circles as a json string", () => {
    m.settings.delimitedStrings = false
    m.circles().getCenterString()
  })

  it("should return the center point of all the circles as a delimited string", () => {
    m.settings.delimitedStrings = true
    m.circles().getCenterString()
  })

  it("should return a single circle's center point", () => {
    center = m.circles().findById(1).getCenter()
    chai.expect(center).to.be.an.instanceof(google.maps.LatLng)
  })

  it("should return a single circle's center point as a json string", () => {
    m.settings.delimitedStrings = false
    m.circles().findById(1).getCenterString()
  })

  it("should return a single circle's center point as a delimited string", () => {
    m.settings.delimitedStrings = true
    m.circles().findById(1).getCenterString()
  })

})
