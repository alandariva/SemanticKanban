Template.contaLogin.onRendered(function(){
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
      inline : true,
      on     : 'blur'
  });
})

Template.contaLogin.events({
	'click #btn': function(e) {
		e.preventDefault();
		Router.go('/conta/nova');
	}
});

Template.contaNova.onRendered(function(){

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
      inline : true,
      on     : 'blur'
  })
});

Template.contaNova.events({
	'click #registrar': function(event) {
		event.preventDefault();

		var form = $(event.target).closest('form');
		form.submit();
		
	},
	'submit form': function(event) {
		event.preventDefault();

		var dados = {
			email: event.target.email.value,
			password: event.target.senha.value
		};

		Accounts.createUser(dados, function(err) {

			$('.success.message').fadeIn();

			setTimeout(function() {

				$('.success.message').fadeOut();
				Router.go('/posts/');
			}, 3500);

			// if (err) {
			// 	$('.ui.modal')
			// 	  .modal('show')
			// 	  .find('.description').html(err)
			// 	;
			// }
			// else
			// 	Router.go('/');
		});
	}
});

Template.Home.helpers({
	  emailUsuario: function () {
	    return Meteor.user().emails[0].address;
	  }
});