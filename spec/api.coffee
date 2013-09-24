expect = chai.expect

describe "API Existence", ->

  it "_.qsa exists", ->
    expect(!!_.qsa).to.equal true

  it "_.qs exists", ->
    expect(!!_.qs).to.equal true

  it "_.ready exists", ->
    expect(!!_.ready).to.equal true

  it "_.on exists", ->
    expect(!!_.on).to.equal true

  it "_.off exists", ->
    expect(!!_.off).to.equal true

  it "_.addClass exists", ->
    expect(!!_.addClass).to.equal true

  it "_.removeClass exists", ->
    expect(!!_.removeClass).to.equal true

  it "_.toggleClass exists", ->
    expect(!!_.toggleClass).to.equal true