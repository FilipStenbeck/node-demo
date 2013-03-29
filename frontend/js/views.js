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
        var newId = _.last(app.userView.coll.models).get("id") +1;
        var newName =  $('#nameField').val();
        var newIsActive;
        if ($('input:checkbox:checked').val()) {
			newIsActive = true;
		} else {
			newIsActive = false;
		}
        console.log("DEBUG: New user, name: " + newName + " id:" + newId + " isActive :" + newIsActive);
        
        var newUser = new app.User();
        newUser.set({id : newId, name : newName, isActive : newIsActive});
        newUser.save({
                        
            success: function (data) {
                console.log("Saved!")
                app.userView.coll.add(newUser);
                app.userView.render();
            },
            error : function (e) {
                console.log(e);             
            }
            });
        
        $('#new-user-form')[0].reset();
        
        return false;
    },
    
    events: {
         "click #newUserBtn" : "newUser",
         "onsubmit form" : "newUser"
  }
});
