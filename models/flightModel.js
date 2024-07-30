const flightSchema = require('../schema/flightSchema');
const { flightStatusAction } = require('../utils/helper');

class FlightModel {
    async addData(req, res) {
        try {
            const { data = [] } = req?.body;
            if (data.length > 0) {
                const result = await flightSchema.insertMany(data);
                return res.status(201).json({
                    status: true,
                    message: "Data Inserted Successfully",
                    data: result
                });
            }
            return res.status(400).json({
                status: false,
                message: "Malformed Data",
                data: null
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: false,
                message: "Internal Server Error",
                data: null
            });
        }
    }
    async getFlightInfo(req, res) {
        try {
            const { flightNumber = "" } = req?.query;
            if (flightNumber) {
                const result = await flightSchema.find({ flight_id: { $regex: flightNumber, $options: 'i' } });
                return res.status(200).json({
                    status: true,
                    message: "Success",
                    data: result
                });
            }
            return res.status(400).json({
                status: false,
                message: "Malformed Data",
                data: null
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: false,
                message: "Internal Server Error",
                data: null
            });
        }
    }
    async changeFlightStatus(req, res) {
        try {
            const { type, flight_id, gateType, timeType, value } = req.body;
            if (!type || !flight_id) {
                throw new Error("Type or Flight ID not defined");
            }

            const updateFields = {
                gate: {
                    arrival: "arrival_gate",
                    departure: "departure_gate"
                },
                time: {
                    arrival: "actual_arrival",
                    departure: "actual_departure"
                },
                status: "status"
            };

            let updateKey;
            //validating type received from the api
            switch (type) {
                case "gate":
                    if (!gateType || !updateFields.gate[gateType]) {
                        throw new Error("Invalid Gate Type");
                    }
                    updateKey = updateFields.gate[gateType];
                    break;
                case "time":
                    if (!timeType || !updateFields.time[timeType]) {
                        throw new Error("Invalid Time Type");
                    }
                    updateKey = updateFields.time[timeType];
                    break;
                case "status":
                    updateKey = updateFields.status;
                    break;
                default:
                    throw new Error("Invalid Type");
            }
            const updateValue = { [updateKey]: value };

            //updating flight status 
            const result = await flightSchema.updateOne({ flight_id }, { $set: updateValue });
            if (result?.matchedCount === 0)
                throw "No flight Found with this Id"
            if (!result?.acknowledged)
                throw "Some Error Occurred! While updating"

            //getting updated flight data
            const flightData = await flightSchema?.findOne({ flight_id: flight_id });
            flightStatusAction(flightData, req.body);
            return res.status(200).json({
                status: true,
                message: "Flight status updated successfully",
                data: result
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: false,
                message: "Internal Server Error",
                data: error
            });
        }
    }


}

module.exports = new FlightModel(); 
