ContaController = BaseController.extend({
    login: function() {
        this.render('contaLogin');
    },
    nova: function() {
    	this.render('contaNova');	
    },
    logout: function() {
    	Meteor.logout();
    	Router.go('/');
    }
});