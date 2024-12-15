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

function ListOfImagesFromRequest(files, fileUploadPath) {
    if (files?.length > 0) {
        return ((files.map(file => path.join(fileUploadPath, file.filename))).map(item => item.replace(/\\/g, "/")))
    } else {
        return []
    }
}


function setFeaturs(body) {
    //, 
    const { colors, width, weight, height, length } = body;

    let feture = {}, type = "Physical";
    feture.colors = colors
    if (!isNaN(+width) || !isNaN(+height) || !isNaN(+weight) || !isNaN(+length)) {
        if (!width) feture.width = 0;
        else feture.weight = +width
        if (!height) feture.height = 0;
        else feture.height = +height
        if (!weight) feture.weight = 0;
        else feture.weight = +weight
        if (!length) feture.length = 0;
        else feture.length = +length
    } else {
        type = "virtual"
    }
    return feture;
}

function deleteInvalidPropertyInObject(data = {}, blackListFields = []) {
    let nullishData = ["", " ", "0", 0, null, undefined]
    Object.keys(data).forEach(key => {
        if (blackListFields.includes(key)) delete data[key]
        if (typeof data[key] == "string") data[key] = data[key].trim();
        if (Array.isArray(data[key]) && data.length > 0) data[key] = data[key].map(item => item.trim())
        if (Array.isArray(data[key]) && data.length == 0) delete data[key]
        if (nullishData.includes(data[key])) delete data[key];
    })
}

function getTime(seconds) {
    let total = Math.round(seconds) / 60;
    let [minutes, percent] = String(total).split(".");
    let second = Math.round((percent * 60) / 100).toString().substring(0, 2);
    let houre = 0;
    if (minutes > 60) {
        total = minutes / 60
        let [h1, percent] = String(total).split(".");
        houre = h1,
            minutes = Math.round((percent * 60) / 100).toString().substring(0, 2);
    }
    if (String(houre).length == 1) houre = `0${houre}`
    if (String(minutes).length == 1) minutes = `0${minutes}`
    if (String(second).length == 1) second = `0${second}`

    return (houre + ":" + minutes + ":" + second)
}


function copyObject(object) {
    return JSON.parse(JSON.stringify(object));
}

module.exports = {
    RandomNumberGenerator,
    SignAccessToken,
    SignRefreshToken,
    VerifyRefreshToken,
    deleteFileInPublic,
    ListOfImagesFromRequest,
    copyObject,
    setFeaturs,
    deleteInvalidPropertyInObject,
    getTime
}