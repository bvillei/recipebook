/**
 * If the user don't have privilege, redirects to /recipes
 *  - user have privilege if the owner of the recipe
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

        if (res.locals.recipe._owner._id != req.session.userid) {
            console.log('owner: ' + res.locals.recipe._owner._id+ '  session: ' + req.session.userid);
            return res.redirect('/recipes');
        }
        return next();
    };

};
