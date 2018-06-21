
describe("Map - Add Label", () => {
  let m
  const position = {
    lat: 39.59190,
    lng: -122.40150
  }

  before((done) => {
    m = new gmap({
      onLoad() {
        done()
      }
    })
  })

  it("should create a label with default settings", () => {
    const defaults = gmap.settings.labelOptions
    const oa = m.addOverlay("label", {
      position: position,
      text: "test"
    })

    chai.expect(oa.data[0].init.options.align).to.equal(defaults.align)
  })

  it("should create a label with custom settings", () => {
    const oa = m.addOverlay("label", {
      align: "left",
      id: 1,
      position: position,
      text: "test"
    })

    chai.expect(oa.data[0].init.options.align).to.equal("left")
  })

  it("should not create a label with the same id", () => {
    const oa = m.addOverlay("label", {
      id: 1,
      position: position,
      text: "test"
    })

    chai.expect(oa.data).to.have.lengthOf(0)
  })

  it("should create multiple labels with json strings", () => {
    m.settings.delimitedStrings = false

    const oa = m.addOverlay("labels", data.map((x) => {
      return {
        position: x.jsonCenter,
        text: "test"
      }
    }))

    chai.expect(oa.data).to.have.lengthOf(58)
  })

  it("should create multiple labels with delimited strings", () => {
    m.settings.delimitedStrings = true

    const oa = m.addOverlay("labels", data.map((x) => {
      return {
        position: x.delimitedCenter,
        text: "test"
      }
    }))

    chai.expect(oa.data).to.have.lengthOf(58)
  })

})
