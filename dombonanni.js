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
		console.log( app.BehanceUser.attributes.user );
		console.log( app.BehanceUser.attributes.projects.length );
		console.log( app.BehanceUser.attributes.first_name );
		console.log( app.BehanceUser.attributes.last_name );
	},
	error:function(){
		console.log('BARK: FETCH FAIL');
	}
});

 app.BehanceUser.getProjects();
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

//for (var poop=0; poop < app.BehanceUser.attributes.projects.length; poop++) {

	app.BehanceProject = new Behance.ProjectModel({id: 5741605});
	app.BehanceProject.fetch({
		success:function(){
			var appView = new AppView();
		}
	});

//};
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

var AppView = Backbone.View.extend({
    el: $('#portfolio_container'),

    template: _.template( $('#portfolio_item_template').html()),

    initialize: function (){
        this.render();
    },

    render: function (){
        this.$el.html(this.template({
        	item_title: app.BehanceUser.attributes.projects.length,
        	item_description: app.BehanceProject.attributes.description
        }));
    }
})

