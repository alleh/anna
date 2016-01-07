'use strict';

var getUser = function(users, userId) {
	var user = users.filter(function (user) {
        return user.id === id;
    })[0];
	console.log(user);
	return this.getUser(user.name);
}

module.exports = {
    getUser: getUser
};
