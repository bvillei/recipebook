// var expect = require('chai').expect;
// var getRecipeListMW = require('../../../middleware/recipes/getRecipeList');
//
// describe('getRecipeList middleware ', function () {
//
//     it('should return recipes', function (done) {
//         var req = {
//             body: {}
//         };
//         var res = {
//             locals: {}
//         };
//         var fakeRecipeModel = {
//             find: function (some, cb) {
//                 cb(undefined, ['recipe1', 'recipe2'])
//             }
//         };
//
//         getRecipeListMW({
//             recipeModel: fakeRecipeModel
//         })(req, res, function (err) {
//             expect(res.locals.recipes).to.eql(['recipe1', 'recipe2']);
//             expect(err).to.eql(undefined);
//             done();
//         });
//     });
//
//   it('should return error when db returns error', function (done) {
//     var req = {
//       body: {}
//     };
//     var fakeRecipeModel = {
//       find: function (some, cb) {
//         cb('pistike', undefined)
//       }
//     };
//
//     getRecipeListMW({
//       recipeModel: fakeRecipeModel
//     })(req, {}, function (err) {
//       expect(err).to.eql('pistike');
//       done();
//     });
//   });
// });
