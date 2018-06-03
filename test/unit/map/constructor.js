
describe("Map - Constructor", () => {
  var m = {}

  it("should create a map with default settings", () => {
    m = new gmap()   
    chai.expect(m.settings.urlPrecision).to.equal(5)
  })

  it("should create a map with custom settings", () => {
    m = new gmap({
      urlPrecision: 2
    })

    chai.expect(m.settings.urlPrecision).to.equal(2)
  })

  it("should not overwrite global settings", () => {
    chai.expect(gmap.settings.urlPrecision).to.not.equal(m.settings.urlPrecision)
  })

  it("should deep merge settings", (done) => {
    m = new gmap({
      mapOptions: {
        mapTypeId: "satellite",
      },
      onLoad() {
        chai.expect(m.settings.mapOptions.zoom).to.equal(6)
        done()
      }
    })
  })

  it("should create a map with a json string", (done) => {
    m = new gmap({
      mapOptions: {
        center: '{"lat":37.5,"lng":-120}',
        zoom: 6
      },
      onLoad() {
        chai.expect(m.init.bounds).to.not.be.undefined
        done()
      }
    })
  })

  it("should create a map with a delimited string", (done) => {
    m = new gmap({
      mapOptions: {
        center: "37.5, -120",
        zoom: 6
      },
      delimitedStrings: true,
      onLoad() {
        chai.expect(m.init.bounds).to.not.be.undefined
        done()
      }
    })
  })

})
