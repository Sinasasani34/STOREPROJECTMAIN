const { conversationModel } = require("../models/conversation");
const moment = require("moment-jalali")
module.exports = class NameSpaceSocketHandller {
    #io;
    constructor(io) {
        this.#io = io
    }

    initConnection() {
        this.#io.on("connection", async (socket) => {
            const namespaces = await conversationModel.find({}, { title: 1, endpoint: 1 }).sort({ _id: -1 })
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
                    socket.emit("roomInfo", roomInfo)
                    this.getNewMessage(socket)
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
            const { message, roomName, endpoint } = data;
            await conversationModel.updateOne({ endpoint, "rooms.name": roomName }, { $push: {
                "rooms.$.messages": {
                    sender: "67319ee3c60952f68e0c2b52",
                    message,
                    dateTime: Date.now()
                }
            }})
        })
    }
}