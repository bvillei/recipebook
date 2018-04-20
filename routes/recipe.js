var authMW = require('../middleware/generic/auth');
var checkPrivilegeMW = require('../middleware/generic/checkPrivilege');
var renderMW = require('../middleware/generic/render');

var getRecipeListMW = require('../middleware/recipes/getRecipeList');
var updateRecipeMW = require ('../middleware/recipes/updateRecipe');
var getRecipeMW = require ('../middleware/recipes/getRecipe');
var deleteRecipeMW = require ('../middleware/recipes/deleteRecipe');

var recipeModel = require('../models/recipe');
var userModel = require('../models/user');

module.exports = function (app) {
    var objectRepository = {
        recipeModel: recipeModel,
        userModel: userModel
    };

    /**
     * Create new recipe
     */

    app.use('/recipes/new',
        authMW(objectRepository),
        updateRecipeMW(objectRepository),
        renderMW(objectRepository, 'addRecipe')
    );

    /**
     * Edit the recipe details
     */

    app.use('/recipe/:recipeid/edit',
        authMW(objectRepository),
        checkPrivilegeMW(objectRepository),
        getRecipeMW(objectRepository),
        updateRecipeMW(objectRepository),
        renderMW(objectRepository, 'addRecipe')
    );

    /**
     * Delete recipe
     * - then redirect to /recipes
     */

    app.use('/recipe/:recipeid/delete',
        authMW(objectRepository),
        checkPrivilegeMW(objectRepository),
        getRecipeMW(objectRepository),
        deleteRecipeMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/recipes');
        }
    );

    /**
     * Show the recipe details
     */

    app.use('/recipe/:recipeid',
        authMW(objectRepository),
        checkPrivilegeMW(objectRepository),
        getRecipeMW(objectRepository),
        renderMW(objectRepository, 'showRecipe')
    );

    /**
     * List all recipes
     */

    app.use('/recipes',
        getRecipeListMW(objectRepository),
        renderMW(objectRepository, 'listRecipe')
    );

};