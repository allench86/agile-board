Template.columnEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentColumnId = this._id;
    var boardId = this.boardId;

    var columnProperties = {
      name: $(e.target).find('[name=name]').val(),
    }

    var errors = validateColumn(columnProperties);
    if (errors.name) {
      return Session.set('columnEditErrors', errors);
    }

    Columns.update(currentColumnId, {
      $set: columnProperties
    }, function(error) {
      if (error) {
        return throwError(error.reason);
      } else {
        Router.go('boardPage', {
          _id: boardId
        });
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this column?")) {
      var currentColumnId = this._id;
      var boardId = this.boardId;
      Columns.remove(currentColumnId);
      Router.go('boardPage', {
        _id: boardId
      });
    }
  }
});

Template.columnEdit.created = function() {
  Session.set('columnEditErrors', {});
};

Template.columnEdit.helpers({
  errorMessage: function(field) {
    return Session.get('columnEditErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('columnEditErrors')[field] ? 'has-error' : '';
  }
});