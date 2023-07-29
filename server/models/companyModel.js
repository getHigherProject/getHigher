const { db } = require('../envVars');
const bcrypt = require('bcrypt');

const companies = {};

const encryptPass = async (password) => {
  const WORK_FACTOR = 10;

  const salt = await bcrypt.genSalt(WORK_FACTOR);
  const encPassword = await bcrypt.hash(password, salt);

  return encPassword;
}

companies.create = async (companyObj) => {
  try {
    const {
      name,
      company_email,
      password
    } = companyObj;
    
    if (!password) {
      throw Error ('You must have a password');
    }
    
    const encPassword = await encryptPass(password);

    const createQuery = `
      INSERT INTO companies
        ( first_name, last_name, email, password )
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

    const res = await db.query(
      createQuery,
      [ name, company_email, encPassword ]
    );

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

companies.getById = async (id) => {
  try {
    const idQuery = `
      SELECT *
      FROM companies
      WHERE _id=$1;
    `;

    const res = await db.query(idQuery, [ id ]);

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

companies.getByEmail = async (email) => {
  try {
    const emailQuery = `
      SELECT *
      FROM companies
      WHERE company_email=$1;
    `;

    const res = await db.query(emailQuery, [ email ]);

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

companies.getAll = async () => {
  try {
    const allQuery = `
      SELECT *
      FROM companies
      ORDER BY name ASC;
    `;

    const res = await db.query(allQuery);

    return res.rows;
  } catch (err) {
    return err;
  }
};

companies.updateById = async (id, updateObj) => {
  try {
    if (updateObj.password) {
      updateObj.password = encryptPass(updateObj.password);
    }
    const existingData = companies.getById(id);
    const updateData = Object.assign(existingData, updateObj);
    
    const {
      name,
      company_email,
      password
    } = updateData;

    const updateQuery = `
      UPDATE companies
      SET ( name, company_email, password ) = ( $1, $2, $3 )
      WHERE _id=$4
      RETURNING*;
    `;

    const res = await db.query(
      updateQuery,
      [ name, company_email, password, id ]
    );

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

companies.deleteById = async (id) => {
  try {
    const delQuery = `
      DELETE FROM companies
      WHERE _id=$1
      RETURNING *;
    `;
    const res = await db.query(delQuery, [ id ]);

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

module.exports = { applicants: companies };