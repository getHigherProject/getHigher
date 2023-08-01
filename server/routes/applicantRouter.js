const express = require('express');

const applicantController = require('../controller/applicantController');
const cookieController = require('../controller/cookieController');

const router = express.Router();

router.post('/sign-up', applicantController.createApplicant, cookieController.setSSIDCookie, (req, res) => {
  return res.status(201).json(res.locals.applicant);
});

router.patch('/:id', applicantController.updateApplicant, (req, res) => {
  return res.status(201).json(res.locals.updatedApplicant);
});

router.get('/', applicantController.getAllApplicants, (req, res) => {
  return res.status(201).json(res.locals.allApplicants);
});

router.get('/:id', applicantController.getApplicant, (req, res) => {
  return res.status(201).json(res.locals.applicant);
});

router.delete('/:id', applicantController.deleteApplicant, (req, res) => {
  return res.status(201).json(res.locals.deletedApplicant);
});

module.exports = router;
