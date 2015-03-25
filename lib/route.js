Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('boards'); }
});

Router.route('/', {name: 'boardsList'});

// Router.route('/posts/:_id', {
//   name: 'postPage',
//   data: function() { return Posts.findOne(this.params._id); }
// });

// Router.onBeforeAction('dataNotFound', {only: 'postPage'});
