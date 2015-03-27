Columns = new Mongo.Collection('columns');

Columns.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !!userId;
  }
});