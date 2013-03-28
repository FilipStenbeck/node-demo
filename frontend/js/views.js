var app = app || {};

app.UserView = Backbone.View.extend({
   
    initialize: function () {
        this.coll = new app.UserCollection();
    },
    el: $("#app_container"),
    render: function () {
        
       $('#user-table tbody').empty();    
        
        var that = this;
        _.each(this.coll.models, function (obj) {
            $('#user-table tbody').append(_.template($("#all_user_template").html(), 
                {
                   'id' : obj.get('id'), 
                    'name' : obj.get("name"), 
                    'isActive' : obj.get("isActive")
                    }
                ));    
            });
            return this;
            
        },
    
    //methods
    loadAllUsers : function () {
    	
        var that = this;
        
        this.coll.fetch({
                        
            success: function (data) {
                console.log('DEBUG: Loaded ' + that.coll.models.length + ' users from server.');
                that.render();
            },
            error : function (collection) {
                collection.reset(); 
                $('.alert').addClass('alert-error');
                $('.alert').html('Hoppsan något galet gick på tok...');             
            }
        });
    },
    loaded : function (collection) {
        
               
    },
    changeStatus : function (event) {
        console.log(event.currentTarget);
    },
    newUser : function () {
        console.log("New user");
        
        $('#new-user-form')[0].reset();
        
        return false;
    },
    
    events: {
         "click tr" : "changeStatus",
         "onsubmit form" : "newUser"
  }
});
