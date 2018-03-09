var requireOption = require('../common').requireOption;

/**
 * Delete the recipe object
 */

module.exports = function (objectrepository) {

    var recipeModel = requireOption(objectrepository, 'recipeModel');

    return function (req, res, next) {

        return next();
    };

};
