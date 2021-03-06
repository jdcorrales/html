/**
 *  Default session configuration
 *  Inject app and express reference
 *
 *  Created by init script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/

var config = require('./configuration');
var expressSession = require('express-session');
var CaminteStore = require('connect-caminte');
var database = require('./database' ).db;

module.exports = function (app,express) {
    var sessionStore = CaminteStore(expressSession);
    app.use(expressSession({
         cookie: {
             maxAge: config.session.maxAge
         },
         key: config.session.key,
         secret: config.session.secret,
         saveUninitialized: true,
         resave: true,
         store: new sessionStore({
             driver: database.driver,
             collection: 'session',
             db: database,
             secret: config.session.secret,
             maxAge: config.session.maxAge,
             clear_interval: config.session.clear_interval
         })
     }));
};