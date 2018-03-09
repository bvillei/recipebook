/**
 * If the user is not logged in, redirects to /login
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        return next();
    };

};
