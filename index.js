const database = require("./config/dbConfig");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require('http');
const flightRoute = require("./routes/flight");
const { socketConnection } = require("./utils/socket");

const app = express();
const server = http.createServer(app);

app.set('trust proxy', true);
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => res.status(200).send('API Working Success'));
app.use("/api/v1/flight", flightRoute);

socketConnection(server)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

