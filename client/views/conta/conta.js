Template.contaLogin.events({
	'click #btn': function(e) {
		e.preventDefault();
		Router.go('/conta/nova');
	}
});

Template.contaNova.events({
	'click #registrar': function(event) {
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
	'submit form': function(event) {
		event.preventDefault();

		var dados = {
			email: event.target.email.value,
			password: event.target.senha.value
		};

		Accounts.createUser(dados, function(err) {
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

Template.Home.helpers({
	  emailUsuario: function () {
	    return Meteor.user().emails[0].address;
	  }
});