expect = chai.expect

describe "API Existence", ->

  it "_.ready exists", ->
    expect(!!_.ready).to.equal true

  it "_.qsa exists", ->
    expect(!!_.qsa).to.equal true

  it "_.qs exists", ->
    expect(!!_.qs).to.equal true

  it "_.bind exists", ->
    expect(!!_.bind).to.equal true

  it "_.unbind exists", ->
    expect(!!_.unbind).to.equal true

  it "_.once exists", ->
    expect(!!_.once).to.equal true

  it "_.delegate exists", ->
    expect(!!_.delegate).to.equal true

  it "_.undelegate exists", ->
    expect(!!_.undelegate).to.equal true

  it "_.addClass exists", ->
    expect(!!_.addClass).to.equal true

  it "_.removeClass exists", ->
    expect(!!_.removeClass).to.equal true

describe "API Test", ->

  it "_.qsa select id element", ->
    expect(_.qsa("#id1")[0]).to.equal document.getElementById("id1")

  it "_.qsa select class elements", ->
    expect(_.qsa(".class1").length).to.equal document.getElementsByClassName("class1").length
    expect(_.qsa(".class1").length).to.equal document.querySelectorAll(".class1").length

  it "_.qsa select tag elements", ->
    expect(_.qsa("div").length).to.equal document.getElementsByTagName("div").length
    expect(_.qsa("div").length).to.equal document.querySelectorAll("div").length

  it "_.qsa select name elements", ->
    expect(_.qsa("[name=name1]").length).to.equal document.getElementsByName("name1").length
    expect(_.qsa("[name=name1]").length).to.equal document.querySelectorAll("[name=name1]").length

  it "_.qs select id element", ->
    expect(_.qs("#id1")).to.equal document.getElementById("id1")

  it "_.qs select first class element", ->
    expect(_.qs(".class1")).to.equal document.getElementsByClassName("class1")[0]
    expect(_.qs(".class1")).to.equal document.querySelector(".class1")

  it "_.qs select first tag element", ->
    expect(_.qs("div")).to.equal document.getElementsByTagName("div")[0]
    expect(_.qs("div")).to.equal document.querySelector("div")

  it "_.qs select first name element", ->
    expect(_.qs("[name=name1]")).to.equal document.getElementsByName("name1")[0]
    expect(_.qs("[name=name1]")).to.equal document.querySelector("[name=name1]")