const { companies } = require ('../../server/models/companyModel');

describe('Postgres companies table unit tests', () => {
  // this gets set in the first test
  // and this will be used to clean up the DB after testing
  let id;

  const companyObj = {
    name: 'test Company',
    company_email: 'test@email.com',
    password: 'abc123'
  };

  it('writes to the table', async () => {
    const res = await companies.create(companyObj);

    expect(res).not.toBeInstanceOf(Error);
    expect(res).toHaveProperty('_id');
    
    id = res._id;
  });
  
  it('gets records', async () => {
    const res = await companies.getAll();
    
    expect(res).not.toBeInstanceOf(Error);
    expect(res.length).toBeGreaterThan(0);
  });
  
  it('gets a record by id', async () => {
    const res = await companies.getById(id);
    
    expect(res).not.toBeInstanceOf(Error);
    expect(res._id).toEqual(id);
  });

  it('gets a record by email', async () => {
    const res = await companies.getByEmail(companyObj.company_email);

    expect(res).not.toBeInstanceOf(Error);
    expect(res._id).toEqual(id);
  });

  // we check updates last so that we can check our getByField tests
  it('updates a record', async () => {
    const updateObj = Object.assign({}, companyObj);
    for (const field in companyObj) {
      updateObj[field] = 'a' + companyObj[field];
      const res = await companies.update(updateObj);
      
      expect(res).not.toBeInstanceOf(Error);
      expect(res[field]).toEqual(updateObj[field]);
    }
  });

  it('does not allow duplicate emails', async () => {
    const newObj = {
      name: 'test Company2',
      company_email: 'test@email.com',
      password: 'abc1232'
    };
    const res = await companies.create(newObj);

    expect(res).toBeInstanceOf(Error);
  });
  
  // do this once we no longer need to check our dummy record
  it('deletes a record', async () => {
    const res = await companies.deleteById(id);
    const emptyRes = await companies.getById(id);

    expect(res).not.toBeInstanceOf(Error);
    expect(res.length).toEqual(1);
    expect(res._id).toEqual(id);
    expect(emptyRes.length).toEqual(0);
  });

  // at this time, all fields are required
  it('errors if required fields are missing', async () => {
    for (const key of jobObj) {
      const invalidObj = Object.assign({}, jobObj);
      delete invalidObj.key;

      const res = await companies.create(invalidObj);
      expect(res).toBeInstanceOf(Error);
    }
  });
});