/**
 * Delete the task object, if its already loaded
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {

        if (typeof res.locals.recipe === 'undefined') {
            return next();
        }

        res.locals.recipe.remove(function (err) {
            if (err) {
                return next(err);
            }

            //redirect to all recipes
            res.redirect('/recipes/');
        });
    };

};
