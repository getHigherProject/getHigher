const express = require('express');

const applicantController = require('../controller/applicantController');

const router = express.Router();

router.post('/sign-up', applicantController.createApplicant, (req, res) => {
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
  return res.status(201).json(res.locals.deletedAapplicant);
});

module.exports = router;
