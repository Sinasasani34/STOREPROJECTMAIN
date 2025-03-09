const Joi = require("@hapi/joi");
const { MongoIdPattern } = require("../../../utils/constans");
const createHttpError = require("http-errors");
const createProdutSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان محصول صحیح نمیباشد")),
    text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    short_text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest("کاراکتر های نمیتواند بیشتر از 20 آیتم باشد")),
    colors: Joi.array().min(0).max(20).error(createHttpError.BadRequest("رنگ های انتخابی  نمیتواند بیشتر از 20 ایتم باشد")),
    category: Joi.string().regex(MongoIdPattern).error(createHttpError.BadRequest("محصول مورد نظر یافت نشد")),
    price: Joi.number().error(createHttpError.BadRequest("قیمت وارد شده صحیح نمیباشد")),
    discount: Joi.number().error(createHttpError.BadRequest("تخفیف وارد شده صحیح نمیباشد")),
    count: Joi.number().error(createHttpError.BadRequest("تعداد وارد شده نامعتبر است")),
    weight: Joi.number().allow(null, 0, "0").error(createHttpError.BadRequest("وزن وارد شده نامعتبر است")),
    length: Joi.number().allow(null, 0, "0").error(createHttpError.BadRequest("طول وارد شده نامعتبر است")),
    height: Joi.number().allow(null, 0, "0").error(createHttpError.BadRequest("ارتفاع وارد شده نامعتبر است")),
    width: Joi.number().allow(null, 0, "0").error(createHttpError.BadRequest("عرض وارد شده نامعتبر است")),
    type: Joi.string().regex(/(virtual|physical)/i),
    filename: Joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
    fileUploadPath: Joi.allow()
})

module.exports = {
    createProdutSchema
}