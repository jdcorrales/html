/**
 *  users Routes
 *
 *  Created by create caminte-cli script
 *  App based on CaminteJS
 *  CaminteJS homepage http://www.camintejs.com
 **/

var express = require('express');
//var router = express.Router({mergeParams: true});
var middleware;

/* params router level */
/*router.param('id', function (req, res, next, id) {
   if (/^\d+$/.test(id)) {
      next();
   } else {
      next('route');
   }
});*/

/* middleware router level */
if (middleware) {
   router.use(middleware);
}

/**
* Index action, returns a list either
* Default mapping to GET '~/users'
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
**/
router.get('/', function (req, res) {
        var User = req.app.models.User;
        var query = req.query;
        var skip = query.skip ? parseInt(query.skip) - 1 : 0;
        var limit = query.limit ? parseInt(query.limit) : 20;
        var total = 0;

        var opts = {
            skip: skip,
            limit: limit,
            where: {}
        };

        User.count(opts.where, function (err, count) {
            total = count;
            User.all(opts, function (err, users) {
                if (err) {
                    res.status(400);
                    return res.json({
                        status: 400,
                        error: err
                    });
                }
                res.status(200);
                res.json({
                     status: 200,
                     data: users
                });
            });
        });
});

/**
* New action, returns new a single user
* Default mapping to GET '~/users/new'
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
**/
router.get('/new', function (req, res) {
        var User = req.app.models.User;
        var user = new (req.body);
        res.status(200);
        res.json({
            status: 200,
            data: user.toObject()
        });
});

/**
* Show action, returns shows a single user
* Default mapping to GET '~/users/:id'
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
**/
router.get('/:id', function (req, res) {
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

/**
* Update action, updates a single user
* Default mapping to PUT '~/users/:id', no GET mapping
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
**/
router.put('/:id', function (req, res) {
        var  User = req.app.models.User;
        User.findById(req.params.id, function (err, user) {
            if (err) {
                res.status(400);
                return res.json({
                    status: 400,
                    error: err
                });
            }
            if (user) {
                user.updateAttributes(req.body, function (err) {
                    if (err) {
                        res.status(400);
                        return res.json({
                            status: 400,
                            error: err
                        });
                    }
                    res.status(200);
                    res.json({
                        status: 200,
                        data: user.toObject()
                    });
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

/**
* Create action, creates a single user
* Default mapping to POST '~/users', no GET mapping
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
**/
router.post('/', function (req, res) {
        var User = req.app.models.User;
        var user = new (req.body);
        user.isValid(function (isValid) {
            if (!isValid) {
                res.status(400);
                return res.json({
                    status: 400,
                    error: user.errors
                });
            }

            user.save(function (err) {
                if (err) {
                    res.status(400);
                    return res.json({
                        status: 400,
                        error: err
                    });
                }
                res.status(201);
                res.json({
                    status: 201,
                    data: user.toObject()
                });
            });
        });
});

/**
* Delete action, deletes a single user
* Default mapping to DEL '~/users/:id', no GET mapping
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
**/
router.delete('/:id', function (req, res) {
        var User = req.app.models.User;
        User.findById(req.params.id, function (err, user) {
            if (err) {
                res.status(400);
                return res.json({
                    status: 400,
                    error: err
                });
            }
            if (!user) {
                res.status(404);
                return res.json({
                    status: 404,
                    error: 'NotFound'
                });
           }
            user.destroy(function (err) {
                if (err) {
                    res.status(400);
                    return res.json({
                        status: 400,
                        error: err
                    });
                } else {
                    res.status(204);
                    res.json({
                        status: 204,
                        message: 'Item deleted!'
                    });
                }
            });
        });
});

/**
* Delete action, deletes a all users
* Default mapping to DEL '~/users', no GET mapping
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
**/
router.delete('/all', function (req, res) {
        var User = req.app.models.User;
        User.destroyAll(function (err) {
            if (err) {
                res.status(400);
                return res.json({
                    status: 400,
                    error: err
                });
            } else {
                res.status(204);
                res.json({
                    status: 204,
                    message: 'users deleted'
                });
            }
        });
});

module.exports = router;