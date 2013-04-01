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

//Setting up the user db module
var userData = require('./userData');

/*
* REST endpoints
*/

//Get all users
app.get('/users', function (req, res) {
    res.send(userData.getAllUsers());
});

//Get specific user or active users
app.get('/users/:command', function (req, res) {
    //Check if active users or specific user shall be calles
    if (req.params.command === 'active') {
        res.send(userData.getActiveUsers(req, res));
    } else if (isNaN(req.params.command)) {
        res.send({message : 'Command : ' + req.params.command + ' was not found.'});
    } else {
       res.send(userData.getSpecificUser(req.params.command, req, res));
    }
});

//Update or save new user
app.put('/users/:command', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	var user = req.body;
	if (user.id === "NEW") {
		user = userData.addUser(user);
	} else {
		user = userData.saveUser(user);	
	}
	res.send(user);
});

//Delete user
app.delete('/users/:command', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.send(userData.removeUser(req.params.command));
});

app.listen(3000);

console.log("");
console.log("**********************************************");
console.log('The server is listening on port 3000');
console.log("**********************************************");
