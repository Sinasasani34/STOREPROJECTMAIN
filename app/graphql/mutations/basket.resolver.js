const { GraphQLString, GraphQLInt } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");
const { VerifyAccessTokenInGraphQL } = require("../../http/middlewares/verifyAccessToken");
const { ProductModel } = require("../../models/products");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { CourseModel } = require("../../models/course");
const { checkExistCourse, checkExistProduct } = require("../utils");
const { UserModel } = require("../../models/users");
const { copyObject } = require("../../utils/functions");
const createHttpError = require("http-errors");

const AddProductToBasket = {
    type: ResponseType,
    args: {
        productID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context
        const user = await VerifyAccessTokenInGraphQL(req);
        const { productID } = args;
        await checkExistProduct(productID);
        const product = await findProductInBasket(user._id, productID);
        if (product) {
            await UserModel.updateOne(
                {
                    _id: user._id,
                    "basket.products.productID": productID
                }, {
                $inc: {
                    "basket.products.$.count": 1 // quantity
                }
            })
        } else {
            await UserModel.updateOne(
                {
                    _id: user._id,
                },
                {
                    $push: {
                        "basket.products": {
                            productID,
                            count: 1
                        }
                    }
                }
            )
        }
        return {
            statusCode: HttpStatus.OK,
            data: {
                message: "محصول به سبد خرید اضافه شد"
            }
        }
    }
}

const AddCourseToBasket = {
    type: ResponseType,
    args: {
        courseID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context
        const user = await VerifyAccessTokenInGraphQL(req);
        const { courseID } = args;
        await checkExistCourse(courseID);
        const course = await findCourseInBasket(user._id, courseID);
        if (course) {
            throw createHttpError.BadRequest("دوره در سبد خرید وجود دارد")
        } else {
            await UserModel.updateOne(
                {
                    _id: user._id,
                },
                {
                    $push: {
                        "basket.courses": {
                            courseID,
                            count: 1
                        }
                    }
                }
            )
        }
        return {
            statusCode: HttpStatus.OK,
            data: {
                message: "دوره به سبد خرید اضافه شد"
            }
        }
    }
}

const RemoveProductToBasket = {
    type: ResponseType,
    args: {
        productID: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req } = context
        const user = await VerifyAccessTokenInGraphQL(req);
        const { productID } = args;
        await checkExistProduct(productID);
        const product = await findProductInBasket(user._id, productID);
        let message;
        if (!product) {
            throw createHttpError.NotFound("محصول در سبد خرید یافت نشد")
        }
        if (product.count > 1) {
            await UserModel.updateOne(
                {
                    _id: user._id,
                    "basket.products.productID": productID
                },
                {
                    $inc: {
                        "basket.products.$.count": -1 // quantity
                    }
                }
            )
            message = "تعداد محصول کاهش یافت";
        } else {
            await UserModel.updateOne(
                {
                    _id: user._id,
                    "basket.products.productID": productID
                },
                {
                    $pull: {
                        "basket.products": {
                            productID,
                        }
                    }
                }
            )
            message = "محصول از سبد خرید حذف شد";
        }
        return {
            statusCode: HttpStatus.OK,
            data: {
                message
            }
        }
    }
}

const RemoveCourseToBasket = {
    type: ResponseType,
    args: {
        courseID: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req } = context
        const user = await VerifyAccessTokenInGraphQL(req);
        const { courseID } = args;
        await checkExistCourse(courseID);
        const userCourse = await UserModel.findOne({ _id: user._id, courses: courseID });
        if (userCourse) {
            throw createHttpError.BadGateway("کاربر دوره را خریده است")
        }
        const course = await findCourseInBasket(user._id, courseID);
        if (!course) {
            throw createHttpError.NotFound("دوره در سبد خرید یافت نشد")
        }
        let message;
        if (course.count > 1) {
            await UserModel.updateOne(
                {
                    _id: user._id,
                    "basket.courses.courseID": courseID
                }, {
                $inc: {
                    "basket.courses.$.count": -1 // quantity
                }
            })
            message = "تعداد دوره کاهش یافت";
        } else {
            await UserModel.updateOne(
                {
                    _id: user._id,
                    "basket.courses.courseID": courseID
                },
                {
                    $pull: {
                        "basket.courses": {
                            courseID
                        }
                    }
                }
            )
            message = "دوره از سبد خرید حذف شد";
        }
        return {
            statusCode: HttpStatus.OK,
            data: {
                message
            }
        }
    }
}

async function findProductInBasket(userID, productID) {
    const findResult = await UserModel.findOne({ _id: userID, "basket.products.productID": productID }, { "basket.products.$": 1 })
    const userDetail = copyObject(findResult);
    return userDetail?.basket?.products?.[0]
}
async function findCourseInBasket(userID, courseID) {
    const findResult = await UserModel.findOne({ _id: userID, "basket.courses.courseID": courseID }, { "basket.courses.$": 1 })
    const userDetail = copyObject(findResult);
    return userDetail?.basket?.courses?.[0]
}

module.exports = {
    AddProductToBasket,
    AddCourseToBasket,
    RemoveProductToBasket,
    RemoveCourseToBasket
}