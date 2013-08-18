expect = chai.expect

describe "API Existence", ->

  it "_.qsa exists", ->
    expect(!!_.qsa).to.equal true

  it "_.qs exists", ->
    expect(!!_.qs).to.equal true

  it "_.ready exists", ->
    expect(!!_.ready).to.equal true

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