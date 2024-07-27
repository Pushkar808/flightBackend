const flightSchema = require('../schema/flightSchema');

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
            console.log(req);
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
}

module.exports = new FlightModel(); 
