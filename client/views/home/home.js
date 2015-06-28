var i = 1;

Template.StatusItem.onRendered(function () {
    this.$('.ui.dropdown').dropdown();
    i = 1;
    // Ordenação dos status
    $( ".status-columns" ).sortable({
        handle: '.move.icon.StatusItem',
        update: function(event, ui) {
            $('.status-column > .status').each(function(i) {
                Status.update({
                    _id: $(this).data('id')
                }, {
                    $set: {
                        ordem: i
                    }
                });
            });
        }
    });
});

Template.TarefaItem.helpers({
    profile: function() {
        return Meteor.users.findOne({ _id: this.usuario_id }).profile;
    }
});


Template.TarefaItem.helpers({
    count: function() {
        return i++;
    }
});


Template.TarefaItem.onRendered(function() {
    $('.lista-tarefas').sortable({
          connectWith: '.lista-tarefas',
          handle: ".task .card",
          update: function(event, ui) {
              if (this === ui.item.parent()[0]) { // Prevenção para update não ser chamado duas vezes
                  $(ui.item).closest('.lista-tarefas').find('.task').each(function (i) {
                      var statusId = $(this).closest('.status').data('id');
                      var tarefa = Tarefas.findOne($(this).data('id'));

                      if (tarefa.status_id != statusId) {
                          TarefasHistorico.insert({
                              tarefa_id: tarefa._id,
                              status_id: statusId
                          });
                      }

                      Tarefas.update({
                          _id: $(this).data('id')
                      }, {
                          $set: {
                              ordem: i,
                              status_id: statusId
                          }
                      });
                  });
              }
          }
    });
});

Template.TarefaItem.events({
    'click .excluir-tarefa': function (e, t) {
        e.preventDefault();
        
        Tarefas.remove(this._id);
    }
});

Template.StatusItem.helpers({
    tarefas: function(e, template) {
        return Tarefas.find({status_id: this._id}, {sort: {ordem: 1}});
    }
})

Template.StatusItem.events({
    // -----------------------
    // ----- Tarefas
    // -----------------------
    'click #btn-criar-tarefa': function (e, t) {
        e.preventDefault();

        $(t.find('.modal-nova-tarefa')).modal({
            detachable:false,
            selector    : {
                close    : '.close',
                approve  : '',
                deny     : ''
            }
        }).modal('show');

        $(t.find('.btn-confirmar-tarefa')).html('Salvar');
    },
    'click .btn-confirmar-tarefa': function (e, t) {
        e.preventDefault();

        var tarefaField = $(t.find('.modal-nova-tarefa input[name=tarefa]'));
        var descricaoField = $(t.find('.modal-nova-tarefa input[name=descricao]'));

        var tarefa = Tarefas.insert({
            tarefa: tarefaField.val(),
            descricao: descricaoField.val(),
            status_id: this._id,
            usuario_id: Meteor.user()._id
        });

        TarefasHistorico.insert({
            tarefa_id: tarefa._id,
            status_id: this._id
        });

        $(t.find('.modal-nova-tarefa')).modal('hide');
    },
    // -----------------------
    // ----- FIM - Tarefas
    // -----------------------

    'click #btn-deletar-status': function (e) {
        e.preventDefault();
        Status.remove(this._id);
    },
    'click #btn-editar-status': function (e, template) {
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
        $('#modal-novo-status input[name=cor][value="' + this.cor + '"]').prop('checked', true);

        $('#modal-novo-status .ui.radio.checkbox')
          .checkbox()
        ;
    },
    'click .card' : function(e) {
        $('#historico-tarefa').modal('show')
    }
});

Template.Home.events({
    'click #btn-confirmar-status': function (e) {
        e.preventDefault();

        var nomeField = $('#modal-novo-status input[name=nome]');
        var idField = $('#modal-novo-status input[name=_id]');
        var cor = $('#modal-novo-status input[name=cor]:checked');

        if (idField.val().length > 0) {
            Status.update({
                _id: idField.val()
            }, {
                $set: {
                    nome: nomeField.val(),
                    cor: cor.val()
                }
            });
        } else {
            Status.insert({
                nome: nomeField.val(),
                cor: cor.val()
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

        $('#modal-novo-status .ui.radio.checkbox')
          .checkbox()
        ;
    },
    'mouseover .icon': function(e) {
    }
});

Template.Home.helpers({
    emailUsuario: function () {
        return Meteor.user().emails[0].address;
    },
    nomeUsuario: function () {
        return Meteor.user().profile.nome;
    },
    status: function() {
        return Status.find({}, {sort: {ordem: 1}});
    }
});

Template.Home.onRendered(function () {
    console.log(this.$('.status'));
});
