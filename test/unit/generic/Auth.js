var expect = require('chai').expect;
var getAuthMW = require('../../../middleware/generic/Auth');

describe('getAuth middleware ', function () {

    it('should call next if the userid in session exists', function (done) {
        var req = {
            session: {
                userid: 'valami'
            }
        };
        getAuthMW({})(req, {}, function () {
            done();
        });
    });

    it('should call res.redirect', function (done) {
        var req = {
            session: {}
        };
        var res = {
            redirect: function (newurl) {
                expect(newurl).be.eql('/login');
                done();
            }
        };
        getAuthMW({})(req, res, function () {
            expect('next should not be called').be.eql(false);
        });
    });
});