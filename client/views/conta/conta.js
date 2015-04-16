
Status = new Mongo.Collection("status");

Template.contaLogin.events({
    'click #btn': function (e) {
        e.preventDefault();
        Router.go('/conta/nova');
    }
});

Template.contaNova.events({
    'click #registrar': function (event) {
        event.preventDefault();

        var form = $(event.target).closest('form');
        form.submit();

        /*
         
         var dados = {
         email: $(this).closest('form').val(),
         password: event.target.senha.value
         };
         
         Accounts.createUser(dados, function(err) {
         if (err)
         console.log(err);
         else
         console.log('success!');
         });
         */
    },
    'submit form': function (event) {
        event.preventDefault();

        var dados = {
            email: event.target.email.value,
            password: event.target.senha.value
        };

        Accounts.createUser(dados, function (err) {
            if (err) {
                $('.ui.modal')
                        .modal('show')
                        .find('.description').html(err)
                        ;
            }
            else
                Router.go('/');
        });
    }
});

Template.Home.events({
    'click #btn-criar-status': function (e) {
        e.preventDefault();
        
        var nomeField = $('#modal-novo-status input[name=nome]');
        
        Status.insert({
            nome: nomeField.val()
        });
        
        nomeField.val('');
        
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
    },
    'mouseover .icon': function(e) {
        
//        $( ".status" ).sortable({
//            connectWith: ".status",
//            handle: ".portlet-header",
//            cancel: ".portlet-toggle",
//            placeholder: "portlet-placeholder ui-corner-all"
//          });
//        $(e.target).closest('.status').draggable({ handle: ".move", axis: 'x' });
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
