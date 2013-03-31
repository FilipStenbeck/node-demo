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
            error : function (error) {
                console.log(error)         
            }
        });
    },
    loaded : function (collection) {           
    },
    
    newUser : function () {
       
        var newName =  $('#nameField').val();
        var newIsActive;
        if ($('input:checkbox:checked').val()) {
			newIsActive = true;
		} else {
			newIsActive = false;
		}
        var newUser = new app.User();
        newUser.set({id : "NEW", name : newName, isActive : newIsActive});
        newUser.save({},{               
            success: function (data) {  
				app.userView.coll.add(data);
                app.userView.render();
            },
            error : function (e) {
                console.log(e);             
            }
		});
        
        $('#new-user-form')[0].reset();
        
        return false;
    },
    
    deleteUser : function (event) {
		var id = event.currentTarget.id;
		id = id.charAt(id.length-1);

		var user = _.find(app.userView.coll.models, function(obj) {
			console.log(id);
			if (obj.id == id) {
                return obj;
            }
        });
		
		user.destroy({               
            success: function (data) {  
				console.log(data);
				app.userView.coll.remove(data);
                app.userView.render();
            },
            error : function (e) {
                console.log(e);             
            }
		});
		
	},
    
    events: {
         "click #newUserBtn" : "newUser",
         "click .delete-link" : "deleteUser"
  }
});
