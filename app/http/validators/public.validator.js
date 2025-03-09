const Joi = require("@hapi/joi");
const { MongoIdPattern } = require("../../utils/constans");
const createHttpError = require("http-errors");
const ObjectIdValidator = Joi.object({
    id: Joi.string().pattern(MongoIdPattern).error(new Error(createHttpError.BadRequest("شناسه وارد شده صحیح نمیباشد")))
})

module.exports = {
    ObjectIdValidator
}