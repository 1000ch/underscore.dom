expect = chai.expect

describe "Selector Test", ->

  describe "_.qsa()", ->

    it "select id element", ->
      expect(_.qsa("#id1")[0]).to.equal document.getElementById("id1")

    it "select class elements", ->
      expect(_.qsa(".class1").length).to.equal document.getElementsByClassName("class1").length
      expect(_.qsa(".class1").length).to.equal document.querySelectorAll(".class1").length

    it "select tag elements", ->
      expect(_.qsa("div").length).to.equal document.getElementsByTagName("div").length
      expect(_.qsa("div").length).to.equal document.querySelectorAll("div").length

    it "select name elements", ->
      expect(_.qsa("[name=name1]").length).to.equal document.getElementsByName("name1").length
      expect(_.qsa("[name=name1]").length).to.equal document.querySelectorAll("[name=name1]").length

  describe "_.qs()", ->

    it "select id element", ->
      expect(_.qs("#id1")).to.equal document.getElementById("id1")

    it "select first class element", ->
      expect(_.qs(".class1")).to.equal document.getElementsByClassName("class1")[0]
      expect(_.qs(".class1")).to.equal document.querySelector(".class1")

    it "select first tag element", ->
      expect(_.qs("div")).to.equal document.getElementsByTagName("div")[0]
      expect(_.qs("div")).to.equal document.querySelector("div")

    it "select first name element", ->
      expect(_.qs("[name=name1]")).to.equal document.getElementsByName("name1")[0]
      expect(_.qs("[name=name1]")).to.equal document.querySelector("[name=name1]")