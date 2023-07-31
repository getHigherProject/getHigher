const { db } = require('../envVars.js');

const experiences = {};

experiences.getAll = async () => {
  try {
    const queryAll = `
      SELECT *
      FROM experience
      ORDER BY _id ASC;
    `;

    const res = db.query(queryAll);

    return res.rows;
  } catch (err) {
    return err;
  }
}

module.exports = { experiences };