const express = require('express');
const { jobs } = require('../models/jobModel.js');

const router = express.Router();

//create new job posting route
router.post('/', async (req, res) => {
  try {
    const jobObj = req.body;
    
    const createdJob = await jobs.create(jobObj);
    res.status(201).json(createdJob);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create the job posting' });
  }
});

//get all job posting route
router.get('/', async (req, res) => {
  try {
    const allJobs = await jobs.getAll();
    res.json(allJobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get all job postings' });
  } 
});

//get specific job by ID route
router.get('/:id', async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await jobs.getById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job posting not found' });
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get job posting' });
  }
});

//update/edit job posting route
router.put('/:id', async (req, res) => {
  try {
    const jobId = req.params.id;
    const updateObj = req.body;
    const updatedJob = await jobs.updateById(jobId, updateObj);
    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update the job posting' });
  }
});

//delete a job by id route
router.delete('/:id', async (req, res) => {
  try {
    const jobId = req.params.id;
    const deletedJob = await jobs.deleteById(jobId);
    res.json(deletedJob);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete the job posting' });
  } 
});

module.exports = router;