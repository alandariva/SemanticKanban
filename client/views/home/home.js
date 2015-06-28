
Template.StatusItem.onRendered(function () {
    this.$('.ui.dropdown').dropdown();
    $( ".status-columns" ).sortable();
});

Template.TarefaItem.helpers({
  usuarioNome: function() {
    return Meteor.user().profile.nome;
  }
});

Template.StatusItem.events({
    'click #btn-criar-tarefa': function (e) {
        e.preventDefault();

        $('#modal-nova-tarefa').modal({
            detachable:false,
            selector    : {
                close    : '.close',
                approve  : '',
                deny     : ''
            }
        }).modal('show');

        $('#btn-confirmar-tarefa').html('Salvar');
    },
    'click #btn-deletar-status': function (e) {
        e.preventDefault();
        Status.remove(this._id);
    },
    'click #btn-editar-status': function (e) {
        e.preventDefault();

        $('#modal-novo-status').modal({
            detachable:false,
            selector    : {
                close    : '.close',
                approve  : '',
                deny     : ''
            }
        }).modal('show');

        $('#btn-confirmar-status').html('Salvar');

        var nomeField = $('#modal-novo-status input[name=nome]');
        var status = Status.findOne({_id: this._id});

        nomeField.val(status.nome);
        $('#modal-novo-status input[name=_id]').val(this._id);
    },
    'click .card' : function(e) {
        $('#historico-tarefa').modal('show')
    }
});

Template.Home.events({
    'click #btn-confirmar-tarefa': function (e) {
        e.preventDefault();

        var tarefaField = $('#modal-nova-tarefa input[name=tarefa]');
        var descricaoField = $('#modal-nova-tarefa input[name=descricao]');

        var status = Status.findOne({_id: this._id});

        var tarefas = status.tarefas;
        if(tarefas == undefined) {
            tarefas = [{tarefa: tarefaField.val() , descricao: descricaoField.val()}];
        } else {
            tarefas.push({tarefa: tarefaField.val() , descricao: descricaoField.val()});
        }

        Status.update({
            _id: status._id
        }, {
            tarefas: tarefas
        });

        $('#modal-nova-tarefa').modal('hide');
    },
    'click #btn-fechar-modal-nova-tarefa': function (e) {
        e.preventDefault();

        $('#modal-nova-tarefa').modal('hide');
    },
    'click #btn-confirmar-status': function (e) {
        e.preventDefault();

        var nomeField = $('#modal-novo-status input[name=nome]');
        var idField = $('#modal-novo-status input[name=_id]');

        if (idField.val().length > 0) {
            Status.update({
                _id: idField.val()
            }, {
                nome: nomeField.val()
            });
        } else {
            Status.insert({
                nome: nomeField.val()
            });
        }

        $('#modal-novo-status').modal('hide');
    },
    'click #btn-fechar-modal-novo-status': function (e) {
        e.preventDefault();

        $('#modal-novo-status').modal('hide');
    },
    'click #btn-novo-status': function (e) {
        $('#modal-novo-status').modal({
            detachable:false,
            selector    : {
                close    : '.close',
                approve  : '',
                deny     : ''
            }
        }).modal('show');

        $('#modal-novo-status input[name=_id]').val('');
        $('#modal-novo-status input[name=nome]').val('');
        $('#btn-confirmar-status').html('Criar');
    },
    'mouseover .icon': function(e) {
    }
});

Template.Home.helpers({
    emailUsuario: function () {

        return Meteor.user().emails[0].address;
    },
    status: function() {
        return Status.find({});
    }
});

Template.Home.onRendered(function () {
    console.log(this.$('.status'));
});
