const createHttpError = require("http-errors");
const { UserModel } = require("../../models/users");
const JWT = require("jsonwebtoken");
const { Access_TOKEN_SECRET_KEY } = require("../../utils/constans");
function VerifyAccessToken(req, res, next) {
    const headers = req.headers;
    const [bearer, token] = headers?.["access-token"]?.split(" ") || [];
    if (token && ["Bearer", "bearer"].includes(bearer)) {
        JWT.verify(token, Access_TOKEN_SECRET_KEY, async (err, payload) => {
            if (err) {
                return next(createHttpError.Unauthorized("وارد حساب کاربری خود شوید"))
            }
            const { mobile } = payload || {};
            const user = await UserModel.findOne({ mobile }, { password: 0, token: 0, otp: 0, })
            if (!user) return next(createHttpError.Unauthorized("کاربر یا حساب کاربری یافت نشد"))
            req.user = user;

            return next();
        })
    }
    else return next(createHttpError.Unauthorized(" وارد حساب کاربری خود شوید"))
}

module.exports = {
    VerifyAccessToken
}