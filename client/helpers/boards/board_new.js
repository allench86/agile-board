Template.boardCreate.events({
  'submit form': function(e) {
    e.preventDefault();

    var board = {
      name: $(e.target).find('[name=name]').val()
    };

    var errors = validateBoard(board);
    if (errors.name) {
      return Session.set('boardCreateErrors', errors);
    }

    Meteor.call('boardInsert', board, function(error, result) {
      // display the error to the user and abort
      if (error) {
        return throwError(error.reason);
      }

      Router.go('boardPage', {
        _id: result._id
      });
    });
  }
});

Template.boardCreate.created = function() {
  Session.set('boardCreateErrors', {});
};

Template.boardCreate.helpers({
  errorMessage: function(field) {
    return Session.get('boardCreateErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('boardCreateErrors')[field] ? 'has-error' : '';
  }
});