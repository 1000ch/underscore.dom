expect = chai.expect

describe "Manipulation Test", ->

  describe "_.addClass()", ->

    it "add class to a element", ->
      element = document.getElementById("id1")
      expect(element.classList.contains("testClass")).to.not.equal true
      _.addClass(element, "testClass")
      expect(element.classList.contains("testClass")).to.equal true

    it "add classes to a element", ->
      element = document.getElementById("id1")
      expect(element.classList.contains("testClass1")).to.not.equal true
      expect(element.classList.contains("testClass2")).to.not.equal true
      _.addClass(element, "testClass1 testClass2")
      expect(element.classList.contains("testClass1")).to.equal true
      expect(element.classList.contains("testClass2")).to.equal true

  describe "_.removeClass()", ->

    it "remove class from a element", ->
      element = document.getElementById("id2")
      expect(element.classList.contains("class1")).to.equal true
      _.removeClass(element, "class1")
      expect(element.classList.contains("class1")).to.not.equal true

    it "remove classes from a element", ->
      element = document.getElementById("id2")
      element.classList.add("testClass1")
      element.classList.add("testClass2")
      expect(element.classList.contains("testClass1")).to.equal true
      expect(element.classList.contains("testClass2")).to.equal true
      _.removeClass(element, "testClass1 testClass2")
      expect(element.classList.contains("testClass1")).to.not.equal true
      expect(element.classList.contains("testClass2")).to.not.equal true

  describe "_.toggleClass()", ->

    it "toggle class of a element", ->
      element = document.getElementById("id3")
      expect(element.classList.contains("testClass")).to.not.equal true
      _.toggleClass(element, "testClass")
      expect(element.classList.contains("testClass")).to.equal true
      _.toggleClass(element, "testClass")
      expect(element.classList.contains("testClass")).to.not.equal true

    it "toggle classess of a element", ->
      element = document.getElementById("id3")
      expect(element.classList.contains("class1")).to.equal true
      expect(element.classList.contains("testClass")).to.not.equal true
      _.toggleClass(element, "class1 testClass")
      expect(element.classList.contains("class1")).to.not.equal true
      expect(element.classList.contains("testClass")).to.equal true
      _.toggleClass(element, "class1 testClass")
      expect(element.classList.contains("class1")).to.equal true
      expect(element.classList.contains("testClass")).to.not.equal true