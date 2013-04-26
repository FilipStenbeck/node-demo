var app = app || {};


app.UserCollection = Backbone.Collection.extend({
    url: 'http://127.0.0.1:3000/users',
    
    showActive : function () {
        this.url = 'http://127.0.0.1:3000/users/active';
        this.fetch();
    },
    showAll : function () {
        this.url = 'http://127.0.0.1:3000/users';
        this.fetch();
    }
    
});

