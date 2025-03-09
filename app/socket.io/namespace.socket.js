module.exports = class NameSpaceSocketHandller {
    #io;
    constructor(io) {
        this.#io = io
    }

    initConnection() {
        this.#io.on("connection", (socket) => {
            console.log(socket.rooms);
        })
    }
}