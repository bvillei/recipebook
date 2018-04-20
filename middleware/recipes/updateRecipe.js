var requireOption = require('../common').requireOption;

/**
 * Create (or update) recipe if we have the data for it
 * update if we have a res.locals.recipe, create if we don't have
 *  - if everything is ok redirect to /recipes/:recipeid
 */

module.exports = function (objectrepository) {

    var recipeModel = requireOption(objectrepository, 'recipeModel');

    return function (req, res, next) {

        if ((typeof req.body.name === 'undefined') ||
            (typeof req.body.ingredients === 'undefined')) {
            return next();
        }

        var recipe = undefined;
        if (typeof res.locals.recipe !== 'undefined') {
            recipe = res.locals.recipe;
        } else {
            recipe = new recipeModel();
        }
        recipe.name = req.body.name;
        recipe.category = req.body.category;
        // recipe.image = req.body.image;
        recipe.ingredients = req.body.ingredients;
        recipe.description = req.body.description;
        recipe._owner = req.session.userid;

        recipe.save(function (err, result) {
            if (err) {
                return next(err);
            }

            return res.redirect('/recipe/' + result.id);
        });
    };

};
