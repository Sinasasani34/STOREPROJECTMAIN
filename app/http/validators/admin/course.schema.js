const Joi = require("@hapi/joi");
const { MongoIdPattern } = require("../../../utils/constans");
const createHttpError = require("http-errors");
const createCourseSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان دوره صحیح نمیباشد")),
    text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    short_text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest("کاراکتر های نمیتواند بیشتر از 20 آیتم باشد")),
    category: Joi.string().regex(MongoIdPattern).error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد")),
    price: Joi.number().error(createHttpError.BadRequest("قیمت وارد شده صحیح نمیباشد")),
    discount: Joi.number().error(createHttpError.BadRequest("تخفیف وارد شده صحیح نمیباشد")),
    type: Joi.string().regex(/(free|cash|special)/i),
    filename: Joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
    fileUploadPath: Joi.allow()
})
const createEpisodeSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان دوره صحیح نمیباشد")),
    text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    type: Joi.string().regex(/(lock|unlock)/i),
    chapterID: Joi.string().regex(MongoIdPattern).error(createHttpError.BadRequest("شناسه فصل صحیح نمیباشد")),
    courseID: Joi.string().regex(MongoIdPattern).error(createHttpError.BadRequest("شناسه دوره صحیح نمیباشد")),
    filename: Joi.string().regex(/(\.mp4|\.mov|\.mkv|\.mpg|\.avi)$/).error(createHttpError.BadRequest("ویدئو ارسال شده صحیح نمیباشد")),
    fileUploadPath: Joi.allow()
})

module.exports = {
    createCourseSchema,
    createEpisodeSchema
}