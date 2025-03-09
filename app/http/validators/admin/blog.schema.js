const Joi = require("@hapi/joi");
const { MongoIdPattern } = require("../../../utils/constans");
const createHttpError = require("http-errors");
const createBlogSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان دسته بندی صحیح نمیباشد")),
    text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    short_text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
    tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest("کاراکتر های نمیتواند بیشتر از 20 آیتم باشد")),
    category: Joi.string().pattern(MongoIdPattern).error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد")),
    fileUploadPath: Joi.allow()
})
const updateCategorySchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان دسته بندی صحیح نمیباشد"))
})

module.exports = {
    createBlogSchema
}