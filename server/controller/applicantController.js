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
		next();
	} catch (error) {
		console.error('Error creating applicant:', error);
		next(error);
	}
};

module.exports = applicantController;
