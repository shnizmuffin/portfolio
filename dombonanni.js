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

// app.BehanceProject = new Behance.ProjectModel({id: 5741605});
// app.BehanceProject.fetch({
// 	success:function(){
// 		var appView = new AppView();
// 	},

// 	error:function(){
// 		console.log('BARK: Project Fetch Fail')
// 	}

// };

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


var NavList = Backbone.Collection.extend({
	model: app.BehanceUser
});

var NavItemView = Backbone.View.extend({
	//el: $('#nav_item_container'),
	tagName: 'li',
	events: {
		'click .btn': 'loadPortfolioItem'
	},

	initialize: function(){
		_.bindAll(this, 'render', 'loadPortfolioItem');
	},

	render: function(info){
		var variables = info;

		console.log('rendering a NavItemView : ', this);

		//we're just jamming in the categories as css classes, so lets make them look like classes.
		variables.item_category = variables.item_category.toString().toLowerCase().replace(/[ /]/g, '-').replace(/,/g, ' ');

		//console.log(variables.item_category);

		var template = _.template( $("#nav_item_template").html(), variables);
		$(this.el).html( template );

		return this;
	},

	loadPortfolioItem: function(){
		var app_view = new AppView({
			model: new Behance.ProjectModel({id: this.model.get('id')})
		});
		console.log(this.model.get('id'));
	}
});

var NavView = Backbone.View.extend({

	el: $('#nav_container'),

	initialize: function(){
		
		_.bindAll(this, 'render', 'appendItem');

		this.collection = app.BehanceUser.attributes.projects;
		this.render();
	},

	render: function(){
		
		var self = this;

		console.log('rendering a NavView');

		var template = _.template( $("#nav_template").html());
		this.$el.append( template );

		_(this.collection.models).each(function(item){
		
			//console.log(item);
			self.appendItem(item);
			
			},

			this);

	},

	appendItem:function(item){

		var navItemView = new NavItemView({
			model: item
		});

		//console.log('appendItem');
		
		var variables = {
				item_cover: item.get('covers')[404],
				item_id: item.get('id'),
				item_title: item.get('name'),
				item_category: item.get('fields')
				};

		$('#nav_item_container', this.el).append(navItemView.render(variables).el);
		//this.$el.append('<h1 class="alpha">BUTTSLOL</h1>' + );

	}

});

var AppView = Backbone.View.extend({

	el: $('#portfolio_container'),

    initialize: function (){
        //console.log(this.model);

        _.bindAll(this, 'render', 'appendModule');

		var self = this;

		this.model.fetch({
			success:function(){
		 		self.render();
		 		console.log('WOOF: Project Fetch Success : ', self);
		 	},

		 	error:function(){
		 		console.log('BARK: Project Fetch Fail')
		 	}

		});
    },

    render: function (){
    	
    	var variables = {
    		item_description: this.model.get('description'),
    		item_title: this.model.get('name'),
    		item_id: this.model.get('id'),
    		item_category: this.model.get('fields').toString().toLowerCase().replace(/[ /]/g, '-').replace(/,/g, ' ')
    	};

		var template = _.template( $("#portfolio_template").html(), variables );
		this.$el.html( template );

		_(this.model.get('modules')).each(function(item){
				
				//console.log(item.type);

				if(item.type == 'text'){
				 	console.log('text');
				}
				else if(item.type == 'image'){
				 	console.log('image');
				}
				else if(item.type == 'embed'){
					console.log('embed');
				}
				else {
				 	console.log('something else, apparently : '+item.type);
				}
			
			});
    },

    appendModule:function(module){

    	
    }
});