Status = new Mongo.Collection("status");
Tarefas = new Mongo.Collection("tarefas");
TarefasHistorico = new Mongo.Collection("tarefas_historico");

Meteor.methods({
    deleteStatus: function (id) {
        Tasks.remove(id);
    }
});
