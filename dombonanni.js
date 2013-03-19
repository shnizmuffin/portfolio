var app = app || {};

// *****************************************
//
// NOTE: Because this entire file makes so many API calls, you should only use one uncommented section at a time.
//
// *****************************************

// Users
app.BehanceUser = new Behance.UserModel({user: 'dombonanni'});

app.BehanceUser.fetch({
	success:function(){
		console.log('WOOF: FETCH SUCCESS');
		app.BehanceUser.getProjects();
		//console.log( app.BehanceUser.attributes.user );
		//console.log( app.BehanceUser.attributes.projects.length );
		//console.log( app.BehanceUser.attributes.first_name );
		
		//var appView = new AppView();
		console.log( app );
	},
	error:function(){
		console.log('BARK: FETCH FAIL');
	}
});

// app.BehanceUser.getProjects();
// app.BehanceUser.getCollections();
// app.BehanceUser.getWips();
// setTimeout(function () {
// 	app.BehanceUser.getNextProjectsPage();
// }, 1000);
//
// setTimeout(function () {
// 	app.BehanceUser.getPreviousProjectsPage();
// }, 2000);


// // Projects

/*

for (var i=0; i < app.BehanceUser.attributes.projects.length; i++) {

	app.BehanceProject = new Behance.ProjectModel({id: 5741605});
	app.BehanceProject.fetch({
		success:function(){
			var appView = new AppView();
		}
	});

}; */

// app.BehanceProject.getComments();
//
// setTimeout(function () {
// 	app.BehanceProject.getNextCommentsPage();
// }, 1000);
//
// setTimeout(function () {
// 	app.BehanceProject.getPreviousCommentsPage();
// }, 2000);


// Wips
// app.BehanceWip = new Behance.WipModel({id: 73});
// app.BehanceWip.fetch();
// app.BehanceWip.getRevision(281);


// // Search
// app.SearchResults = new Behance.SearchCollection();
// app.SearchResults.sortBy('appreciations');


// // Collections
// app.BehanceCollection = new Behance.CollectionModel({id: 9866});
// app.BehanceCollection.fetch();
// app.BehanceCollection.getProjects();

var NavItem = Backbone.Model.extend({
	defaults: {
		item_category: 'Web Design',
		item_title: 'Untitled Project'
	}
});

var NavList = Backbone.Collection.extend({
	model: NavItem
});

var NavItemView = Backbone.View.extend({
	el: $('#nav_item_container'),

	initialize: function(){
	},

	render: function(){
		var template = _.template( $("#nav_item_template").html());
		this.$el.html( template );
	}
});

var NavView = Backbone.View.extend({

	el: $('#nav_container'),

	events: {
		'click .btn': 'loadPortfolioItem'
	},

	initialize: function(){
		_.bindAll(this, 'render', 'loadPortfolioItem');

		this.collection = app.BehanceUser.attributes.projects;

		this.render();
	},

	render: function(){
		
		_(this.collection.models).each(function(item){

			var variables = {
			item_title: item.get('name'),
			item_category: 'butts'
			}

			var template = _.template( $("#nav_item_template").html(), variables );
			this.$el.append( template );

		}, this)

	},

	loadPortfolioItem: function(){
		console.log('LOADING.')
	}



});

var AppView = Backbone.View.extend({

	el: $('#portfolio_container'),

    initialize: function (){
        this.render();
    },
    render: function (){
    	
    	var variables = {
    		item_title: app.BehanceUser.attributes.projects.models[0].attributes.name,
    		item_description: app.BehanceUser.attributes.projects.models[0].attributes.id,
    		item_cover: app.BehanceUser.attributes.projects.models[0].attributes.covers[404]
    	};

		var template = _.template( $("#portfolio_item_template").html(), variables );
		this.$el.html( template );
    	
    }
});