Template.createColumn.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var column = {
      board_id: template.data._id,
      name: $(e.target).find('[name=name]').val()
    };

    column._id = Columns.insert(column);
    Router.go('boardPage', {_id: template.data._id});
  }
});