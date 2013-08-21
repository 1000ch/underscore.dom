expect = chai.expect

describe "Event Test", ->

  describe "_.ready()", ->

  describe "_.bind()", ->

    it "bind event to element", ->
      spy = sinon.spy()
      element = _.qs "#id3"
      _.bind element, "click", spy
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2

  describe "_.unbind()", ->

    it "unbind event from element", ->
      spy = sinon.spy()
      element = _.qs "#id3"
      _.bind element, "click", spy
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2
      _.unbind element, "click", spy
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2

  describe "_.once()", ->

    it "bind function which will called once", ->
      spy = sinon.spy()
      element = _.qs "#id3"
      _.once element, "click", spy
      element.click()
      element.click()
      expect(spy.callCount).to.equal 1

  describe "_.delegate()", ->

    spy = null
    element = null
    container = null

    beforeEach ->
      spy = sinon.spy()
      container = _.qs "#container"
      element = _.qs "button"

    afterEach ->
      _.undelegate container

    it "delegate function 1", ->
      _.delegate container, "click", "button", spy
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2

    it "delegate function 2", ->
      _.delegate container, "click", ".class1", spy
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2

  describe "_.undelegate()", ->

    spy = null
    element = null
    container = null

    beforeEach ->
      spy = sinon.spy()
      container = _.qs "#container"
      element = _.qs "button"

    afterEach ->
      _.undelegate container

    it "undelegate function 1", ->
      _.delegate container, "click", "button", spy
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2
      _.undelegate container, "click", "button", spy
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2

    it "undelegate function 2", ->
      _.delegate container, "click", "button", spy
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2
      _.undelegate container, "click", "button"
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2

    it "undelegate function 3", ->
      _.delegate container, "click", "button", spy
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2
      _.undelegate container, "click"
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2

    it "undelegate function 4", ->
      _.delegate container, "click", "button", spy
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2
      _.undelegate container
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2