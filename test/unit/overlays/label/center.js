
describe("Overlays/Label - Center", () => {
  let m, center

  before((done) => {
    m = new gmap({
      delimitedStrings: false,
      onLoad() {
        m.addOverlay("labels", data.map((x) => {
          return {
            position: x.jsonCenter,
            id: x.id,
            text: x.id
          }
        }))

        done()
      }
    })
  })

  it("should return the center point of all the labels", () => {
    center = m.labels().getCenter()
    chai.expect(center).to.be.an.instanceof(google.maps.LatLng)
  })

  it("should return the center point of all the labels as a json string", () => {
    m.settings.delimitedStrings = false
    m.labels().getCenterString()
  })

  it("should return the center point of all the labels as a delimited string", () => {
    m.settings.delimitedStrings = true
    m.labels().getCenterString()
  })

  it("should return a single label's center point", () => {
    center = m.labels().findById(1).getCenter()
    chai.expect(center).to.be.an.instanceof(google.maps.LatLng)
  })

  it("should return a single label's center point as a json string", () => {
    m.settings.delimitedStrings = false
    m.labels().findById(1).getCenterString()
  })

  it("should return a single label's center point as a delimited string", () => {
    m.settings.delimitedStrings = true
    m.labels().findById(1).getCenterString()
  })

})
