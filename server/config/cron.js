const cron = require('node-cron');
const SurplusPost = require('../models/SurplusPost');

// Runs every hour
cron.schedule('0 * * * *', async () => {
  console.log('Checking for expired food posts...');
  const now = new Date();
  
  await SurplusPost.updateMany(
    { 
      pickupDeadline: { $lt: now }, 
      status: 'available' 
    },
    { $set: { status: 'expired' } }
  );
});