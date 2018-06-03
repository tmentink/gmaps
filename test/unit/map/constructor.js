
describe("Map - Constructor", () => {
  var m = {}

  it("should create a map with default settings", () => {
    m = new gmap()   
    chai.expect(m.settings.urlPrecision).to.equal(gmap.settings.urlPrecision)
  })

  it("should create a map with custom settings", () => {
    m = new gmap({
      urlPrecision: 2
    })
    chai.expect(m.settings.urlPrecision).to.equal(2)
  })

  it("should deep merge settings", (done) => {
    m = new gmap({
      mapOptions: {
        mapTypeId: "satellite",
      },
      onLoad() {
        chai.expect(m.settings.mapOptions.zoom).to.equal(gmap.settings.mapOptions.zoom)
        done()
      }
    })
  })

  it("should not overwrite global settings", () => {
    chai.expect(m.settings.mapOptions.mapTypeId).to.not.equal(gmap.settings.mapOptions.mapTypeId)
  })

  it("should create a map with a json string", (done) => {
    m = new gmap({
      delimitedStrings: false,
      mapOptions: {
        center: '{"lat":37.5,"lng":-120}'
      },
      onLoad() {
        chai.expect(m.init.bounds).to.not.be.undefined
        done()
      }
    })
  })

  it("should create a map with a delimited string", (done) => {
    m = new gmap({
      delimitedStrings: true,
      mapOptions: {
        center: "37.5, -120"
      },
      onLoad() {
        chai.expect(m.init.bounds).to.not.be.undefined
        done()
      }
    })
  })

})
