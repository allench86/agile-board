Template.createBoard.events({
  'submit form': function(e) {
    e.preventDefault();

    var board = {
      name: $(e.target).find('[name=name]').val()
    };

    Meteor.call('boardInsert', board, function(error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);

      Router.go('boardPage', {
        _id: result._id
      });
    });
  }
});