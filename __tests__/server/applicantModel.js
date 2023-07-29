const { applicants } = require ('../../server/models/applicantModel');

describe('Postgres applicants table unit tests', () => {
  // this gets set in the first test
  // and this will be used to clean up the DB after testing
  let id;

  const applicantObj = {
    first_name: 'firstname',
    last_name: 'lastname',
    email: 'test@email.com',
    password: 'abc123'
  };

  it('writes to the table', async () => {
    const res = await applicants.create(applicantObj);

    expect(res).not.toBeInstanceOf(Error);
    expect(res).toHaveProperty('_id');
    
    id = res._id;
  });
  
  it('gets records', async () => {
    const res = await applicants.getAll();
    
    expect(res).not.toBeInstanceOf(Error);
    expect(res.length).toBeGreaterThan(0);
  });
  
  it('gets a record by id', async () => {
    const res = await applicants.getById(id);
    
    expect(res).not.toBeInstanceOf(Error);
    expect(res._id).toEqual(id);
  });
  
  it('gets a record by email', async () => {
    const res = await applicants.getByEmail(applicantObj.email);

    expect(res).not.toBeInstanceOf(Error);
    expect(res._id).toEqual(id);
  });

  // we check updates last so that we can check our getByField tests
  it('updates a record', async () => {
    const updateObj = Object.assign({}, applicantObj);
    for (const field in applicantObj) {
      updateObj[field] = 'a' + applicantObj[field];
      const res = await applicants.update(updateObj);
      
      expect(res).not.toBeInstanceOf(Error);
      expect(res[field]).toEqual(updateObj[field]);
    }
  });

  it('does not allow duplicate emails', async () => {
    const newObj =  {
      first_name: 'firstname2',
      last_name: 'lastname2',
      email: 'test@email.com',
      password: 'abc1232'
    };
    const res = await applicants.create(newObj);

    expect(res).toBeInstanceOf(Error);
  });
  
  // do this once we no longer need to check our dummy record
  it('deletes a record', async () => {
    const res = await applicants.deleteById(id);
    const emptyRes = await applicants.getById(id);

    expect(res).not.toBeInstanceOf(Error);
    expect(res.length).toEqual(1);
    expect(res._id).toEqual(id);
    expect(emptyRes.length).toEqual(0);
  });

  /*
    Required fields are: email, password, first_name
  */
  it('errors if required fields are missing', async () => {
    const reqFields = [ 'email', 'password', 'first_name' ]
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
});