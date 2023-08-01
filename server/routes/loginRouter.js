const express = require('express');
// const { route } = require('./applicantRouter');
const loginController = require('../controller/logInController');

const router = express.Router();

router.post('/', loginController.login, (req, res) => {
  return res.status(201).json(res.locals);
});

module.exports = router;
