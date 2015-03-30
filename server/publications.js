Meteor.publish('boards', function() {
  return Boards.find();
});


Meteor.publish('columns', function(boardId) {
  check(boardId, String);
  return Columns.find({
    boardId: boardId
  });
});