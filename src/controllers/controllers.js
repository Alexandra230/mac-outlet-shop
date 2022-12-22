const UserShema = require('../models/userShema.js');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const items = require('../models/itemsShema.js');
dotenv.config();
function generateAccessToken(username) {
  let options = {
    expiresIn: 60 * 60,
  };
  return jwt.sign(username, process.env.TOKEN_SECRET, options);
}
module.exports.signUp = async function (req, res) {
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
};
module.exports.logIn = async function (req, res) {
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
};
module.exports.showCards = async function (req, res) {
  res.status(200);
  res.send(
    await items
      .find((err, data) => {
        return data;
      })
      .clone(),
  );
};
module.exports.findCard = async function (req, res) {
  let valueName = req.query.name;

  const item = await items.find({ name: { $regex: valueName } });

  if (!item) {
    res.status(404).send({
      message: 'item is not found',
    });
  } else {
    res.json(item);
  }
};
