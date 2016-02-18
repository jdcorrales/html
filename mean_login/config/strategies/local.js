var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

    User = require('mongoose').model('usuarios');

    module.exports = function(){
      passport.use(new LocalStrategy('local', function(username, password, done) {
          User.findOne({ usuario: username }, function(err, user) {
            if (err) { 
              return done(err); 
            }

            if (!user) {
              return done(null, false, { message: 'Usuario Desconocido' });
            }

            if (!user.validPassword(password)) {
              return done(null, false, { message: 'Contraseña Inválida' });
            }

            return done(null, user);

          });
        }
      ));
    };