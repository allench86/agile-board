Template.columnEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentColumnId = this._id;

    var columnProperties = {
      name: $(e.target).find('[name=name]').val(),
    }

    Columns.update(currentColumnId, {
      $set: columnProperties
    }, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Router.go('columnPage', {
          _id: currentColumnId
        });
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this column?")) {
      var currentColumnId = this._id;
      Columns.remove(currentColumnId);
      Router.go('columnsList');
    }
  }
});