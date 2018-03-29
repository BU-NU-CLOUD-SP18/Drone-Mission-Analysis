import {after, before, describe, it} from "mocha";
import {expect} from "chai";
import {start, stop} from "./integration";

describe('IntegrationTesting', () => {
    let app;

    before(done => {
        app = start(done);
    });

    after(done => {
        stop(app, done);
    });

});