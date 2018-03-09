var requireOption = require('../common').requireOption;

/**
 * Create (or update) recipe if we have the data for it
 * update if we have a res.locals.recipe, create if we don't have
 *  - if everything is ok redirect to /recipes/:recipeid
 */

module.exports = function (objectrepository) {

    var recipeModel = requireOption(objectrepository, 'recipeModel');

    return function (req, res, next) {

        return next();
    };

};
