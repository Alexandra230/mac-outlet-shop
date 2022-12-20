const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const mongooseConnect = require('./connection/mongoDB.js');
const loginRouter = require('./routes/loginRoutes.js');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MAX_AGE = 1000 * 60 * 60 * 3; // 3hrs

const username = encodeURIComponent('sasha5l239');
const password = encodeURIComponent('6BSsfHtIpa8raMQB');
const cluster = 'cluster0.9aosbft.mongodb.net';

const app = express();
const host = 'localhost';
const port = '8000';

const corsOptions = {
  origin: 'http://127.0.0.1:5501',
  optionsSuccessStatus: 200,
};

mongoose.Promise = global.Promise;
mongooseConnect();
// mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`, {
//   useNewUrlParser: true,
// });

const mongoDBstore = new MongoDBStore({
  uri: `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`,
  collection: 'userSessions',
});

app.use(
  session({
    secret: 'a1s2d3f4g5h6',
    name: 'session-id',
    store: mongoDBstore,
    cookie: {
      maxAge: MAX_AGE,
      sameSite: false,
      secure: false,
    },
    resave: true,
    saveUninitialized: false,
  }),
);

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/users', loginRouter);
app.use(express.static(__dirname));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.listen(process.env.PORT || port, function () {
  console.log(`Server listens http://${host}:${port}`);
});

module.exports = app;
