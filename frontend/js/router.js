var app = app || {};

app.UserRouter = Backbone.Router.extend({
    routes: {
         "edit/:id": "editUser"
    },
    editUser : function (id) {
        $('#editModal').modal('show');
        app.userView.editUser(undefined, id);
    }
});