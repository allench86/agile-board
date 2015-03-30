Template.boardPage.helpers({
  columns: function() {
    return Columns.find({
      boardId: this._id
    });
  }
})