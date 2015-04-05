Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('boards');
  }
});

Router.route('/', {
  name: 'boardsList'
});


Router.route('/boards/new', {
  name: 'boardCreate'
});
Router.route('/boards/:_id', {
  name: 'boardPage',
  waitOn: function() {
    return Meteor.subscribe('columns', this.params._id);
  },
  data: function() {
    return Boards.findOne(this.params._id);
  }
});
Router.route('/boards/:_id/edit', {
  name: 'boardEdit',
  data: function() {
    return Boards.findOne(this.params._id);
  }
});

// TODO: not a good solution to pass board id. -- 03/29/2015
Router.route('/boards/:_id/columns/new', {
  name: 'columnCreate',
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
  only: 'boardCreate'
});
Router.onBeforeAction(requireLogin, {
  only: 'columnCreate'
});