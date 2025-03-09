const createHttpError = require("http-errors");
const { conversationModel } = require("../../../models/conversation");
const Controller = require("../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const path = require("path");

class RoomController extends Controller {
    async addRoom(req, res, next) {
        try {
            const { name, description, filename, fileUploadPath, namespace } = req.body;
            await this.findConversationWithEndpoint(namespace);
            await this.findRoomWithName(name);
            
            const image = path.join(fileUploadPath, filename).replace(/\\/g, "/")
            const room = { name, description, image}
            await conversationModel.updateOne({endpoint: namespace }, {
                $push: {
                    rooms: room
                }
            });
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "گروه گفتگو با موفقیت ایجاد شد",
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getListOfRooms(req, res, next) {
        try {
            const conversation = await conversationModel.find({}, { rooms: 1, __v: 0 });
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    rooms: conversation.rooms
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async findRoomWithName(name) {
        const conversation = await conversationModel.findOne({ "rooms.name": name });
        if (conversation) throw createHttpError.BadRequest("فضای گفتگویی با این آدرس وجود دارد");
    }
    async findConversationWithEndpoint(endpoint) {
        const conversation = await conversationModel.findOne({ endpoint });
        if (!conversation) throw createHttpError.NotFound("فضای گفتگویی با این آدرس وجود ندارد");
        return conversation;
    }
}

module.exports = {
    RoomController: new RoomController()
}