var app = app || {};

(function () {

	app.userView = new app.UserView();
    app.userView.loadAllUsers();
    app.userRouter = new app.UserRouter();
    Backbone.history.start();
}());


