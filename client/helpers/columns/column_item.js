Template.columnItem.helpers({
  ownPost: function() {
    return this.userId === Meteor.userId();
  }
});