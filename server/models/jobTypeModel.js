const { db } = require('../envVars.js');

const job_types = {};

job_types.getAll = async () => {
  try {
    const queryAll = `
      SELECT *
      FROM job_types
      ORDER BY _id ASC;
    `;

    const res = db.query(queryAll);

    return res.rows;
  } catch (err) {
    return err;
  }
}

module.exports = job_types;