var imageSearch = require('node-google-image-search');

var ImageSearchModel = require('../models/image_search');

exports.search = function(req, res, next) {
    var offset = parseInt(req.query.offset);
    offset = (isNaN(offset) || offset < 0) ? 0 : offset;
    
    imageSearch(req.params.term, function(results) {
        var items = [];
        for (var i=0; i<results.length;i++) {
            var item = {};
            item.link = results[i].link;
            item.snippet = results[i].snippet;
            item.thumbnail = results[i].image.thumbnailLink;
            item.context = results[i].image.contextLink;
            items.push(item);
        }
        res.json(items);
    }, offset, 10);
    new ImageSearchModel({searchTerm: req.params.term}).save();
};

exports.latest = function(req, res, next) {
    ImageSearchModel.find().sort('-date').limit(10).exec(function(err, terms){
        if (err) {
            next(err);
            return;
        }
        var items = [];
        for (var i=0;i<terms.length;i++) {
            var item = {};
            item.term = terms[i].searchTerm;
            item.when = terms[i].date;
            items.push(item);
        }
        res.json(items);
    }); 
};
