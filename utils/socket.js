const { Server } = require("socket.io");
let connectedSocket;
exports.socketConnection = (server) => {
    io = new Server(server, {
        cors: { origin: "*" }
    });;
    io.on('connection', (socket) => {
        connectedSocket = socket;
        console.info(`Client connected [id=${socket.id}]`);
        socket.join(socket.request._query.id);
        socket.on('disconnect', () => {
            console.info(`Client disconnected [id=${socket.id}]`);
        });
        socket.broadcast.emit("message", "OK")
    });
};

exports.sendNotification = (notiObj) => {
    connectedSocket.broadcast.emit("message", "OK")
}