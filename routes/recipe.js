var authMW = require('../middleware/generic/auth');
var checkPrivilegeMW = require('../middleware/recipes/checkPrivilege');
var renderMW = require('../middleware/generic/render');

var randomRecipeMW = require ('../middleware/recipes/randomRecipe');
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
        getRecipeMW(objectRepository),
        checkPrivilegeMW(objectRepository),
        updateRecipeMW(objectRepository),
        renderMW(objectRepository, 'addRecipe')
    );

    /**
     * Delete recipe
     * - then redirect to /recipes
     */

    app.use('/recipe/:recipeid/delete',
        authMW(objectRepository),
        getRecipeMW(objectRepository),
        checkPrivilegeMW(objectRepository),
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

    /**
     * Main page
     */
    app.use('/',
        randomRecipeMW(objectRepository),
        renderMW(objectRepository, 'index')
    );
};