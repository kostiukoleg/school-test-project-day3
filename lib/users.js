var validator = require('validator');

users = [];

module.exports = {
    _users   : users,
    add      : function (data) {
        if (this._validate(data)) {
            var newUser = {
                "name"       : data["name"],
                "e-mail"     : data["e-mail"],
                "description": data["description"],
                "age"        : data["age"]
            };
            this._users.push(newUser);

            return {"success": true};
        }
        return {"success": false}

    },
    get      : function () {
        return this._users;
    },
    _validate: function (data) {
        return (
        validator.isEmail(data['e-mail']) &&
        validator.isNumeric(data['age']) &&
        validator.isLength(data['name'], 2, 255) &&
        validator.isLength(data['description'], 2, 255)
        )
    }
};