const Joi = require("@hapi/joi")
const { MongoIdPattern } = require("../../../utils/constans")

const addCategorySchema = Joi.object({
    title: Joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمیباشد")),
    parent: Joi.string().allow('').pattern(MongoIdPattern).allow("").error(new Error("شناسه ارسال صحیح نمباشد"))
})

module.exports = {
    addCategorySchema
}