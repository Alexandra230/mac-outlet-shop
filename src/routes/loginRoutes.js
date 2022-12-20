const UserShema = require('../models/userShema.js');
const CartShema = require('../models/cartShema.js');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const auth = require('../middleware/auth.js');
const items = require('../models/itemsShema.js');
dotenv.config();
let options = {
  expiresIn: 60 * 60,
};
function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, options);
}
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
});
router.post('/signup', urlencodedParser, async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ ok: false, msg: 'Username Password and email are required' });

  if (password.length < 8) {
    return res
      .status(400)
      .json({ ok: false, msg: 'Password should be at least 8 characters long' });
  }

  const user = await UserShema.findOne({ username });
  if (user) return res.status(400).json({ ok: false, msg: 'User already exists' });

  const newUser = new UserShema({ username, email, password });
  // hasing the password
  bcrypt.hash(password, 7, async (err, hash) => {
    if (err) return res.status(400).json({ msg: 'error while saving the password' });

    newUser.password = hash;
    const savedUserRes = await newUser.save();

    if (savedUserRes) return res.status(200).json({ ok: true, msg: 'user is successfully saved' });
  });
});

router.post(`/login`, urlencodedParser, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ ok: false, msg: 'Something missing' });
    }

    const user = await UserShema.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ ok: false, msg: 'User not found' });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (matchPassword) {
      const token = generateAccessToken({ username: req.body.username });
      res.cookie('x-access-token', token, options);

      req.session.token = token;
      return res.setHeader('x-access-token', token).status(200).json({
        ok: true,
        msg: 'You have logged in successfully',
        userId: user._id,
        token: token,
      });
    } else {
      return res.status(400).json({ ok: false, msg: 'Invalid credential' });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/cards', auth, async (req, res) => {
  res.status(200);
  res.send(
    await items
      .find((err, data) => {
        return data;
      })
      .clone(),
  );
});

router.get('/name', auth, async (req, res) => {
  let valueName = req.query.name;

  const item = await items.find({ name: { $regex: valueName } });

  if (!item) {
    res.status(404).send({
      message: 'item is not found',
    });
  } else {
    res.json(item);
  }
});

router.get('/cart', async (req, res) => {
  let userId = req.query.cart;
  const cart = await CartShema.findOne({ userId: userId });

  if (cart) {
    res.status(200).send({ msg: 'cart', cart });
  } else {
    const newCart = new CartShema({ userId });

    const savedUserRes = await newCart.save();

    if (savedUserRes) res.status(200).send({ ok: true, msg: 'user cart is successfully saved' });
  }
});

module.exports = router;
