
Template.contaLogin.onRendered(function () {
    $('#login').form({
        usuario: {
            identifier: 'usuario',
            rules: [
                {
                    type: 'email',
                    prompt: 'Por favor, informe um e-mail válido.'
                }
            ]
        },
        senha: {
            identifier: 'senha',
            rules: [
                {
                    type: 'empty',
                    prompt: 'Por favor, informe a Senha'
                },
                {
                    type: 'length[6]',
                    prompt: 'Sua senha deve possuir pelo menos 6 caracteres'
                }
            ]
        }
    },
    {
        inline: true,
        on: 'blur'
    });
})

Template.contaLogin.events({
    'click #btn-registrar': function (e) {
        e.preventDefault();
        Router.go('/conta/nova');
    },
    'submit #login': function (e) {
        e.preventDefault();

        Meteor.loginWithPassword(
                $('input[name="usuario"]').val(),
                $('input[name="senha"]').val(),
                function (erro) {
                    if (typeof erro == 'undefined') {
                        Router.go('/');
                    } else {
                        alert(erro.message);
                    }
                }
        );

    }
});

Template.contaNova.onRendered(function () {

    $('#novo').form({
        nome: {
            identifier: 'nome',
            rules: [
                {
                    type: 'empty',
                    prompt: 'Por favor, informe um nome válido.'
                }
            ]
        },
        email: {
            identifier: 'email',
            rules: [
                {
                    type: 'email',
                    prompt: 'Por favor, informe um e-mail válido.'
                }
            ]
        },
        senha: {
            identifier: 'senha',
            rules: [
                {
                    type: 'empty',
                    prompt: 'Por favor, informe a Senha'
                },
                {
                    type: 'length[6]',
                    prompt: 'Sua senha deve possuir pelo menos 6 caracteres'
                }
            ]
        }
    },
    {
        inline: true,
        on: 'blur'
    })
});

Template.contaNova.events({
    'click #registrar': function (event) {
        event.preventDefault();

        var form = $(event.target).closest('form');
        form.submit();

    },
    'submit form': function (event) {
        event.preventDefault();

        var dados = {
            email: event.target.email.value,
            password: event.target.senha.value,
            profile: {
                nome: event.target.nome.value,
                avatar: Math.floor((Math.random() * 11) + 1)
            }
        };

        Accounts.createUser(dados, function (err) {

            $('.success.message').fadeIn();

            setTimeout(function () {

                $('.success.message').fadeOut();
                Router.go('/');
            }, 3500);
        });
    }
});
