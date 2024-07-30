const { Server } = require("socket.io");
let connectedSocket;
exports.socketConnection = (server) => {
    //establishing socket connection with the client
    io = new Server(server, {
        cors: { origin: "*" }
    });
    io.on('connection', (socket) => {
        connectedSocket = socket;
        console.info(`Client connected [id=${socket.id}]`);
        socket.join(socket.request._query.id);
        socket.on('disconnect', () => {
            console.info(`Client disconnected [id=${socket.id}]`);
        });
    });
};

exports.sendNotification = (notiObj) => {
    //function to send Notification to the client
    connectedSocket.broadcast.emit("message", notiObj)
}