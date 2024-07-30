const mongoose = require('mongoose');
console.log("Connecting with Databse......")
mongoose.connect(process.env.dbURI)
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log('Database connection error:', err));

module.exports = mongoose;
