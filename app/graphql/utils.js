const { Kind } = require("graphql");
const { CourseModel } = require("../models/course");
const { ProductModel } = require("../models/products");
const { BlogModel } = require("../models/blogs");
const createHttpError = require("http-errors");

function parseObject(valueNode) {
    const value = Object.create(null)
    valueNode.fields.forEach(field => {
        value[field.name.value] = parseValueNode(field.value)
    })
    return value
}

function parseValueNode(valueNode) {
    switch (valueNode.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN:
            return valueNode.valueNode
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.valueNode)
        case Kind.OBJECT:
            return parseObject(valueNode.value)
        case Kind.LIST:
            return valueNode.values.map(parseValueNode)
        default:
            return null;
    }
}

function parseLiteral(valueNode) {
    switch (valueNode.kind) {
        case Kind.STRING:
            return valueNode.value.charAt(0) === "{" ? JSON.parse(valueNode.value) : null
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value)
        case Kind.OBJECT:
    }
}

function toObject(value) {
    if (typeof value === "object") {
        return value
    }
    if (typeof value === "string" && value.charAt(0) === "{") {
        return JSON.parse(value)
    }
    return null;
}

async function checkExistBlog(id) {
    const blog = await BlogModel.findById(id)
    if (!blog) throw createHttpError.NotFound("بلاگی با این مشخصات یافت نشد");
    return blog
}

async function checkExistProduct(id) {
    const product = await ProductModel.findById(id)
    if (!product) throw createHttpError.NotFound("محصولی با این مشخصات یافت نشد");
    return product
}

async function checkExistCourse(id) {
    const course = await CourseModel.findById(id)
    if (!course) throw createHttpError.NotFound("دوره ای با این مشخصات یافت نشد");
    return course
}

module.exports = {
    toObject,
    parseLiteral,
    parseValueNode,
    parseObject,
    checkExistBlog,
    checkExistProduct,
    checkExistCourse
}