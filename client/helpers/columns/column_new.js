Template.createColumn.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var column = {
      board_id: template.data._id,
      name: $(e.target).find('[name=name]').val()
    };

    Meteor.call('columnInsert', column, function(error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);
      Router.go('boardPage', {
        _id: template.data._id
      });
    });
  }
});