
describe("Map - Center", () => {
  let m, latLng, str
  const literal = {
    lat: 37.5,
    lng: -120
  }

  before((done) => {
    m = new gmap({
      delimitedStrings: false,
      mapOptions: {
        center: literal
      },
      onLoad() {
        done()
      }
    })
  })

  it("should return the map's center", () => {
    chai.expect(m.getCenter().toJSON()).to.deep.equal(literal)
  })

  it("should return the map's center formatted as a json string", () => {
    chai.expect(m.getCenterString()).to.equal(JSON.stringify(literal))
  })

  it("should return the map's center formatted as a delimited string", () => {
    m.settings.delimitedStrings = true
    chai.expect(m.getCenterString()).to.equal("37.5,-120")
  })

  it("should set the map's center from a LatLng", () => {
    latLng = new google.maps.LatLng(43, 43)
    m.setCenter(latLng)
    chai.expect(m.getCenter().toJSON()).to.deep.equal(latLng.toJSON())
  })

  it("should set the map's center from a LatLngLiteral", () => {
    latLng = new google.maps.LatLng(literal)
    m.setCenter(literal)
    chai.expect(m.getCenter().toJSON()).to.deep.equal(literal)
  })

  it("should set the map's center from a json string", () => {
    m.settings.delimitedStrings = false
    str = JSON.stringify(literal)
    m.setCenter(str)
    chai.expect(m.getCenterString()).to.equal(str)
  })

  it("should set the map's center from a delimited string", () => {
    m.settings.delimitedStrings = true
    str = "43,43"
    m.setCenter(str)
    chai.expect(m.getCenterString()).to.equal(str)
  })

})
