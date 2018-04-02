
var express = require('express');
const expressValidator = require('express-validator');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var routes = require('./routes/index');

const dbProd = require('./conf/mongo.conf.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('host', 'localhost');
app.set('port', 8080);


MongoClient.connect(dbProd.dbUri, function(err, client) {
    const db = client.db(dbProd.dbName);
    const collection = db.collection('DisasterDeclarationsSummaries');

    // collection.find({}).limit(100).toArray(function(err, docs) {
    //     console.log("Found the following records");
    //     console.log(docs);
    // });
    client.close();
});


// uncomment after placing your favicon in /public
// app.use(favicon(dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressValidator());

// Make our db accessible to our router
// app.use(function(req,res,next){
//     req.db = db;
//     next();
// });

const disasterRoutes = require('./routes/disasterRoutes')();

// app.use('/api', disasterRoutes);
//app.use('/api', routes);
app.use('/api', disasterRoutes);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
//will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.json('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.json('error', {
//         message: err.message,
//         error: {}
//     });
// });


app.listen(app.get('port'), () => {
  console.log(`HTTP Server listening on port ${app.get('host')}:${app.get('port')}`);
});


module.exports = app;




