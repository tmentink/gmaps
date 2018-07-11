
describe("Overlays/Label - Bounds", () => {
  let m, bounds

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

  it("should return all the labels' bounds", () => {
    bounds = m.labels().getBounds()
    chai.expect(bounds).to.be.an.instanceof(google.maps.LatLngBounds)
  })

  it("should center to all labels", () => {
    const center = m.labels().getCenter()
    m.labels().center()
    chai.expect(JSON.stringify(center)).to.equal(JSON.stringify(m.getCenter()))
  })

  it("should zoom to all labels", () => {
    const mapBounds = m.labels().zoom().getBounds()
    chai.expect(JSON.stringify(mapBounds)).to.equal(JSON.stringify(bounds))
  })

  it("should return a single label's bounds", () => {
    bounds = m.labels().findById(1).getBounds()
    chai.expect(bounds).to.be.an.instanceof(google.maps.LatLngBounds)
  })

  it("should zoom to a single label", () => {
    const mapBounds = m.labels().findById(1).zoom().getBounds()
    chai.expect(JSON.stringify(mapBounds)).to.equal(JSON.stringify(bounds))
  })

})
