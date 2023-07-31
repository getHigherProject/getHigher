const companies = require('../models/companyModel');
const companyController = {};

companyController.createCompany = async (req, res, next) => {
  try {
    const { name, company_email, password } = req.body;

    // const existingCompany = await company.getByEmail(email);
    // if (existingCompany) {
    // 	return res.status(409).json({ error: 'User already exists' });
    // }

    const newCompany = await companies.create({
      name,
      company_email,
      password,
    });
    res.locals.company = newCompany;
    next();
  } catch (error) {
    console.error('Error creating company:', error);
    next(error);
  }
};

module.exports = companyController;
