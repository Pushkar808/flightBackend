const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const database = require("./config/dbConfig");
const flightRoute = require("./routes/flight");
const app = express();

app.set('trust proxy', true);
app.use(cors());

// Enable CORS
// Body parser
app.use(express.json());
app.use(cookieParser());

// Route to check API status
app.get("/", (req, res) => res.status(200).send('API Working Success'));

// Your other routes
app.use("/api/v1/flight", flightRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
