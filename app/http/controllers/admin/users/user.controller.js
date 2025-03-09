const { StatusCodes } = require("http-status-codes");
const { UserModel } = require("../../../../models/users");
const Controller = require("../../controller");
const { deleteInvalidPropertyInObject } = require("../../../../utils/functions");
const createHttpError = require("http-errors");

class UserController extends Controller {
    async getAllUsers(req, res, next) {
        try {
            const { search } = req.query;
            const databaseQuery = {};
            if (search) databaseQuery['$text'] = { $search: search };
            const users = await UserModel.find(databaseQuery);
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    users
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async updateUserProfile(req, res, next) {
        try {
            const userID = req.user._id;
            const data = req.body;
            const blackListFields = ['mobile', 'otp', 'bills', 'discount', 'Roles', 'Courses']
            deleteInvalidPropertyInObject(data, blackListFields)
            const profileUpdateResult = await UserModel.updateOne({ _id: userID }, { $set: data })
            if (!profileUpdateResult.modifiedCount) {
                throw new createHttpError.InternalServerError("خطایی در بروزرسانی پروفایل رخ داده است")
            }
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "بروزرسانی پروفایل با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    UserController: new UserController()
}