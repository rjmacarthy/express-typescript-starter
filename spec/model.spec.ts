import { assert } from 'chai'
import { Example } from '../src/models/example.model'
import { after } from 'mocha'
import { DB_CONNECTION_STRING } from '../src/var/config'
// tslint:disable-next-line: no-require-imports
const mongoose = require('mongoose')

describe('Model Spec', function() {
  let connectionString = DB_CONNECTION_STRING

  beforeEach(() => {
    delete mongoose.connection.models.Example
  })

  before(() => {
    mongoose.Promise = global.Promise
    mongoose.connect(connectionString, {
      useMongoClient: true,
    })
  })

  it('Can save a new model', async () => {
    const example = new Example()
    example.name = 'test'
    const response = await example.save()
    assert.isNotNull(response._id)
  })

  after(() => {
    Example.collection.drop()
  })
})
