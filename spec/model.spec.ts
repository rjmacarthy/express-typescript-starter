require('dotenv').config()
import { assert } from 'chai'
import { Example } from '../src/models/example.model'
import { after } from 'mocha'
import { DB } from '../src/var/config'
import { describe, it } from 'mocha'
import * as mongoose from 'mongoose'

describe('Model Spec', function () {
  let connectionString = DB

  beforeEach(() => {
    // @ts-ignore
    delete mongoose.connection.models.Example
  })

  before(() => {
    mongoose.connect(connectionString)
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
