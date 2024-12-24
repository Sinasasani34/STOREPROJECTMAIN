const createHttpError = require("http-errors");
const { UserModel } = require("../../models/users");
const JWT = require("jsonwebtoken");
const { Access_TOKEN_SECRET_KEY } = require("../../utils/constans");

function getToken(headers) {
    // const [bearer, token] = headers?.["access-token"]?.split(" ") || [];
    const [bearer, token] = headers?.authorization?.split(" ") || [];
    if (token && ["Bearer", "bearer"].includes(bearer)) {
        return token
    }
    throw createHttpError.Unauthorized("حساب کاربری شناسایی نشد وارد حساب کاربری خود شوید")
}

function VerifyAccessToken(req, res, next) {
    try {
        const token = getToken(req.headers)
        JWT.verify(token, Access_TOKEN_SECRET_KEY, async (err, payload) => {
            try {
                if (err) {
                    throw createHttpError.Unauthorized("وارد حساب کاربری خود شوید")
                }
                const { mobile } = payload || {};
                const user = await UserModel.findOne({ mobile }, { password: 0, token: 0, otp: 0, })
                if (!user) throw createHttpError.Unauthorized("کاربر یا حساب کاربری یافت نشد")
                req.user = user;
                return next();
            } catch (error) {
                next(error)
            }
        })
    } catch (error) {
        next(error)
    }
}



module.exports = {
    VerifyAccessToken
}