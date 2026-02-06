const axios = require('axios');

const WEBHOOK_URL = process.env.WEBHOOK_URL;

exports.sendWebhook = async (job) => {
  if (!WEBHOOK_URL) {
    console.log('Webhook URL not configured');
    return;
  }

  try {
    await axios.post(WEBHOOK_URL, {
      jobId: job.id,
      taskName: job.taskName,
      status: job.status,
      priority: job.priority,
      payload: JSON.parse(job.payload),
      completedAt: new Date().toISOString()
    });

    console.log('Webhook sent successfully');
  } catch (error) {
    console.error('Webhook failed:', error.message);
  }
};
