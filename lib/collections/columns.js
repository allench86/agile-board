Columns = new Mongo.Collection('columns');

Meteor.methods({
  columnInsert: function(columnAttributes) {
    check(Meteor.userId(), String);
    check(columnAttributes, {
      board_id: String,
      name: String
    });
    var user = Meteor.user();
    var column = _.extend(columnAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    var columnId = Columns.insert(column);
    return {
      _id: columnId
    };
  }
});