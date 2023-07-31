const express = require('express');

const applicantController = require('../controller/applicantController');

const router = express.Router();

router.post('/sign-up', applicantController.createApplicant, (req, res) => {
  res.status(201).json(res.locals.applicant);
});

module.exports = router;
