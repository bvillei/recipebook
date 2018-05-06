var requireOption = require('../common').requireOption;

/**
 * Get the recipe list and put the recipes on res.locals.recipes
 */

module.exports = function (objectrepository) {

    var recipeModel = requireOption(objectrepository, 'recipeModel');

    return function (req, res, next) {

        var search;

        if ((typeof req.body.category !== 'undefined') && (req.body.category !== 'All')) {
            search = req.body.category;
        }
        else {
            search = /.*/;
        }

        recipeModel.find({
            category: search
        }).populate('_owner').exec(function (err, results) {
            if (err) {
                return next(new Error('Error getting recipes'));
            }

            res.locals.recipes = results;
            return next();
        });
    };
    ;

};
