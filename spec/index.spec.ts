import * as sinon from 'sinon';
import { expect, assert } from "chai";
import * as mocks from 'node-mocks-http';
import IndexController from "../src/controllers/index.server.controller";

describe("Index Controller", function () {
    let res: mocks.MockResponse<any>;

    beforeEach(() => {
        res = mocks.createResponse();
    })

    it("Can render the index page", async function () {
        var req, spy;
        spy = res.render = sinon.spy();
        IndexController.read(req, res, null);
        expect(spy.calledOnce).to.equal(true);
    });

    it("Can get get json", () => {
        IndexController.get(null, res);
        var data = JSON.parse(res._getData());
        expect(data.msg).to.equal("Hello!");
    })
});