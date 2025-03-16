const { conversationModel } = require("../models/conversation");
module.exports = class NameSpaceSocketHandller {
    #io;
    constructor(io) {
        this.#io = io
    }
    initConnection() {
        this.#io.on("connection", async (socket) => {
            const namespaces = await conversationModel.find({}, {
                title: 1,
                endpoint: 1,
                rooms: 1
            }).sort({
                _id: -1
            })
            socket.emit("namespacesList", namespaces);
        })
    }
    async createNamespacesConnection() {
        const namespaces = await conversationModel.find({}, { title: 1, endpoint: 1, rooms: 1 }).sort({ _id: -1 })
        for (const namespace of namespaces) {
            this.#io.of(`/${namespace.endpoint}`).on("connection", async (socket) => {
                const conversation = await conversationModel.findOne({ endpoint: namespace.endpoint }, { rooms: 1 }).sort({ _id: -1 })
                socket.emit("roomList", conversation.rooms)
                socket.on("joinRoom", async roomName => {
                    const lastRoom = Array.from(socket.rooms)[1];
                    if (lastRoom) {
                        socket.leave(lastRoom)
                        await this.getCountofOnlineUsers(namespace.endpoint, roomName)
                    }
                    socket.join(roomName)
                    await this.getCountofOnlineUsers(namespace.endpoint, roomName)
                    const roomInfo = conversation.rooms.find(item => item.name === roomName)
                    this.getNewMessage(socket);
                    socket.emit("roomInfo", roomInfo)
                    this.getNewMessage(socket);
                    this.getNewLocation(socket);
                    this.uploadFiles(socket)
                    socket.on("disconnect", async () => {
                        await this.getCountofOnlineUsers(namespace.endpoint, roomName)
                    })
                })
            });
        }
    }

    async getCountofOnlineUsers(endpoint, roomName) {
        const onlineUsers = await this.#io.of(`/${endpoint}`).in(roomName).allSockets();
        this.#io.of(`/${endpoint}`).in(roomName).emit("countOfOnlineUsers", Array.from(onlineUsers).length)
    }

    getNewMessage(socket) {
        socket.on("newMessage", async (data) => {
            const { message, roomName, endpoint, sender } = data;
            await conversationModel.updateOne({ endpoint, "rooms.name": roomName }, {
                $push: {
                    "rooms.$.messages": {
                        sender,
                        message,
                        dateTime: Date.now()
                    }
                }
            })
            this.#io.of(`/${endpoint}`).in(roomName).emit("confirmMessage", data)
        })
    }
    getNewLocation(socket){
        socket.on("newLocation", async data => {
            const {location, roomName, endpoint, sender} = data
            await conversationModel.updateOne({endpoint, "rooms.name": roomName}, {
                $push : {
                    "rooms.$.locations" : {
                        sender,
                        location, 
                        dateTime: Date.now()
                    } 
                }
            })
            this.#io.of(`/${endpoint}`).in(roomName).emit("confirmLocation", data)
        })
    }
    uploadFiles(socket){
        socket.on("upload", ({file, filename}, callback) => {
            const ext = path.extname(filename)
            fs.writeFile("public/uploads/sockets/" + String(Date.now() + ext) , file, (err) => {
              callback({ message: err ? "failure" : "success" });
            });
        });
    }
}