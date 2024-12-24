const createHttpError = require("http-errors");
const { getOtpSchema, checkOtpSchema } = require("../../../validators/user/auth.schema");
const { RandomNumberGenerator, SignAccessToken, VerifyRefreshToken, SignRefreshToken } = require("../../../../utils/functions");
const { UserModel } = require("../../../../models/users");
const { ROLES } = require("../../../../utils/constans");
const Controller = require("../../controller");
const { StatusCodes: httpStatus } = require("http-status-codes");

class UserAuthController extends Controller {

    async getOtp(req, res, next) {

        try {
            await getOtpSchema.validateAsync(req.body);
            const { mobile } = req.body;
            const code = RandomNumberGenerator();
            const result = await this.saveUser(mobile, code)
            console.log(result)
            if (!result) throw createHttpError.Unauthorized("ورود شما انجام نشد")
            return res.status(httpStatus.OK).send({
                statusCode: httpStatus.OK,
                data: {
                    code, mobile
                }
            });
        } catch (error) {
            console.log(error)
            next(createHttpError.BadRequest(error.message));
        }
    }

    async checkOtp(req, res, next) {
        try {
            await checkOtpSchema.validateAsync(req.body);
            const { mobile, code } = req.body;
            const user = await UserModel.findOne({ mobile });
            if (!user) throw createHttpError.NotFound("شماره موبایل یا کاربر یافت نشد")
            if (user.otp.code != code) throw createHttpError.Unauthorized("کد ارسال شده صحیح نمیباشد")
            const now = (new Date()).getTime();
            if (+user.otp.expiresIn < now) throw createHttpError.Unauthorized("کد شما منقضی شده است")
            const accessToken = await SignAccessToken(user._id);
            const refreshToken = await SignRefreshToken(user._id)
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    accessToken,
                    refreshToken
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async refreshToken(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const mobile = await VerifyRefreshToken(refreshToken)
            const user = await UserModel.findOne({ mobile })
            const accessToken = await SignAccessToken(user._id)
            const newRefreshToken = await SignRefreshToken(user._id)
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    accessToken,
                    refreshToken: newRefreshToken
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async saveUser(mobile, code) {
        let otp = {
            code,
            expiresIn: (new Date().getTime() + 120000)
        }
        const result = await this.checkExistUser(mobile);
        if (result) {
            return (await this.updateUser(mobile, { otp }))
        }
        return !!(await UserModel.create({
            mobile,
            otp,
            Role: ROLES.USER
        }))
    }

    async checkExistUser(mobile) {
        const user = await UserModel.findOne({ mobile })
        return user;
    }

    async updateUser(mobile, objectData = {}) {
        Object.keys(objectData).forEach((key) => {
            if (["", " ", 0, null, undefined, "0", NaN].includes(objectData[key])) delete objectData[key]
        })
        const updateResult = await UserModel.updateOne({ mobile }, { $set: objectData })
        return !!updateResult.modifiedCount
    }
}

module.exports = {
    UserAuthController: new UserAuthController()
}