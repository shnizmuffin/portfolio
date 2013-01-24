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
		console.log('WOOF: FETCH SUCCESS')
		console.log( app.BehanceUser.attributes.user );
		console.log( app.BehanceUser.attributes.id );
		console.log( app.BehanceUser.attributes.first_name );
		console.log( app.BehanceUser.attributes.last_name );
	},
	error:function(){
		console.log('BARK: FETCH FAIL')
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
app.BehanceProject = new Behance.ProjectModel({id: 5741605});
app.BehanceProject.fetch();
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