// Set up mongoose connection
const mongoose = require('mongoose');
const username = encodeURIComponent('sasha5l239');
const password = encodeURIComponent('6BSsfHtIpa8raMQB');
const cluster = 'cluster0.9aosbft.mongodb.net';

function mongooseConnect() {
  const mongoDB = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;
  mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  console.log('db is connected');
}
module.exports = mongooseConnect;
