Boards = new Mongo.Collection('boards');

Boards.allow({
  update: function(userId, board) {
    return ownsDocument(userId, board);
  },
  remove: function(userId, board) {
    return ownsDocument(userId, board);
  },
});


Boards.deny({
  update: function(userId, board, fieldNames) {
    // may only edit the following fields:
    return (_.without(fieldNames, 'name').length > 0);
  }
});

Meteor.methods({
  boardInsert: function(boardAttributes) {
    check(Meteor.userId(), String);
    check(boardAttributes, {
      name: String
    });
    var user = Meteor.user();
    var board = _.extend(boardAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    var boardId = Boards.insert(board);
    return {
      _id: boardId
    };
  }
});