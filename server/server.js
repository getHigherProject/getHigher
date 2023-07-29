// server/index.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.resolve(__dirname, '../client')));

app.get('/', (req, res) => {
	res.send('hello world: Your server is running');
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
