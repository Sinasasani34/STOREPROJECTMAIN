const Joi = require("@hapi/joi")
const { MongoIdPattern } = require("../../../utils/constans");
const createHttpError = require("http-errors");

const addRoleSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان نقش صحیح نمیباشد")),
    description : Joi.string().min(0).max(100).error(createHttpError.BadRequest("توضیحات نقش صحیح نمیباشد")),
    permissions : Joi.array().items(Joi.string().pattern(MongoIdPattern)).error(createHttpError.BadRequest("دسترسی های ارسال شده صحیح نمیباشد")),
});

const addPermissionSchema = Joi.object({
    name : Joi.string().min(3).max(30).error(createHttpError.BadRequest("اسم دسترسی صحیح نمیباشد")),
    description : Joi.string().min(0).max(100).error(createHttpError.BadRequest("توضیحات دسترسی صحیح نمیباشد")),
});


module.exports = {
    addRoleSchema,
    addPermissionSchema
}