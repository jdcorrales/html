var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('usuarios');

    module.exports = function(){
      passport.use(new LocalStrategy(function(username, password, done) {                    
          User.findOne({ 
            usuario : username 
          }, function(err, user) {
            if (err) {               
              return done(err); 
            }

            if (!user) {
              return done(null, false, { 
                message: 'Usuario Desconocido' 
              });
            }
            
            if (!user.authenticate(password)) {              
              return done(null, false, { 
                message: 'Contraseña Inválida' 
              });
            }

            return done(null, user);
          });
        }
      ));
    };