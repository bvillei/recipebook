var requireOption = require('../common').requireOption;

/**
 * Get the recipe for the recipe param
 *  - if there is no such recipe, redirect to /recipes
 *  - if there is one, put it on res.locals.recipe
 */

module.exports = function (objectrepository) {

    var recipeModel = requireOption(objectrepository, 'recipeModel');

    return function (req, res, next) {

        // Get the count of all users
        recipeModel.count().exec(function (err, count) {

            // Get a random entry
            var random = Math.floor(Math.random() * count);

            // Again query all users but only fetch one offset by our random #
            recipeModel.findOne().skip(random).exec(
                function (err, result) {
                    // Tada! random recipe
                    console.log(result);
                    res.locals.recipe = result;
                    return next();
                });
        });
    };
};