var requireOption = require('../common').requireOption;

/**
 * Get the recipe list and put the recipes on res.locals.recipes
 */

module.exports = function (objectrepository) {

    var recipeModel = requireOption(objectrepository, 'recipeModel');

    return function (req, res, next) {

        return next();
    };

};
