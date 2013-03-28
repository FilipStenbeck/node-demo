var app = app || {};

app.DataRouter = Backbone.Router.extend({
	  
    /*   Show 10 items  if page is called with /#load10 
         Show 23 items if called with /#load/23  
    */
    
    routes: {
          "load10" : "load10",
          "denialOfService" : "load5000",
         "load/:amount": "load"
    },
    load10 : function() {
       app.dataView.loadData(10);
    },
    load5000 : function() {
        app.dataView.loadData(5000);
     },
    load : function (amount) {
        app.dataView.loadData(amount);
    }
});