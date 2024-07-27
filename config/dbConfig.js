const mongoose = require('mongoose');
const dbURI = "mongodb+srv://pushkargupta808:g7LKDPVAVVr5NCTN@cluster0.rj1l6je.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
console.log("Connecting with Databse......")
mongoose.connect(dbURI)
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log('Database connection error:', err));

module.exports = mongoose;
