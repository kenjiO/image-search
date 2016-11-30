var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'My App Title' });
});

router.get('/new', function(req, res, next) {
  res.render('new');
});

router.post('/new', function(req, res, next){
  if (req.body) {
    res.send("req.body: " + JSON.stringify(req.body));
  } else {
    res.send("req.body not defined");
  }
});

module.exports = router;
