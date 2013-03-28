var app = app || {};

(function () {

	app.userView = new app.UserView();
    app.userView.loadAllUsers();
    Backbone.history.start();
}());


