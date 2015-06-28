Status = new Mongo.Collection("status");

Meteor.methods({
    deleteStatus: function (id) {
        Tasks.remove(id);
    }
});