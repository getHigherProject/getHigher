const { db } = require('../envVars');

const jobsToApplicants = {};

jobsToApplicants.create = async (jobToApplicantObj) => {
  try {
    const {
      job_id,
      applicant_id
    } = jobToApplicantObj;

    const createQuery = `
      INSERT INTO jobs_to_applicants
        ( job_id, applicant_id )
        VALUES ( $1, $2 )
        RETURNING *;
    `;

    const res = await db.query(
      createQuery,
      [ job_id, applicant_id ]
    );

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

jobsToApplicants.getById = async (id) => {
  try {
    const idQuery = `
      SELECT j.*, a.*, jta._id as _id
      FROM jobs_to_applicants jta
        JOIN jobs j ON j._id=jta.job_id
        JOIN applicants a ON a._id=jta.applicant_id
      WHERE jta._id=$1;
    `;

    const res = await db.query(idQuery, [ id ]);

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

jobsToApplicants.getAllByJobId = async (id) => {
  try {
    const jobIdQuery = `
      SELECT j.*, a.*, jta._id as _id
      FROM jobs_to_applicants jta
        JOIN jobs j ON j._id=jta.job_id
        JOIN applicants a ON a._id=jta.applicant_id
      WHERE j._id=$1
      ORDER BY j.title ASC;
    `;

    const res = await db.query(jobIdQuery, [ id ]);

    return res.rows;
  } catch (err) {
    return err;
  }
};

jobsToApplicants.getAllByApplicantId = async (id) => {
  try {
    const applicantIdQuery = `
      SELECT j.*, a.*, jta._id as _id
      FROM jobs_to_applicants jta
        JOIN jobs j ON j._id=jta.job_id
        JOIN applicants a ON a._id=jta.applicant_id
      WHERE a._id=$1
      ORDER BY j.title ASC;
    `;

    const res = await db.query(applicantIdQuery, [ id ]);

    return res.rows;
  } catch (err) {
    return err;
  }
};

jobsToApplicants.getAll = async () => {
  try {
    const allQuery = `
      SELECT j.*, a.*, jta._id as _id
      FROM jobs_to_applicants jta
        JOIN jobs j ON j._id=jta.job_id
        JOIN applicants a ON a._id=jta.applicant_id
      ORDER BY j.title ASC;
    `;

    const res = await db.query(allQuery);

    return res.rows;
  } catch (err) {
    return err;
  }
}

jobsToApplicants.deleteById = async (id) => {
  try {
    const delQuery = `
      DELETE FROM jobs_to_applicants
      WHERE _id=$1
      RETURNING *;
    `;
    const res = await db.query(delQuery, [ id ]);

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

module.exports = { jobsToApplicants };