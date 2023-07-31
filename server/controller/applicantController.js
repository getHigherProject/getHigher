const applicants = require('../models/applicantModel');
const applicantController = {};

applicantController.createApplicant = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // const existingApplicant = await applicants.getByEmail(email);
    // if (existingApplicant) {
    // 	return res.status(409).json({ error: 'User already exists' });
    // }

    const newApplicant = await applicants.create({
      first_name,
      last_name,
      email,
      password,
    });
    res.locals.applicant = newApplicant;
    return next();
  } catch (error) {
    console.error('Error creating applicant:', error);
    next(error);
  }
};

applicantController.updateApplicant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, password } = req.body;

    const updatedApplicant = await applicants.updateById(id, {
      first_name,
      last_name,
      email,
      password,
    });
    res.locals.updatedApplicant = updatedApplicant;
    return next();
  } catch (error) {
    console.error('Error updating applicant:', error);
    next(error);
  }
};

applicantController.getApplicant = async (req, res, next) => {
  try {
    const { id } = req.params;

    const applicant = await applicants.getById(id);
    res.locals.applicant = applicant;
    return next();
  } catch (error) {
    console.error('Error getting applicant:', error);
    next(error);
  }
};

applicantController.getAllApplicants = async (req, res, next) => {
  try {
    const allApplicants = await applicants.getAll();
    res.locals.allApplicants = allApplicants;
    return next();
  } catch (error) {
    console.error('Error getting applicants:', error);
    next(error);
  }
};

applicantController.deleteApplicant = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedAapplicant = await applicants.deleteById(id);
    res.locals.deletedAapplicant = deletedAapplicant;
    return next();
  } catch (error) {
    console.error('Error deleting applicant:', error);
    next(error);
  }
};

module.exports = applicantController;
