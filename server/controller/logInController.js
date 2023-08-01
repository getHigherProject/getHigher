const companies = require('../models/companyModel');
const applicants = require('../models/applicantModel');
const bcrypt = require('bcrypt');

const loginController = {};

loginController.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const isApplicant = await applicants.getByEmail({ email });

    const isCompany = await companies.getByEmail({ email });

    if (isApplicant) {
      const isPass = await bcrypt.compare(password, isApplicant.password);
      if (isPass) {
        res.locals.applicant = isApplicant;
      }
    }

    if (isCompany) {
      const isPass = await bcrypt.compare(password, isCompany.password);
      if (isPass) {
        res.locals.company = isCompany;
      }
    }

    return next();
  } catch (error) {
    console.error('Error logging in:', error);
    next(error);
  }
};

module.exports = loginController;
