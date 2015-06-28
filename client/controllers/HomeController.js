HomeController = BaseController.extend({
    requireAuth: true,
    action: function() {
	    this.render('Home');
    }
});
