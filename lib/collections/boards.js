Boards = new Mongo.Collection('boards');

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