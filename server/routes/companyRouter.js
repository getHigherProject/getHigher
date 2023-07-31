const express = require('express');

const companyController = require('../controller/companyController');
const cookieController = require('../controller/cookieController'); 


const router = express.Router();

router.post('/sign-up', companyController.createCompany, (req, res) => {
  res.status(201).json(res.locals.company);
});

module.exports = router;
