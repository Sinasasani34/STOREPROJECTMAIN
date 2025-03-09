const NameSpaceSocketHandller = require("./namespace.socket")

module.exports = {
    socketHandller: (io) => {
        new NameSpaceSocketHandller(io).initConnection()
    }
}