var _ = require('underscore');

/*
* DATA
*/
var array = [
	{id : 1, name : 'Filip', isActive : true},
	{id : 2, name : 'Kalle', isActive : true},
	{id : 3, name : 'Pelle', isActive : false},
	{id : 4, name : 'Oskar', isActive : false},
	{id : 5, name : 'Olle', isActive : true}
];
console.log("");
console.log("**********************************************");
console.log("Database initialized and ready to serve request"); 
console.log("The database contains " + array.length + " users." );
console.log("**********************************************");		
console.log("");
/*
* Function declarations
*/

exports.addUser = function addUser(user) {
		var newId = _.last(array).id +1;
		user.id = newId;
		array.push(user);
		return user;
}

exports.getActiveUsers = function getActiveUsers(req, res) {
    var activeUsers = _.filter(array, function (obj) {
        return obj.isActive === true;
    });
    return activeUsers;
};

exports.getAllUsers = function getAllUsers() {
    return array;
};

exports.removeUser = function removeUser(id) {
    array = _.filter(array, function (obj) {
        return obj.id != id;
    });
    return array;
};

exports.getSpecificUser = function getSpecificUser(id, req, res) {
    var user;
    if (id !== undefined) {
        user = _.find(array, function(obj) {
            if (obj.id == id) {
                return obj;
            }
        });
        if (user !== undefined) {
            return user;
        } else {
            return {message : 'User ' + id + ' was not found.'};
        }
    }
};
