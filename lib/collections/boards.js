Boards = new Mongo.Collection('boards');

Boards.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !!userId;
  }
});