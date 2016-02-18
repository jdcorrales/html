//Invocar modo 'strict' de JavaScript
'use strict';

var controllers = require('./index.server.controllers');

module.exports = function(app){

	app.get('/users', function (req, res) {
        
        var User= req.app.models.User;
        User.findById(req.params.id, function (err, user) {
            if (err) {
                res.status(400);
                return res.json({
                    status: 400,
                    error: err
                });
            }
            if (user) {
                res.status(200);
                res.json({
                    status: 200,
                    data: user.toObject()
                });
            } else {
                res.status(404);
                res.json({
                    status: 404,
                    error: "NotFound"
                });
            }
        });
	});
}