
describe("Overlays/Polygon - Get Path", () => {
  let m, path

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

  it("should return the path of all the polygons", () => {
    path = m.polygons().getPath()
    chai.expect(path[1]).to.be.an.instanceof(google.maps.MVCArray)
  })

  it("should return the path of all the polygons as a json string", () => {
    m.settings.delimitedStrings = false
    path = m.polygons().getPathString()
    chai.expect(path).to.be.an("Object")
  })

  it("should return the path of all the polygons as a delimited string", () => {
    m.settings.delimitedStrings = true
    path = m.polygons().getPathString()
    chai.expect(path).to.be.an("Object")
  })

  it("should return a single polygon's path", () => {
    path = m.polygons().findById(1).getPath()
    chai.expect(path).to.be.an.instanceof(google.maps.MVCArray)
  })

  it("should return a single polygon's path as a json string", () => {
    m.settings.delimitedStrings = false
    path = m.polygons().findById(1).getPathString()
    chai.expect(path).to.be.a("String")
  })

  it("should return a single polygon's path as a delimited string", () => {
    m.settings.delimitedStrings = true
    path = m.polygons().findById(1).getPathString()
    chai.expect(path).to.be.a("String")
  })

})
