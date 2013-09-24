expect = chai.expect

describe "Event Test", ->

  describe "_.on('type', function() {})", ->

    it "bind event to element", ->
      spy = sinon.spy()
      element = _.qs "#id3"
      _.on element, "click", spy
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2

  describe "_.off('type', function() {})", ->

    it "unbind event from element", ->
      spy = sinon.spy()
      element = _.qs "#id3"
      _.on element, "click", spy
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2
      _.off element, "click", spy
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2

  describe "_.on('type', 'selector' function() {})", ->

    spy = null
    element = null
    container = null

    beforeEach ->
      spy = sinon.spy()
      container = _.qs "#container"
      element = _.qs "button"

    afterEach ->
      _.off container

    it "delegate function 1", ->
      _.on container, "click", "button", spy
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2

    it "delegate function 2", ->
      _.on container, "click", ".class1", spy
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2

  describe "_.off('type', 'selector', function() {})", ->

    spy = null
    element = null
    container = null

    beforeEach ->
      spy = sinon.spy()
      container = _.qs "#container"
      element = _.qs "button"

    afterEach ->
      _.off container

    it "undelegate function 1", ->
      _.on container, "click", "button", spy
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2
      _.off container, "click", "button", spy
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2

    it "undelegate function 2", ->
      _.on container, "click", "button", spy
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2
      _.off container, "click", "button"
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2

    it "undelegate function 3", ->
      _.on container, "click", "button", spy
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2
      _.off container, "click"
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2

    it "undelegate function 4", ->
      _.on container, "click", "button", spy
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2
      _.off container
      element.click()
      element.click()
      expect(spy.callCount).to.equal 2