var requireOption = require('../common').requireOption;

/**
 * Get the recipe for the recipe param
 *  - if there is no such inventory, redirect to /recipes
 *  - if there is one, put it on res.locals.recipe
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

        return next();
    };

};
