// server/index.js
const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const { PG_URI } = require ('./envVars');
// do we want to implement cookies? We will need the package
// const cookieParser = require('cookie-parser');

// We need to link to a postgres DB without displaying it
// I used a envVars.js file that was hidden with .gitignore
// Is this how we want to accomplish this?

const app = express();
const PORT = 3000;
const db = new Pool({
  connectionSTring: PG_URI
});

const loginRouter = require('./routes/loginRouter');
const jobRouter = require ('./routes/jobRouter');

app.use(express.json());
// app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../client')));

app.use('/login', loginRouter);
app.use('/job', jobRouter);

app.use('/', (_, res) => {
  res
    .status(404)
    .send('This page does not exist');
});

app.use((err, _, res, _1) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'Ar error occurred' },
  };
  const errObj = Object.assign({}, defaultErr, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = { db };