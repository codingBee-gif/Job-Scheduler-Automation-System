const Job = require('../models/job.model');

exports.createJob = async (req, res, next) => {
  try {
    const job = await Job.create({
      ...req.body,
      user: req.user._id
    });

    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

exports.getJobs = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const query = {
      user: req.user._id
    };

    if (req.query.status) {
      query.status = req.query.status;
    }

    const jobs = await Job.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalJobs = await Job.countDocuments(query);

    res.json({
      totalJobs,
      currentPage: page,
      totalPages: Math.ceil(totalJobs / limit),
      jobs
    });
  } catch (error) {
    next(error);
  }
};

exports.updateJobStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const job = await Job.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    job.status = status;
    await job.save();

    res.json(job);
  } catch (error) {
    next(error);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    next(error);
  }
};
