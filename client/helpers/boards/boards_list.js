Template.boardsList.helpers({
  boards: function() {
    return Boards.find({}, {
      sort: {
        submitted: -1
      }
    });
  }
})