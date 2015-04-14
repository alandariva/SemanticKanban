PostController = BaseController.extend({
    requireAuth: false,
    show: function() {
        this.render('PostShow');
    },
    index: function() {
        this.render('PostIndex');
    }
});