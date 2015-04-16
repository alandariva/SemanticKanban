
Template.StatusItem.onRendered(function () {
    this.$('.ui.dropdown').dropdown();
    $( ".status-columns" ).sortable();
});

Template.StatusItem.events({
    'click #btn-deletar': function (e) {
        e.preventDefault();
        Status.remove(this._id);
    }
});