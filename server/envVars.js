const { Pool } = require('pg');
const PG_URI =
	'postgres://hjvoycry:qkhROnLga40l3CNoTB9a1bpCW7GjnVQl@mahmud.db.elephantsql.com/hjvoycry';

const db = new Pool({
	connectionString: PG_URI,
});

db.on('connect', () => {
	console.log('Connected to the database!');
});

db.on('error', (err) => {
	console.error('Error connecting to the database:', err);
});

module.exports = { db };
