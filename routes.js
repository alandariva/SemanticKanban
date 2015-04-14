

Router.route('/', {
	controller: 'HomeController',
});

Router.route('/home', {
	controller: 'HomeController',
});

Router.route('/login', {
	controller: 'ContaController',
	action: 'login'
});

Router.route('/conta/nova', {
	controller: 'ContaController',
	action: 'nova'
});


Router.route('/conta/logout', {
	controller: 'ContaController',
	action: 'logout'
});

Router.route('/posts', {
	controller: 'PostController',
	action: 'index'
});

Router.route('/posts/:_id', {
	controller: 'PostController',
	action: 'show'
});
