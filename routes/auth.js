const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   GET api/auth
// @desc     Get logged in user
// @access  Private
// Private 한 동작을 하는 route를 대상으로 호출할 때마다 middleware를 호출해서 토큰을 검사한다.
// 어떻게 DI처럼 동작하는거지 밑에는?
// -> callback으로 호출이 된다. 같은 방식으로 체이닝을 하듯 router('/', test1, test2, test3...) 이런식으로도 쓸 수 있다.
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth
// @desc     Auth user & get token (로그인)
// @access  Public
router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      const payload = {
        user: {
          id: user.id
        }
      }
      await jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600
        },
        async (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
    // res.send('asdf')  // 이게 있으면 이게 자꾸 response 보내는 걸 가로챈다...
  });

module.exports = router;