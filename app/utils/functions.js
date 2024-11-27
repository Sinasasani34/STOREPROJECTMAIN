const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/users");
const { Access_TOKEN_SECRET_KEY, Refresh_TOKEN_SECRET_KEY } = require("./constans");
const fs = require("fs")
const redisClient = require("./init-redis")
const path = require("path")

function RandomNumberGenerator() {
    return Math.floor((Math.random() * 90000) + 10000)
}

function SignAccessToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId)
        const payload = {
            mobile: user.mobile
        };
        const options = {
            expiresIn: "1h"
        };
        jwt.sign(payload, Access_TOKEN_SECRET_KEY, options, (err, token) => {
            if (err) reject(createHttpError.InternalServerError("خطای سرور"))
            resolve(token)
        })
    })
}
function SignRefreshToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId)
        const payload = {
            mobile: user.mobile
        };
        const options = {
            expiresIn: "1y"
        };
        jwt.sign(payload, Refresh_TOKEN_SECRET_KEY, options, async (err, token) => {
            if (err) reject(createHttpError.InternalServerError("خطای سرور"))
            await redisClient.SETEX(userId.toString(), 365 * 24 * 60 * 60, token);
            resolve(token)
        })
    })
}

function VerifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, Refresh_TOKEN_SECRET_KEY, async (err, payload) => {
            if (err) {
                reject(createHttpError.Unauthorized("وارد حساب کاربری خود شوید"))
            }
            const { mobile } = payload || {};
            const user = await UserModel.findOne({ mobile }, { password: 0, token: 0, otp: 0, })
            if (!user) reject(createHttpError.Unauthorized("کاربر یا حساب کاربری یافت نشد"))
            const refreshToken = await redisClient.get(user?._id || "Key_default");
            if (!refreshToken) {
                reject(createHttpError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد"))
            }
            if (token === refreshToken) {
                return resolve(mobile)
            }
            reject(createHttpError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد"))
        })
    })
}

function deleteFileInPublic(fileAddress) {
    if (fileAddress) {
        const pathFile = path.join(__dirname, "..", "..", "public", fileAddress)
        if (fs.existsSync(pathFile)) {
            fs.unlinkSync(pathFile)
        }
    }
}

module.exports = {
    RandomNumberGenerator,
    SignAccessToken,
    SignRefreshToken,
    VerifyRefreshToken,
    deleteFileInPublic
}