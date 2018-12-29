const express = require('express');
const device = require('express-device');
const ua = require('express-useragent');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const unless = require('express-unless');
const hbs = require('express-hbs');
const logger = require('morgan');
const cors = require('cors');
const timeout = require('connect-timeout');
const services = require('./services');
const mongoose = require('mongoose');
const env = require('dotenv').config()
const authCheck = require('./services/Auth/helpers/verifyToken')
const dbQuery = require('@rexfng/db').helpers
/* initialize mongodb connection */
mongoose.connect(process.env.MONGODB_DATABASE_URL, {useMongoClient: true});

app = express();
app.listen(process.env.PORT || 3000);	
app.use(device.capture({parseUserAgent: true}));
app.use(ua.express());
app.use(bearerToken());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: "15MB", type:'application/json'}));
app.use(logger("combined"));
// app.use(authCheck().unless({
// 	path: [
// 		'/', 
// 		'/api/v1/token',
// 		'/api/v1/register', 
// 		'/\/test*/',
// 		'/ac'
// 	]
// }));
app.use(cors());
app.use(function(err, req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.set('view engine', 'hbs');
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials'
}));

app.use(express.static('public/dist'));
/* routing */
app.use('/', services);



module.exports = app;