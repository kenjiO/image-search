var express = require('express');
var router = express.Router();

var api = require('../api/api.js');

router.get('/imagesearch/:term', api.search);

router.get('/imagesearch', function(req, res, next) {
   res.send("No search term specified"); 
});

router.get('/latest/imagesearch', api.latest);

module.exports = router;
