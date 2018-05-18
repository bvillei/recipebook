var expect = require('chai').expect;
var updateRecipeMW = require('../../../middleware/recipes/updateRecipe');

describe('updateRecipe middleware ', function () {

    it('should call next if req.body.name is undefined', function (done) {
        var req = {
            body: {
                ingredients: 'something'
            }
        };
        var res = {};
        var fakeRecipeModel = {
            find: function (some, cb) {
                cb(undefined, ['recipe1', 'recipe2'])
            }
        };
        updateRecipeMW({
            recipeModel: fakeRecipeModel
        })(req, res, function (err) {
            done();
        });
    });

    it('should call next if req.body.ingredients is undefined', function (done) {
        var req = {
            body: {
                name: 'hello'
            }
        };
        var res = {};
        var fakeRecipeModel = {
            find: function (some, cb) {
                cb(undefined, ['recipe1', 'recipe2'])
            }
        };
        updateRecipeMW({
            recipeModel: fakeRecipeModel
        })(req, res, function (err) {
            done();
        });
    });

    it('should call redirect after save', function (done) {
        var req = {
            body: {
                name: 'hello',
                ingredients: 'world'
            },
            session: {
                userid: 'sanyi'
            }
        };
        var recipe = {
            name: 'ham',
            ingredients: 'burger',
          save: function (cb) {
              cb(undefined,{
                  id: '22222'
              })
          }
        };
        var res = {
            locals: {
                recipe: recipe
            },
            redirect: function (newurl) {
                expect(res.locals.recipe.name).be.eql('hello');
                expect(res.locals.recipe.ingredients).be.eql('world');
                expect(newurl).be.eql('/recipe/22222');
                done();
            }
        };
        var fakeRecipeModel = {
            find: function (some, cb) {
                cb(undefined, ['recipe1', 'recipe2'])
            }
        };
        updateRecipeMW({
            recipeModel: fakeRecipeModel
        })(req, res, function (err) {
            expect('next should not be called').be.eql(false);
        });
    });

    it('should call next with error if the save was not ok', function (done) {
        var req = {
            body: {
                name: 'hello',
                ingredients: 'world'
            },
            session: {
                userid: 'sanyi'
            }
        };
        var recipe = {
            name: 'ham',
            ingredients: 'burger',
            save: function (cb) {
                cb('This is an error');
            }
        };
        var res = {
            locals: {
                recipe: recipe
            }
        };
        var fakeRecipeModel = {
            find: function (some, cb) {
                cb(undefined, ['recipe1', 'recipe2'])
            }
        };
        updateRecipeMW({
            recipeModel: fakeRecipeModel
        })(req, res, function (err) {
            expect(err).be.eql('This is an error');
            done();
        });
    });

    it('should create recipe if res.locals.recipe is undefined and save', function (done) {
        var req = {
            body: {
                name: 'hello',
                ingredients: 'world'
            },
            session: {
                userid: 'sanyi'
            }
        };

        var recipe = function () {
        };
        recipe.prototype.save = function (cb) {
            expect(this.name).be.eql('hello');
            expect(this.ingredients).be.eql('world');
            cb(undefined, {
                id: '22222'
            });
        };

        var res = {
            locals: {},
            redirect: function (newurl) {
                expect(newurl).be.eql('/recipe/22222');
                done();
            }
        };

        updateRecipeMW({
            recipeModel: recipe
        })(req, res, function (err) {
            expect('next should not be called').be.eql(false);
        });
    });
});
