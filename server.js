var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URL);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

var index = require('./routes/index_route');
app.use('/', index);

var api = require('./routes/api_route');
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.error =  err ;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Express server listening on port ", port);
});
