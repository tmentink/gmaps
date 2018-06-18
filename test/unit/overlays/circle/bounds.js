
describe("Overlays/Circle - Bounds", () => {
  let m, bounds

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

  it("should return all the circles' bounds", () => {
    bounds = m.circles().getBounds()
    chai.expect(bounds).to.be.an.instanceof(google.maps.LatLngBounds)
  })

  it("should zoom to all circles", () => {
    const mapBounds = m.circles().zoom().getBounds()
    chai.expect(JSON.stringify(mapBounds)).to.equal(JSON.stringify(bounds))
  })

  it("should return a single circle's bounds", () => {
    bounds = m.circles().findById(1).getBounds()
    chai.expect(bounds).to.be.an.instanceof(google.maps.LatLngBounds)
  })

  it("should zoom to a single circle", () => {
    const mapBounds = m.circles().findById(1).zoom().getBounds()
    chai.expect(JSON.stringify(mapBounds)).to.equal(JSON.stringify(bounds))
  })

})
