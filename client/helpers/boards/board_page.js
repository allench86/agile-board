Template.boardPage.helpers({
  columns: function() {
    return Columns.find({board_id: this._id});
  }
})
