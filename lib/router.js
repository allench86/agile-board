Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [
      Meteor.subscribe('boards'),
      Meteor.subscribe('columns')
    ];
  }
});

Router.route('/', {
  name: 'boardsList'
});

Router.route('/boards/:_id/show', {
  name: 'boardPage',
  data: function() {
    return Boards.findOne(this.params._id);
  }
});
Router.route('/boards/new', {
  name: 'createBoard'
});
Router.route('/boards/:_id/edit', {
  name: 'boardEdit',
  data: function() {
    return Boards.findOne(this.params._id);
  }
});

// TODO: not a good solution to pass board id. -- 03/29/2015
Router.route('/boards/:_id/columns/new', {
  name: 'createColumn',
  data: function() {
    return Boards.findOne(this.params._id);
  }
});

Router.route('/columns/:_id/edit', {
  name: 'columnEdit',
  data: function() {
    return Columns.findOne(this.params._id);
  }
});

var requireLogin = function() {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {
  only: ['boardPage', 'boardEdit']
});
Router.onBeforeAction(requireLogin, {
  only: 'createBoard'
});
Router.onBeforeAction(requireLogin, {
  only: 'createColumn'
});