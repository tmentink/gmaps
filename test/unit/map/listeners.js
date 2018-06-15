
describe("Map - Listeners", () => {
  let m

  before((done) => {
    m = new gmap({
      onLoad() {
        done()
      }
    })
  })

  afterEach(() => {
    m.off("all")
  })

  it("should add and trigger a click event", () => {
    let click = false
    m.on("click", () => {
      click = true
    })

    m.trigger("click")
    chai.expect(click).to.be.true
  })

  it("should add and trigger a double click event", () => {
    let dblClick = false
    m.on("double click", () => {
      dblClick = true
    })

    m.trigger("double click")
    chai.expect(dblClick).to.be.true
  })

  it("should remove the click event before it is triggered", () => {
    let click = false
    m.on("click", () => {
      click = true
    })

    m.off("click")
    m.trigger("click")
    chai.expect(click).to.be.false
  })

  it("should remove the click event but not the double click event", () => {
    let click = false
    let dblClick = false
    m.on("click", () => {
      click = true
    })
    m.on("double click", () => {
      dblClick = true
    })

    m.off("click")
    m.trigger("click")
    m.trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.true
  })

  it("should remove all events", () => {
    let click = false
    let dblClick = false
    m.on("click", () => {
      click = true
    })
    m.on("double click", () => {
      dblClick = true
    })

    m.off("all")
    m.trigger("click")
    m.trigger("double click")
    chai.expect(click).to.be.false
    chai.expect(dblClick).to.be.false
  })

})
