const { jobs } = require ('../../server/models/jobModel');
const { db } = require('../../server/envVars');

describe('Postgres jobs table unit tests', () => {
  // this gets set in the first test
  // and this will be used to clean up the DB after testing
  let id;
  
  // the foreign keys (ending in _id) are set in the beforeAll
  // to allow for testing
  const jobObj = {
    title: 'testTitle',
    min_salary: 100,
    max_salary: 500,
    description: 'Test Description',
    application_url: 'http://test.com',
    experience_id: 0,
    job_type_id: 0,
    company_id: 0
  }
  beforeAll(async() => {
    const companyObj = {
      name: 'test Company',
      company_email: 'testjob@email.com',
      password: 'abc123'
    };
    const experObj = {
      name: 'test experience'
    };
    const job_type = {
      name: 'test type'
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
    jobObj.company_id = company.rows[0]._id;

    const createJobTypeQuery = `
      INSERT INTO job_types
        (name)
        VALUES ($1)
        RETURNING *;
    `;
    const type = await db.query(
      createJobTypeQuery,
      [ job_type.name ]
    );
    jobObj.job_type_id = type.rows[0]._id;

    const createExperQuery = `
      INSERT INTO experiences
        (name)
        VALUES ($1)
        RETURNING *;
    `;
    const exper = await db.query(
      createExperQuery,
      [ experObj.name ]
    );
    jobObj.experience_id = exper.rows[0]._id;

    return;
  });

  // clear out the dummy objects from the DB
  afterAll(async () => {
    const deleteDummies = [
      [`DELETE FROM job_types WHERE _id=$1;`, jobObj.job_type_id],
      [`DELETE FROM experiences WHERE _id=$1;`, jobObj.experience_id],
      [`DELETE FROM companies WHERE _id=$1;`, jobObj.company_id],
    ];
    
    for (const [query, replacement] of deleteDummies) {
      const res = await db.query(
        query,
        [ replacement ]
      );
    }

    return await db.end();
  })

  it('writes to the table', async () => {
    const res = await jobs.create(jobObj);

    expect(res).not.toBeInstanceOf(Error);
    expect(res).toHaveProperty('_id');
    
    id = res._id;
  });
  
  it('gets records', async () => {
    const res = await jobs.getAll();
    
    expect(res).not.toBeInstanceOf(Error);
    expect(res.length).toBeGreaterThan(0);
  });
  
  it('gets a record by id', async () => {
    const res = await jobs.getById(id);
    
    expect(res).not.toBeInstanceOf(Error);
    expect(res._id).toEqual(id);
  });
  
  it('gets all records by experience', async () => {
    const res = await jobs.getAllByExperienceId(jobObj.experience_id);

    expect(res).not.toBeInstanceOf(Error);
    expect(res.length).toEqual(1);
    expect(res[0].experience_id).toEqual(jobObj.experience_id);
  });
  
  it('gets all records by job type', async () => {
    const res = await jobs.getAllByJobTypeId(jobObj.job_type_id);
    
    expect(res).not.toBeInstanceOf(Error);
    expect(res.length).toEqual(1);
    expect(res[0].job_type_id).toEqual(jobObj.job_type_id);
  });
  
  it('gets all records by company', async () => {
    const res = await jobs.getAllByCompanyId(jobObj.company_id);
    
    expect(res).not.toBeInstanceOf(Error);
    expect(res.length).toEqual(1);
    expect(res[0].company_id).toEqual(jobObj.company_id);
  });

  // we check updates last so that we can check our getByField tests
  it('updates a record', async () => {
    const updateObj = Object.assign({}, jobObj);
    for (const field in jobObj) {
      if (/_id$/.test(String(field))) {
        // we have to ignore the foreign keys
        continue;
      } else if (typeof jobObj.field === 'string') {
        updateObj[field] = 'a' + jobObj[field];
      } else if (typeof jobObj.field === 'number') {
        updateObj[field]++;
      }
      const res = await jobs.updateById(id, updateObj);

      expect(res).not.toBeInstanceOf(Error);
      expect(res[field]).toEqual(updateObj[field]);
    }
  });
  
  // do this once we no longer need to check our dummy record
  it('deletes a record', async () => {
    const res = await jobs.deleteById(id);
    const emptyRes = await jobs.getById(id);

    expect(res).not.toBeInstanceOf(Error);
    expect(res).toHaveProperty('_id');
    expect(res._id).toEqual(id);
    expect(emptyRes).toEqual(undefined);
  });

  /*
    Required fields are: title, min_salary, max_salary, description,
    application_url, job_type_id, company_id, experience_id
  */
  it('errors if required fields are missing', async () => {
    const reqFields = [ 'title', 'min_salary', 'max_salary', 'description',
      'application_url', 'job_type_id', 'company_id', 'experience_id' ]
    for (const field in jobObj) {
      // if the field isn't required, don't test it
      if (!reqFields.includes(field)) {
        continue;
      }

      const invalidObj = Object.assign({}, jobObj);
      delete invalidObj[field];

      const res = await jobs.create(invalidObj);
      expect(res).toBeInstanceOf(Error);
    }
  });

  it('does not allow a min_salary to be higher than max_salary', async () => {
    const invalidSalary = Object.assign({}, jobObj);
    invalidSalary.min_salary = invalidSalary.max_salary * 2;

    const res = await jobs.create(invalidSalary);
    expect(res).toBeInstanceOf(Error);
  })
});