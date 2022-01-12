const mongoose = require('mongoose')
const logger = require('../config/logger')

const database = async () => {
  try { 
    const DATABASE =process.env.MONGODB_URL
    await mongoose.connect(DATABASE
     );
    logger.info('Connected to the database.');
  } catch (error) {
    logger.error('Could not connect to the database.');
  }
};
module.exports=  database;
