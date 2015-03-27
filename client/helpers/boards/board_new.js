Template.createBoard.events({
  'submit form': function(e) {
    e.preventDefault();

    var board = {
      name: $(e.target).find('[name=name]').val()
    };

    board._id = Boards.insert(board);
    Router.go('/');
  }
});