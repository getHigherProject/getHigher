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

companyController.updateCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, company_email, password } = req.body;

    const updatedCompany = await companies.updateById(id, {
      name,
      company_email,
      password,
    });
    res.locals.updatedCompany = updatedCompany;
    return next();
  } catch (error) {
    console.error('Error updating company:', error);
    next(error);
  }
};

companyController.getCompany = async (req, res, next) => {
  try {
    const { id } = req.params;

    const company = await companies.getById(id);
    res.locals.company = company;
    return next();
  } catch (error) {
    console.error('Error getting company:', error);
    next(error);
  }
};

companyController.getAllCompanies = async (req, res, next) => {
  try {
    const AllCompanies = await companies.getAll();
    res.locals.AllCompanies = AllCompanies;
    return next();
  } catch (error) {
    console.error('Error getting applicants:', error);
    next(error);
  }
};

companyController.deleteCompany = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedCompany = await companies.deleteById(id);
    res.locals.deletedCompany = deletedCompany;
    return next();
  } catch (error) {
    console.error('Error deleting company:', error);
    next(error);
  }
};

module.exports = companyController;
