/*
* Creat an express application 
*/

var express = require('express');
var _ = require('underscore');
var app = express();

/*
* Configure, allow cross domain and enable POST body parser
*/ 

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(express.bodyParser());
app.use(allowCrossDomain);

/*
* The Model
*/

var array = [
        {id : 1, name : 'Filip', isActive : true},
        {id : 2, name : 'Kalle', isActive : true},
        {id : 3, name : 'Pelle', isActive : false},
        {id : 4, name : 'Oskar', isActive : false},
        {id : 5, name : 'Olle', isActive : true}
    ];
		
/*
* Function declarations
*/

var addUser = function addUser(user) {
		var newId = _.last(array).id +1;
		user.id = newId;
		array.push(user);
		return user;
}

var getActiveUsers = function getActiveUsers(req, res) {
    var activeUsers = _.filter(array, function (obj) {
        return obj.isActive === true;
    });
    res.send(activeUsers);
};


var removeUser = function removeUser(id, res) {
    array = _.filter(array, function (obj) {
        console.log(id + ' ' + obj.id);
        return obj.id != id;
    });
    res.send(array);
};


var getSpecificUser = function getSpecificUser(id, req, res) {
    var user;
    if (id !== undefined) {
        user = _.find(array, function(obj) {
            if (obj.id == id) {
                return obj;
            }
        });
        if (user !== undefined) {
            res.send(user);
        } else {
            res.send({message : 'User ' + id + ' was not found.'});
        }
    }
};

/*
* REST endpoints
*/

//Get all users
app.get('/users', function (req, res) {
    res.send(array);
});


//Get specific user or active users
app.get('/users/:command', function (req, res) {
    //Check if active users or specific user shall be calles
    if (req.params.command === 'active') {
        getActiveUsers(req, res);
    } else if (isNaN(req.params.command)) {
        res.send({message : 'Command : ' + req.params.command + ' was not found.'});
    } else {
       getSpecificUser(req.params.command, req, res);
    }
});


//Update or save new user
app.put('/users/:command', function (req, res) {
 res.setHeader('Access-Control-Allow-Origin', '*');
  user = addUser(req.body);
  res.send(user);
});

//Delete user
app.delete('/users/:command', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	removeUser(req.params.command, res);
});



app.listen(3000);
console.log('Listening on port 3000');
