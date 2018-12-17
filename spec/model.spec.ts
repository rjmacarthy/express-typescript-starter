import * as sinon from 'sinon';
import { expect, assert } from "chai";
import * as mocks from 'node-mocks-http';
import { Example } from '../src/models/example.model';
import { after } from 'mocha';
import config from "../src/config/config";
var mongoose = require('mongoose');

describe("Model Spec", function () {
    let connectionString = config.mongodb;

    beforeEach(() => {
        delete mongoose.connection.models['Example'];
    });

    before(() => {
        mongoose.Promise = global.Promise;
        mongoose.connect(connectionString, {
            useMongoClient : true
        });
    });

    it('Can save a new model', async () => {
        var example = new Example();
        example.name = 'test';
        var response = await example.save();
        assert.isNotNull(response._id);
    })

    after(() => {
        Example.collection.drop();
    })

});