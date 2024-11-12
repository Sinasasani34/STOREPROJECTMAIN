const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/users");
const { SECRET_KEY, Access_TOKEN_SECRET_KEY } = require("./constans");

function RandomNumberGenerator() {
    return Math.floor((Math.random() * 90000) + 10000)
}

function SignAccessToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId)
        const payload = {
            mobile : user.mobile,
            userID : user._id
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



module.exports = {
    RandomNumberGenerator,
    SignAccessToken
}