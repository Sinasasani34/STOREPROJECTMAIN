const { GraphQLString } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");
const { VerifyAccessTokenInGraphQL } = require("../../http/middlewares/verifyAccessToken");
const { ProductModel } = require("../../models/products");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { CourseModel } = require("../../models/course");
const { BlogModel } = require("../../models/blogs");
const { checkExistBlog, checkExistCourse, checkExistProduct } = require("../utils");
const LikeProduct = {
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
        const updateQuery = LikeProduct ? { $pull: { likes: user._id } } : { $push: { likes: user._id } };
        await ProductModel.updateOne({ _id: productID }, updateQuery);
        if (!LikeProduct) {
            if (disLikeProduct) await ProductModel.updateOne({ _id: productID }, { $pull: { dislikes: user._id } });
        }
        return {
            statusCode: HttpStatus.OK,
            data: {
                message: LikeProduct ? "شما از این محصول دیگر خوشتان نمیاید" : "شما این محصول را دوست دارید"
            }
        }
    }
}
const LikeCourse = {
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
        const updateQuery = LikeCourse ? { $pull: { likes: user._id } } : { $push: { likes: user._id } };
        await CourseModel.updateOne({ _id: courseID }, updateQuery);
        if (!LikeCourse) {
            if (disLikeCourse) await CourseModel.updateOne({ _id: courseID }, { $pull: { dislikes: user._id } });
        }
        return {
            statusCode: HttpStatus.OK,
            data: {
                message: LikeCourse ? "شما از این دوره دیگر خوشتان نمیاید" : "شما این دوره را دوست دارید"
            }
        }
    }
}
const LikeBlog = {
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
            dislikes: user._id
        });
        const updateQuery = LikeBlog ? { $pull: { likes: user._id } } : { $push: { likes: user._id } };
        await BlogModel.updateOne({ _id: blogID }, updateQuery);
        if (!LikeBlog) {
            if (disLikeBlog) await BlogModel.updateOne({ _id: blogID }, { $pull: { dislikes: user._id } });
        }
        return {
            statusCode: HttpStatus.OK,
            data: {
                message: LikeBlog ? "شما از این مقاله دیگر خوشتان نمیاید" : "شما این مقاله را دوست دارید"
            }
        }
    }
}

module.exports = {
    LikeProduct,
    LikeCourse,
    LikeBlog
}