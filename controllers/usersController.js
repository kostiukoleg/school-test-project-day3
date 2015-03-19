var ect = require("ect");
var renderer = ect({root: __dirname + '/../views'});

module.exports = {
    getAction : function (request, response, next) {
        setTimeout(function (next) {
            response.statusCode = 200;
            try {
                var users = global.users.get();
                response.write(renderer.render('users.ect', {
                    users: users
                }));
                next();
            } catch (e) {
                next(e);
            }
        }, 500, next)
    },
    postAction: function (request, response, next) {
        var body = '';

        request.on('data', function (data) {
            body += data;
        });

        request.on('end', function () {
            var newUserData = JSON.parse(body);

            if (!global.users.add(newUserData)['success']) {
                response.write('Wrong post data!');
                next();
            }
            else {
                response.write('Added');
                next();
            }
        });

    }
};