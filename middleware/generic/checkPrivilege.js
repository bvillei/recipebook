/**
 * If the user don't have privilege, redirects to /recipes
 *  - user have privilege if admin or the owner of the recipe
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

        return next();
    };

};
