const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = async (req, res, next) => {
  try {
    let token = req.cookies['x-access-token'] || req.headers['x-access-token'];

    if (token) {
      const decoded = jwt.verify(token, config.TOKEN_SECRET);
      req.session.token = decoded;

      next();
    } else {
      return res.json({ msg: 'no such token' });
    }
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
};

module.exports = verifyToken;
