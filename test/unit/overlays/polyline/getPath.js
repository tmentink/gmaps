
describe("Overlays/Polyline - Get Path", () => {
  let m, path

  before((done) => {
    m = new gmap({
      delimitedStrings: true,
      onLoad() {
        m.addOverlay("polylines", data.map((x) => {
          return {
            path: x.delimitedPath,
            id: x.id
          }
        }))

        done()
      }
    })
  })

  it("should return the path of all the polylines", () => {
    path = m.polylines().getPath()
    chai.expect(path[1]).to.be.an.instanceof(google.maps.MVCArray)
  })

  it("should return the path of all the polylines as a json string", () => {
    m.settings.delimitedStrings = false
    path = m.polylines().getPathString()
    chai.expect(path).to.be.an("Object")
  })

  it("should return the path of all the polylines as a delimited string", () => {
    m.settings.delimitedStrings = true
    path = m.polylines().getPathString()
    chai.expect(path).to.be.an("Object")
  })

  it("should return a single polyline's path", () => {
    path = m.polylines().findById(1).getPath()
    chai.expect(path).to.be.an.instanceof(google.maps.MVCArray)
  })

  it("should return a single polyline's path as a json string", () => {
    m.settings.delimitedStrings = false
    path = m.polylines().findById(1).getPathString()
    chai.expect(path).to.be.a("String")
  })

  it("should return a single polyline's path as a delimited string", () => {
    m.settings.delimitedStrings = true
    path = m.polylines().findById(1).getPathString()
    chai.expect(path).to.be.a("String")
  })

})
