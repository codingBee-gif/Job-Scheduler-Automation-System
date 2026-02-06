const express = require('express');
const router = express.Router(); 

const jobController = require('../controllers/job.controller');

router.post('/jobs', jobController.createJob);
router.get('/jobs', jobController.getJobs);
router.get('/jobs/:id', jobController.getJobById);
router.post('/run-job/:id', jobController.runJob);

module.exports = router;
