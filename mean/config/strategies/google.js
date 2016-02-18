var passport = require('passport'),
    url = require('url'),    
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    config = require('../config'),
    users = require('../../app/controllers/users.server.controller');


module.exports = function(){
  passport.use(new GoogleStrategy({
    clientID : config.google.clienteID,
    clientSecret : config.google.clienteSecret,
    callbackURL : config.google.callbackURL,
    passReqToCallback:true
  },

  function(req, accesToken, refreshToken, profile, done) {
    var providerData = profile._json;

    providerData.accesToken = accesToken;
    providerData.refreshToken = refreshToken;

    var providerUserProfile = {
      nombres : profile.name.givenName,
      apellidos : profile.name.familyName,          
      email : profile.emails[0].value,
      usuario : profile.username,
      provider : 'google',
      providerId : profile.id,
      providerData : providerData
    };

    users.saveOAuthUserProfile(req, providerUserProfile, done);
  }));
};

