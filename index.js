const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require('http');
require('dotenv').config();
const flightRoute = require("./routes/flight");
const mondoDb = require('./config/dbConfig')
const { socketConnection } = require("./utils/socket");

const app = express();
const server = http.createServer(app);

app.set('trust proxy', true);
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => res.status(200).send('API Working Success'));

//routes to redirect to paths
app.use("/api/v1/flight", flightRoute);

//initializing socket Connection
socketConnection(server)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3006;

server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

