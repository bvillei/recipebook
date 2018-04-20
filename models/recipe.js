var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Recipe = db.model('Recipe', {
    name: String,
    category: String,
    image: String,
    ingredients: String,
    description: String,
    _owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Recipe;