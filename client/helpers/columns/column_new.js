Template.columnCreate.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var column = {
      boardId: template.data._id,
      name: $(e.target).find('[name=name]').val()
    };

    var errors = validateColumn(column);
    if (errors.name) {
      return Session.set('columnCreateErrors', errors);
    }

    Meteor.call('columnInsert', column, function(error, result) {
      // display the error to the user and abort
      if (error) {
        return throwError(error.reason);
      }
      Router.go('boardPage', {
        _id: template.data._id
      });
    });
  }
});

Template.columnCreate.created = function() {
  Session.set('columnCreateErrors', {});
};

Template.columnCreate.helpers({
  errorMessage: function(field) {
    return Session.get('columnCreateErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('columnCreateErrors')[field] ? 'has-error' : '';
  }
});