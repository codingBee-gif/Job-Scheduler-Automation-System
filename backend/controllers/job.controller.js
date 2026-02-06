const db = require('../database/db');
const webhookService = require('../services/webhook.service');

/**
 * CREATE JOB
 */
exports.createJob = (req, res) => {
  console.log('REQ BODY:', req.body);

  const { taskName, payload, priority } = req.body;

  // Validation
  if (!taskName || !priority) {
    return res.status(400).json({
      message: 'taskName and priority are required'
    });
  }

  const allowedPriorities = ['Low', 'Medium', 'High'];
  if (!allowedPriorities.includes(priority)) {
    return res.status(400).json({
      message: 'Invalid priority value'
    });
  }

  const jobPayload = payload ? JSON.stringify(payload) : JSON.stringify({});

  const query = `
    INSERT INTO jobs (taskName, payload, priority, status)
    VALUES (?, ?, ?, ?)
  `;

  db.run(query, [taskName, jobPayload, priority, 'pending'], function (err) {
    if (err) {
      return res.status(500).json({
        message: 'Failed to create job',
        error: err.message
      });
    }

    res.status(201).json({
      id: this.lastID,
      taskName,
      priority,
      status: 'pending'
    });
  });
};

/**
 * GET ALL JOBS (with filters)
 */
exports.getJobs = (req, res) => {
  const { status, priority } = req.query;

  let query = 'SELECT * FROM jobs WHERE 1=1';
  const params = [];

  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }

  if (priority) {
    query += ' AND priority = ?';
    params.push(priority);
  }

  query += ' ORDER BY createdAt DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to fetch jobs',
        error: err.message
      });
    }

    res.json(rows);
  });
};

/**
 * GET JOB BY ID
 */
exports.getJobById = (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM jobs WHERE id = ?', [id], (err, job) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to fetch job',
        error: err.message
      });
    }

    if (!job) {
      return res.status(404).json({
        message: 'Job not found'
      });
    }

    res.json(job);
  });
};

/**
 * RUN JOB
 */
exports.runJob = (req, res) => {
  const { id } = req.params;

  // 1. Fetch job
  db.get('SELECT * FROM jobs WHERE id = ?', [id], (err, job) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to fetch job',
        error: err.message
      });
    }

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.status !== 'pending') {
      return res.status(400).json({
        message: `Job cannot be run. Current status: ${job.status}`
      });
    }

    // 2. Mark job as RUNNING
    db.run(
      'UPDATE jobs SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      ['running', id],
      (err) => {
        if (err) {
          return res.status(500).json({
            message: 'Failed to update job to running',
            error: err.message
          });
        }

        // 3. Simulate background execution
        setTimeout(() => {
          db.run(
            'UPDATE jobs SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
            ['completed', id],
            (err) => {
              if (err) {
                console.error('Failed to mark job completed:', err.message);
                return;
              }

              // 4. Fetch completed job
              db.get('SELECT * FROM jobs WHERE id = ?', [id], (err, completedJob) => {
                if (!err && completedJob) {
                  // 5. Trigger webhook
                  webhookService.sendWebhook(completedJob);
                }
              });
            }
          );
        }, 3000);

        // Respond immediately
        res.json({
          message: 'Job started',
          jobId: id,
          status: 'running'
        });
      }
    );
  });
};
