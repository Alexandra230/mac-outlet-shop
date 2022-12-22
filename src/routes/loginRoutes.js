const { signUp, logIn, showCards, findCard } = require('../controllers/controllers.js');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const auth = require('../middleware/auth.js');
dotenv.config();

const urlencodedParser = bodyParser.urlencoded({
  extended: false,
});
router.post('/signup', urlencodedParser, signUp);

router.post(`/login`, urlencodedParser, logIn);

router.get('/cards', auth, showCards);

router.get('/name', auth, findCard);

// router.get('/cart', async (req, res) => {
//   let userId = req.query.cart;
//   const cart = await CartShema.findOne({ userId: userId });

//   if (cart) {
//     res.status(200).send({ msg: 'cart', cart });
//   } else {
//     const newCart = new CartShema({ userId });

//     const savedUserRes = await newCart.save();

//     if (savedUserRes) res.status(200).send({ ok: true, msg: 'user cart is successfully saved' });
//   }
// });

module.exports = router;
