const { db } = require('../envVars');

const jobs = {};

jobs.create = async (companyObj) => {
  try {
    const {
      title,
      min_salary,
      max_salary,
      description,
      application_url
    } = companyObj;

    const createQuery = `
      INSERT INTO jobs
        ( title, min_salary, max_salary, description, application_url )
        VALUES ( $1, $2, $3, $4, $5 )
        RETURNING *;
    `;

    const res = await db.query(
      createQuery,
      [ title, min_salary, max_salary, description, application_url ]
    );

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

jobs.getById = async (id) => {
  try {
    const idQuery = `
      SELECT *, e.name as experience, jt.name as job_type, c.name as company
      FROM jobs j
        LEFT JOIN experiences e ON e._id=j.experiences_id
        LEFT JOIN job_types jt ON jt._id=j.job_types_id
        LEFT JOIN companies c ON c._id=j.company_id
      WHERE _id=$1;
    `;

    const res = await db.query(idQuery, [ id ]);

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

jobs.getAllByExperienceId = async (id) => {
  try {
    const experQuery = `
      SELECT *, e.name as experience, jt.name as job_type, c.name as company
      FROM jobs j
        LEFT JOIN experiences e ON e._id=j.experiences_id
        LEFT JOIN job_types jt ON jt._id=j.job_types_id
        LEFT JOIN companies c ON c._id=j.company_id
      WHERE experience_id=$1
      ORDER BY title ASC;
    `;

    const res = await db.query(experQuery, [ id ]);

    return res.rows;
  } catch (err) {
    return err;
  }
};

jobs.getAllByJobTypeId = async (id) => {
  try {
    const jobTypeQuery = `
      SELECT *, e.name as experience, jt.name as job_type, c.name as company
      FROM jobs j
        LEFT JOIN experiences e ON e._id=j.experiences_id
        LEFT JOIN job_types jt ON jt._id=j.job_types_id
        LEFT JOIN companies c ON c._id=j.company_id
      WHERE job_types_id=$1
      ORDER BY title ASC;
    `;

    const res = await db.query(jobTypeQuery, [ id ]);

    return res.rows;
  } catch (err) {
    return err;
  }
};

jobs.getAllByCompanyId = async (id) => {
  try {
    const companyQuery = `
      SELECT *, e.name as experience, jt.name as job_type, c.name as company
      FROM jobs j
        LEFT JOIN experiences e ON e._id=j.experiences_id
        LEFT JOIN job_types jt ON jt._id=j.job_types_id
        LEFT JOIN companies c ON c._id=j.company_id
      WHERE company_id=$1
      ORDER BY title ASC;
    `;

    const res = await db.query(companyQuery, [ id ]);

    return res.rows;
  } catch (err) {
    return err;
  }
}

jobs.getAll = async () => {
  try {
    const allQuery = `
      SELECT *, e.name as experience, jt.name as job_type, c.name as company
      FROM jobs j
        LEFT JOIN experiences e ON e._id=j.experiences_id
        LEFT JOIN job_types jt ON jt._id=j.job_types_id
        LEFT JOIN companies c ON c._id=j.company_id
      ORDER BY _id ASC;
    `;

    const res = await db.query(allQuery);

    return res.rows;
  } catch (err) {
    return err;
  }
}

jobs.updateById = async (id, updateObj) => {
  try {

    const existingData = jobs.getById(id);
    const updateData = Object.assign(existingData, updateObj);
    
    const {
      title,
      min_salary,
      max_salary,
      description,
      application_url,
      closed,
      job_type_id,
      experience_id
    } = updateData;

    const updateQuery = `
      UPDATE jobs
      SET ( title, min_salary, max_salary, description,
        application_url, closed, job_type_id, experience_id ) = 
        ( $1, $2, $3, $4, $5, $6, $7, $8 )
      WHERE _id=$9
      RETURNING *;
    `;

    const res = await db.query(
      updateQuery,
      [ title, min_salary, max_salary, description,
        application_url, closed, job_type_id, experience_id, id ]
    );

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

jobs.deleteById = async (id) => {
  try {
    const delQuery = `
      DELETE FROM jobs
      WHERE _id=$1
      RETURNING *;
    `;
    const res = await db.query(delQuery, [ id ]);

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

module.exports = { applicants: jobs };