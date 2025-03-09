const createHttpError = require("http-errors");
const { conversationModel } = require("../../../models/conversation");
const Controller = require("../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");

class NameSpaceController extends Controller {
    async addNameSpace(req, res, next) {
        try {
            const { title, endpoint } = req.body;
            await this.findNameSpaceWithEndPoint(endpoint);
        
            const conversation = await conversationModel.create({ title, endpoint });
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "فضای گفتگو با موفقیت ایجاد شد",

                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getListOfNameSpaces(req, res, next) {
        try {
            const namespaces = await conversationModel.find({}, { rooms: 0, __v: 0 });
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    namespaces
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async findNameSpaceWithEndPoint(endpoint) {
        const conversation = await conversationModel.findOne({ endpoint });
        if (conversation) throw createHttpError.BadRequest("فضای گفتگویی با این آدرس وجود دارد");
    }
}

module.exports = {
    NameSpaceController: new NameSpaceController()
}