const { jobsToApplicants } = require ('../../server/models/jobToApplicantModel');
const { db } = require('../../server/envVars');

describe('Postgres companies table unit tests', () => {
  // this gets set in the beforeAll
  // and the company_id will be used to clean up the DB after testing
  let company_id;
  const jobToApplicantObj = {
    job_id: undefined,
    applicant_id: undefined
  };

  // this gets set in the first test
  let id;

  beforeAll(async () => {
    const applicantObj = {
      first_name: 'firstname',
      last_name: 'lastname',
      email: 'testjtaapplicant@email.com',
      password: 'abc123'
    };
    // here we use job_type and experience as 1
    // since we are only going to check creating and
    // deleting this many-to-many link
    // we do have to create a company_id since
    // it has a foreign key and we don't want to reference
    // an actual company
    const jobObj = {
      title: 'testTitle',
      min_salary: 100,
      max_salary: 500,
      description: 'Test Description',
      application_url: 'http://test.com',
      experience_id: 1,
      job_type_id: 1,
      company_id: undefined,
    }
    const companyObj = {
      name: 'test Company',
      company_email: 'testjtacompany@email.com',
      password: 'abc123'
    };

    const createCompanyQuery = `
      INSERT INTO companies
        (name, company_email, password)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const company = await db.query(
      createCompanyQuery,
      [ companyObj.name, companyObj.company_email, companyObj.password ]
    );
    jobObj.company_id = company_id = company.rows[0]._id;

    const createApplicantQuery = `
      INSERT INTO applicants
        (first_name, last_name, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const applicant = await db.query(
      createApplicantQuery,
      [ applicantObj.first_name, applicantObj.last_name, applicantObj.email, applicantObj.password ]
    );
    jobToApplicantObj.applicant_id = applicant.rows[0]._id;

    const createJobQuery = `
      INSERT INTO jobs
        (title, min_salary, max_salary, description,
          application_url, experience_id, job_type_id, company_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `;
    const job = await db.query(
      createJobQuery,
      [ jobObj.title, jobObj.min_salary, jobObj.max_salary, jobObj.description,
        jobObj.application_url, jobObj.experience_id, jobObj.job_type_id, jobObj.company_id ]
    );
    jobToApplicantObj.job_id = job.rows[0]._id;
  });

  afterAll(async () => {
    const deleteDummies = [
      [ `DELETE FROM jobs WHERE _id=$1;`, jobToApplicantObj.job_id],
      [ `DELETE FROM companies WHERE _id=$1;`, company_id],
      [ `DELETE FROM applicants WHERE _id=$1;`, jobToApplicantObj.applicant_id]
    ]
    
    for (const [ query, replacement ] of deleteDummies) {
      await db.query(
        query,
        [ replacement ]
      );
    }

    return await db.end();
  });

  it('writes to the table', async () => {
    const res = await jobsToApplicants.create(jobToApplicantObj);

    expect(res).not.toBeInstanceOf(Error);
    expect(res).toHaveProperty('_id');
    
    id = res._id;
  });
  
  it('gets records', async () => {
    const res = await jobsToApplicants.getAll();
    
    expect(res).not.toBeInstanceOf(Error);
    expect(res.length).toBeGreaterThan(0);
  });
  
  it('gets a record by id', async () => {
    const res = await jobsToApplicants.getById(id);
    
    expect(res).not.toBeInstanceOf(Error);
    expect(res._id).toEqual(id);
  });

  it('gets records by job_id', async () => {
    const res = await jobsToApplicants.getAllByJobId(jobToApplicantObj.job_id);

    expect(res).not.toBeInstanceOf(Error);
    expect(res.length).toBeGreaterThan(0);
  });

  it('gets records by applicant_id', async () => {
    const res = await jobsToApplicants.getAllByApplicantId(jobToApplicantObj.applicant_id);

    expect(res).not.toBeInstanceOf(Error);
    expect(res.length).toBeGreaterThan(0);
  });
  
  // do this once we no longer need to check our dummy record
  it('deletes a record', async () => {
    const res = await jobsToApplicants.deleteById(id);
    const emptyRes = await jobsToApplicants.getById(id);

    expect(res).not.toBeInstanceOf(Error);
    expect(res).toHaveProperty('_id');
    expect(res._id).toEqual(id);
    expect(emptyRes).toEqual(undefined);
  });
});