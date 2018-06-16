/* global describe, context, beforeEach, it */

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const expectedFiles = require('./utils/expected-files').tokenContracts;

describe('Token Contracts', () => {
    beforeEach((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts({
                appName: 'TestIco',
                tokenName: 'Test Token',
                tokenSymbol: 'TST',
                tokenSupply: '3000',
                frontEnd: false,
            })
            .on('end', done);
    });

    it('creates expected default contract files for token', () => {
        assert.file(expectedFiles);
    });
});