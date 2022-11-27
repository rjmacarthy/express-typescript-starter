import * as sinon from 'sinon'
import { expect } from 'chai'
import * as mocks from 'node-mocks-http'
import { elevatorController } from '../src/controllers/elevator.controller'
import { describe, it } from 'mocha'

// TODO:: change the tests
describe('Index Controller', function () {
  let res: mocks.MockResponse<any>

  beforeEach(() => {
    res = mocks.createResponse()
  })

  it('Can render the index page', async function () {
    let req, spy
    spy = res.render = sinon.spy()
    elevatorController.which(req, res)
    expect(spy.calledOnce).to.equal(true)
  })

  it('Can get get json', () => {
    elevatorController.index(null, res, null)
    const data = JSON.parse(res._getData())
    expect(data.msg).to.equal('Hello!')
  })
})
