Status = new Mongo.Collection("status");
Tarefas = new Mongo.Collection("tarefas");

Meteor.methods({
    deleteStatus: function (id) {
        Tasks.remove(id);
    }
});
