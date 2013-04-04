var app = app || {};

app.UserView = Backbone.View.extend({
   
    initialize: function () {
        this.coll = new app.UserCollection();
        this.coll.on('sync', this.loaded, this);
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
                }));  
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
                console.log(error);         
            }
        });
    },
    loaded : function (collection) {       
        this.render();
    },
    
    newUser : function () {
       
        var newName =  $('#nameField').val();
        var newIsActive;
        if ($('#isActive:checked').val()) {
			newIsActive = true;
		} else {
			newIsActive = false;
		}
        var newUser = new app.User();
        newUser.set({id : "NEW", name : newName, isActive : newIsActive});
        newUser.save({}, {            
            success: function (data) {
				newUser.set("id", data.id);  
				app.userView.coll.add(newUser);
                app.userView.show();
            },
            error : function (e) {
                console.log(e);             
            }
		});
        
        $('#new-user-form')[0].reset();
        
        return false;
    },
    
    deleteUser : function (event) {
        
        //Reset url
         if ($('#showActive:checked').val()) {
            app.userView.coll.url = "http://127.0.0.1:3000/users"
         }
        
		var id = event.currentTarget.id;
		id = id.charAt(id.length-1);

		var user = _.find(app.userView.coll.models, function(obj) {
			if (obj.id == id) {
                return obj;
            }
        });
        
		user.destroy({               
            success: function (data) {
				
                app.userView.show();
            },
            error : function (e) {
                console.log(e);            
            }
		});
		
	},
	 editUser : function (event, id) {
        //if called from a click event get id from the event
         if (event) {
             id = event.currentTarget.id;
		      id = id.split("-")[1];
         }
		var user = _.find(app.userView.coll.models, function (obj) {
			if (obj.id == id) {
                return obj;
            }
        });
        $('#editIdField').html(user.get("id"));
        $('#editNameField').val(user.get("name"));
        $('#editIsActive').attr('checked', user.get("isActive"));
		
	},
    saveUser : function (event) {
        
        //Reset url
         if ($('#showActive:checked').val()) {
            app.userView.coll.url = "http://127.0.0.1:3000/users"
         }
        
        var newName, newId, newIsActive, newUser;
        
        newName = $('#editNameField').val();
        newId =   $('#editIdField').html();
        newIsActive;
        
        if ($('#editIsActive:checked').val()) {
			newIsActive = true;
		} else {
			newIsActive = false;
		}
        newUser = _.find(app.userView.coll.models, function(obj) {
            return obj.get("id") == newId;
        });
        newUser.set({name : newName, isActive : newIsActive});
        
        newUser.save({}, {
            success: function (data) {
                app.userView.show();
            },
            error : function (e) {
                console.log(e);
            }
		});
    },
    show : function (event) {
        if ($('#showActive:checked').val()) {
            app.userView.coll.showActive();
        } else {
            app.userView.coll.showAll();
        }
    },
    events: {
        "click #newUserBtn" : "newUser",
        "click #reloadBtn" : "loadAllUsers",
        "click .delete-link" : "deleteUser",
        "click .edit-link" : "editUser",
        "click #showActive" : "show"
    }
});
