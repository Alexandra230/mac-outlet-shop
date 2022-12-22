// Set up mongoose connection
require('dotenv').config();
const mongoose = require('mongoose');

function mongooseConnect() {
  const mongoDB = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.DBCLUSTER}/?retryWrites=true&w=majority`;
  mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  console.log('db is connected');
}
module.exports = mongooseConnect;
