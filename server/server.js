// server/index.js
const express = require('express');
const path = require('path');


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client')));

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