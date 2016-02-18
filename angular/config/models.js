/**
*  models loader
*
*  Created by create caminte-cli script
*  App based on CaminteJS
*  CaminteJS homepage http://www.camintejs.com
**/

var caminte = require('caminte');
var Schema = caminte.Schema;
var fs = require('fs');
var path = require('path');
var modelDir = path.resolve(__dirname, '../app/models');
var modelList = fs.readdirSync(modelDir);
var dbConf = require('./database');
var database = dbConf[process.env.NODE_ENV || 'dev'];
var schema = new Schema(database.driver, database);

module.exports.init = function (app) {

      // process.env.AUTOUPDATE = true;

      if(!app.models) {
         app.models = {};
      }

      for(var m = 0; m < modelList.length; m++) {
          var modelFile = modelList[m];
          if (/\.js$/i.test(modelFile)) {
             var modelName = modelFile.replace(/\.js$/i, '');
             app.models[modelName] = require(modelDir + '/' + modelName)(schema);
          }
      }

      if ('function' === typeof schema.autoupdate) {
          if (process.env.AUTOUPDATE) {
              schema.autoupdate(function (err) {
                  if (err) {
                      console.log(err);
                  }
              });
          }
     }
     return app;
}