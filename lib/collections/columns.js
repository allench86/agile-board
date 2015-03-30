Columns = new Mongo.Collection('columns');

Columns.allow({
  update: function(userId, column) {
    return ownsDocument(userId, column);
  },
  remove: function(userId, column) {
    return ownsDocument(userId, column);
  },
});

Columns.deny({
  update: function(userId, column, fieldNames) {
    // may only edit the following fields:
    return (_.without(fieldNames, 'name').length > 0);
  }
});

Columns.deny({
  update: function(userId, column, fieldNames, modifier) {
    var errors = validateColumn(modifier.$set);
    return errors.name;
  }
});

Meteor.methods({
  columnInsert: function(columnAttributes) {
    check(Meteor.userId(), String);
    check(columnAttributes, {
      boardId: String,
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

validateColumn = function(column) {
  var errors = {};
  if (!column.name) {
    errors.name = "Please fill in a name";
  }
  return errors;
}