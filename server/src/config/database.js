const mongoose = require('mongoose')


const database = async () => {
  try {
    // Replace database value in the .env file with your database config url
    const DATABASE =process.env.MONGODB_URL
    await mongoose.connect(DATABASE
     );
    console.log('Connected to the database.');
  } catch (error) {
    console.log('Could not connect to the database.', error);
  }
};
module.exports=  database;
