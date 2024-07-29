const flightModel = require('../models/flightModel');

exports.addFlightData = async (req, res, next) => {
    try {
        return await flightModel.addData(req, res);
    } catch (error) {
        console.error('Error in addFlightData:', error); // Log any errors
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: null
        });
    }
};

exports.getFlightData = async (req, res, next) => {
    try {
        return await flightModel.getFlightInfo(req, res);
    } catch (error) {
        console.error('Error in getFlightData:', error); // Log any errors
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: null
        });
    }
};

exports.changeFlightStatus = async (req, res, next) => {
    try {
        return await flightModel.changeFlightStatus(req, res);
    } catch (error) {
        console.error('Error in changeFlightStatus:', error); // Log any errors
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: null
        });
    }
};