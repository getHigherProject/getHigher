// server/index.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const applicantRouter = require('./routes/applicantRouter');
const companyRouter = require('./routes/companyRouter');
const jobRouter = require('./routes/jobRouter');

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client')));
app.use('/api/jobs', jobRouter)

app.use('/api/applicant', applicantRouter);
app.use('/api/company', companyRouter);

app.use((req, res) =>
	res.status(404).send("This is not the page you're looking for...")
);

app.use((err, _, res, _1) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 500,
		message: { err: 'An error occurred' },
	};
	const errObj = Object.assign({}, defaultErr, err);
	console.log(errObj.log);
	return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
