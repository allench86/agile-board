Meteor.publish('boards', function(){
  return Boards.find();
});

Meteor.publish('columns', function(){
  return Columns.find();
});