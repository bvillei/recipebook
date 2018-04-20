var requireOption = require('../common').requireOption;

/**
 * Get the recipe for the recipe param
 *  - if there is no such recipe, redirect to /recipes
 *  - if there is one, put it on res.locals.recipe
 */

module.exports = function (objectrepository) {

    var recipeModel = requireOption(objectrepository, 'recipeModel');

    return function (req, res, next) {

        recipeModel.findOne({
            _id: req.param('recipeid')
        }).populate('_owner').exec(function (err, result) {
            if ((err) || (!result)) {
                return res.redirect('/recipes');
            }

            res.locals.recipe = result;
            return next();
        });
    };

};
