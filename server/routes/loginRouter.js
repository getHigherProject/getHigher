const express = require('express');

const router = express.Router();

router.post('/',
  (_, res) => {
    return res
      .status(200)
      .json(res.locals.user);
  }
);

router.post('/company/',
  (_, res) => {
    return res
      .status(201)
      .json(res.locals.company);
  }
);

