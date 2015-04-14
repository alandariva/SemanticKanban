
BaseController = RouteController.extend({
    layoutTemplate: 'AppLayout',
    requireAuth: false,
    onBeforeAction: function() {
        if (this.requireAuth) {
            if (!Meteor.user()) {
                if (Meteor.loggingIn()) {} else {
                    Router.go('login');
                }
            }
        }

        console.log('app before hook!');
        this.next();
    },
    action: function() {
        console.log('this should be overridden!');
    }
});