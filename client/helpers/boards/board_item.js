Template.boardItem.helpers({
  ownPost: function() {
    return this.userId === Meteor.userId();
  }
});