const { GraphQLString } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");
const { VerifyAccessTokenInGraphQL } = require("../../http/middlewares/verifyAccessToken");
const { ProductModel } = require("../../models/products");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { CourseModel } = require("../../models/course");
const { BlogModel } = require("../../models/blogs");
const { checkExistBlog, checkExistCourse, checkExistProduct } = require("../utils");
const disLikeProduct = {
    type: ResponseType,
    args: {
        productID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context
        const user = await VerifyAccessTokenInGraphQL(req);
        const { productID } = args;
        await checkExistProduct(productID);
        let LikeProduct = await ProductModel.findOne({
            _id: productID,
            likes: user._id
        });
        let disLikeProduct = await ProductModel.findOne({
            _id: productID,
            dislikes: user._id
        });
        const updateQuery = disLikeProduct ? { $pull: { dislikes: user._id } } : { $push: { dislikes: user._id } };
        await ProductModel.updateOne({ _id: productID }, updateQuery);
        if (!disLikeProduct) {
            if (LikeProduct) await ProductModel.updateOne({ _id: productID }, { $pull: { likes: user._id } });
        }
        return {
            statusCode: HttpStatus.CREATED,
            data: {
                message: disLikeProduct ? "شما از این محصول دیگر خوشتان نمیاید" : "شما این محصول را دوست دارید"
            }
        }
    }
}
const disLikeCourse = {
    type: ResponseType,
    args: {
        courseID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context
        const user = await VerifyAccessTokenInGraphQL(req);
        const { courseID } = args;
        await checkExistCourse(courseID);
        let LikeCourse = await CourseModel.findOne({
            _id: courseID,
            likes: user._id
        });
        let disLikeCourse = await CourseModel.findOne({
            _id: courseID,
            dislikes: user._id
        });
        const updateQuery = disLikeCourse ? { $pull: { dislikes: user._id } } : { $push: { dislikes: user._id } };
        await CourseModel.updateOne({ _id: courseID }, updateQuery);
        if (!disLikeCourse) {
            if (LikeCourse) await CourseModel.updateOne({ _id: courseID }, { $pull: { likes: user._id } });
        }
        return {
            statusCode: HttpStatus.CREATED,
            data: {
                message: disLikeCourse ? "شما از این محصول دیگر خوشتان نمیاید" : "شما این محصول را دوست دارید"
            }
        }
    }
}
const disLikeBlog = {
    type: ResponseType,
    args: {
        blogID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context
        const user = await VerifyAccessTokenInGraphQL(req)
        const { blogID } = args;
        await checkExistBlog(blogID);
        let LikeBlog = await BlogModel.findOne({
            _id: blogID,
            likes: user._id
        });
        let disLikeBlog = await BlogModel.findOne({
            _id: blogID,
            disLikes: user._id
        });
        const updateQuery = disLikeBlog ? { $pull: { disLikes: user._id } } : { $push: { disLikes: user._id } };
        await BlogModel.updateOne({ _id: blogID }, updateQuery);
        if (!disLikeBlog) {
            if (LikeBlog) await BlogModel.updateOne({ _id: blogID }, { $pull: { likes: user._id } });
        }
        return {
            statusCode: HttpStatus.CREATED,
            data: {
                message: disLikeBlog ? "شما از این محصول دیگر خوشتان نمیاید" : "شما این محصول را دوست دارید"
            }
        }
    }
}

module.exports = {
    disLikeProduct,
    disLikeCourse,
    disLikeBlog
}