var inverseAuthMW = require('../middleware/generic/inverseAuth');
var checkUserLoginMW = require('../middleware/generic/checkUserLogin');
var renderMW = require('../middleware/generic/render');
var emailSenderMW = require('../middleware/generic/emailSender');
var logoutMW = require('../middleware/generic/logout');
var userModel = {};

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel
    };

    /**
     * Main page
     */
    app.get('/',
        renderMW(objectRepository, 'index')
    );

    /**
     * Login page
     */
    app.use('/login',
        inverseAuthMW(objectRepository),
        checkUserLoginMW(objectRepository),
        renderMW(objectRepository, 'login')
    );

    /**
     * Register page
     */
    app.use('/register',
        inverseAuthMW(objectRepository),
        renderMW(objectRepository, 'register')
    );

    /**
     * Reminder page
     */
    app.use('/reminder',
        inverseAuthMW(objectRepository),
        checkUserLoginMW(objectRepository),
        emailSenderMW(objectRepository),
        renderMW(objectRepository, 'reminder')
    );

    /**
     * Logout
     */
    app.get('/logout',
        logoutMW(objectRepository),
        function (req, res, next) {
            res.redirect('/');
        }
    );
};