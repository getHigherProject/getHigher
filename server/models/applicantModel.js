const { db } = require('../envVars');
const bcrypt = require('bcrypt');

const applicants = {};

const encryptPass = async (password) => {
  const WORK_FACTOR = 10;

  const salt = await bcrypt.genSalt(WORK_FACTOR);
  const encPassword = await bcrypt.hash(password, salt);

  return encPassword;
}

applicants.create = async (applicantObj) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password
    } = applicantObj;
    
    if (!password) {
      throw Error ('You must have a password');
    }
    
    const encPassword = await encryptPass(password);

    const createQuery = `
      INSERT INTO applicants
        ( first_name, last_name, email, password )
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

    const res = await db.query(
      createQuery,
      [ first_name, last_name, email, encPassword ]
    );

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

applicants.getById = async (id) => {
  try {
    const idQuery = `
      SELECT *
      FROM applicants
      WHERE _id=$1;
    `;

    const res = await db.query(idQuery, [ id ]);

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

applicants.getByEmail = async (email) => {
  try {
    const emailQuery = `
      SELECT *
      FROM applicants
      WHERE email=$1;
    `;

    const res = await db.query(emailQuery, [ email ]);

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

applicants.getAll = async () => {
  try {
    const allQuery = `
      SELECT *
      FROM applicants;
    `;

    const res = await db.query(allQuery);

    return res.rows;
  } catch (err) {
    return err;
  }
};

applicants.updateById = async (id, updateObj) => {
  try {
    if (updateObj.password) {
      updateObj.password = encryptPass(updateObj.password);
    }
    const existingData = applicants.getById(id);
    const updateData = Object.assign(existingData, updateObj);
    
    const {
      first_name,
      last_name,
      email,
      password
    } = updateData;

    const updateQuery = `
      UPDATE applicants
      SET ( first_name, last_name, email, password ) = ( $1, $2, $3, $4 )
      WHERE _id=$5
      RETURNING*;
    `;

    const res = await db.query(
      updateQuery,
      [ first_name, last_name, email, password ]
    );

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

applicants.deleteById = async (id) => {
  try {
    const delQuery = `
      DELETE FROM applicants
      WHERE _id=$1
      RETURNING *;
    `;
    const res = await db.query(delQuery, [ id ]);

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

module.exports = { applicants };