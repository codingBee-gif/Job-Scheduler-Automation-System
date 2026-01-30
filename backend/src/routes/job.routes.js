const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');

const {
  createJob,
  getJobs,
  updateJobStatus,
  deleteJob
} = require('../controllers/job.controller');

router.post('/', protect, createJob);
router.get('/', protect, getJobs);
router.patch('/:id', protect, updateJobStatus);
router.delete('/:id', protect, deleteJob);

module.exports = router;
