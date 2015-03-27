Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return [
    Meteor.subscribe('boards'),
    Meteor.subscribe('columns')
  ]; }
});

Router.route('/', {name: 'boardsList'});

Router.route('/boards/new', {name: 'createBoard'});
Router.route('/boards/:_id/columns/new', {
  name: 'createColumn',
  data: function() { return Boards.findOne(this.params._id); }
});

Router.route('/boards/:_id', {
  name: 'boardPage',
  data: function() { return Boards.findOne(this.params._id); }
});

// Router.onBeforeAction('dataNotFound', {only: 'postPage'});
