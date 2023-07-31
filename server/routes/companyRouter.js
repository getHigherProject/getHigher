const express = require('express');

const companyController = require('../controller/companyController');

const router = express.Router();

router.post('/sign-up', companyController.createCompany, (req, res) => {
  return res.status(201).json(res.locals.company);
});

router.patch('/:id', companyController.updateCompany, (req, res) => {
  return res.status(201).json(res.locals.updatedCompany);
});

router.get('/', companyController.getAllCompanies, (req, res) => {
  return res.status(201).json(res.locals.AllCompanies);
});

router.get('/:id', companyController.getCompany, (req, res) => {
  return res.status(201).json(res.locals.company);
});

router.delete('/:id', companyController.deleteCompany, (req, res) => {
  return res.status(201).json(res.locals.deletedCompany);
});

module.exports = router;
