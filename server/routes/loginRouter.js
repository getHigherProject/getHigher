const express = require('express');

const router = express.Router();

router.put('/company/:id',
  (_, res) => {
    return res
    .status(201)
    .json(res.locals.company);
  }
);

router.post('/company/',
  (_, res) => {
    return res
    .status(201)
    .json(res.locals.company);
  }
);

router.post('/applicant/:id',
  (_, res) => {
    return res
      .status(200)
      .json(res.locals.applicant);
  }
);

router.post('/applicant/',
  (_, res) => {
    return res
      .status(200)
      .json(res.locals.applicant);
  }
);

router.post('/',
  (_, res) => {
    return res
      .status(200)
      .json(res.locals);
  }
);