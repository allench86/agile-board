Template.boardEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentBoardId = this._id;

    var boardProperties = {
      name: $(e.target).find('[name=name]').val(),
    }

    var errors = validateBoard(boardProperties);
    if (errors.name) {
      return Session.set('boardEditErrors', errors);
    }

    Boards.update(currentBoardId, {
      $set: boardProperties
    }, function(error) {
      if (error) {
        return throwError(error.reason);
      } else {
        Router.go('boardPage', {
          _id: currentBoardId
        });
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this board?")) {
      var currentBoardId = this._id;
      Boards.remove(currentBoardId);
      Router.go('boardsList');
    }
  }
});

Template.boardEdit.created = function() {
  Session.set('boardEditErrors', {});
};

Template.boardEdit.helpers({
  errorMessage: function(field) {
    return Session.get('boardEditErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('boardEditErrors')[field] ? 'has-error' : '';
  }
});