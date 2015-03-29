Template.boardEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentBoardId = this._id;

    var boardProperties = {
      name: $(e.target).find('[name=name]').val(),
    }

    Boards.update(currentBoardId, {
      $set: boardProperties
    }, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
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