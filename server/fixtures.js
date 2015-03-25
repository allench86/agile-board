if (Boards.find().count() === 0) {
  Boards.insert({
    name: 'Introducing Telescope'
  });

  Boards.insert({
    name: 'Meteor'
  });

  Boards.insert({
    name: 'The Meteor Book'
  });
}