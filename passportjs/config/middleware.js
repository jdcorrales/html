var passport = require('passport')
    , DropboxStrategy = require('passport-dropbox').Strategy
    , GitHubStrategy = require('passport-github').Strategy
    , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var verifyHandler = function (token, tokenSecret, profile, done) {
    process.nextTick(function () {

        User.findOne({id: profile.id}).done(function (err, user) {
            if (user) {
                return done(null, user);
            } else {
                User.create({
                    provider: profile.provider,
                    id: profile.id,
                    name: profile.displayName
                }).done(function (err, user) {
                        return done(err, user);
                    });
            }
        });
    });
};

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findOne({id: id}).done(function (err, user) {
        done(err, user)
    });
});


module.exports = {

    // Init custom express middleware
    express: {
        customMiddleware: function (app) {

            var local = require('./env/development.js');

            // Configure with your credentials
            var DROPBOX_APP_KEY = local.DROPBOX_APP_KEY;
            var DROPBOX_APP_SECRET = local.DROPBOX_APP_SECRET;
            
            var GITHUB_CLIENT_ID = local.GITHUB_CLIENT_ID;
            var GITHUB_CLIENT_SECRET = local.GITHUB_CLIENT_SECRET;

            var GOOGLE_CLIENT_ID = local.authenticate.google.clienteID;
            var GOOGLE_CLIENT_SECRET = local.authenticate.google.clienteSecret;
            
            passport.use(new DropboxStrategy({
                consumerKey: DROPBOX_APP_KEY,
                consumerSecret: DROPBOX_APP_SECRET,
                callbackURL: 'http://localhost:1337/auth/dropbox/callback'
              },
              verifyHandler
            ));

            passport.use(new GitHubStrategy({
                    clientID: GITHUB_CLIENT_ID,
                    clientSecret: GITHUB_CLIENT_SECRET,
                    callbackURL: 'http://localhost:1337/auth/github/callback'
                },
                verifyHandler
            ));

            passport.use(new GoogleStrategy({
                    clientID: GOOGLE_CLIENT_ID,
                    clientSecret: GOOGLE_CLIENT_SECRET,
                    callbackURL: 'http://localhost:1337/auth/google/callback'
                },
                verifyHandler
            ));

            app.use(passport.initialize());
            app.use(passport.session());
        }
    }

};
