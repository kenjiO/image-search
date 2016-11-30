
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var searchTermSchema = new Schema({
    searchTerm: {type: String},
    date: {type: Date, default: Date.now},
});

module.exports = mongoose.model('SearchTerm', searchTermSchema);