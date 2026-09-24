import cron from 'node-cron';
import { markAbsentees } from './services/attendance.service.js';

export const startScheduler = () => {
  console.log('Background task scheduler started.');

  // Run at 23:59 (11:59 PM) every day
  cron.schedule('59 23 * * *', async () => {
    console.log('Running scheduled task: Marking absentees for today...');
    try {
      const result = await markAbsentees();
      console.log(`Scheduled task completed. Marked ${result.marked} absentees.`);
      if (result.reason) {
         console.log(`Reason: ${result.reason}`);
      }
    } catch (error) {
      console.error('Error in scheduled task (markAbsentees):', error);
    }
  });

  // You can add more background jobs here in the future
};
