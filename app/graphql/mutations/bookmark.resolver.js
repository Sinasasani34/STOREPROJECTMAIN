const { GraphQLString } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");
const { VerifyAccessTokenInGraphQL } = require("../../http/middlewares/verifyAccessToken");
const { ProductModel } = require("../../models/products");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { CourseModel } = require("../../models/course");
const { BlogModel } = require("../../models/blogs");
const { checkExistBlog, checkExistCourse, checkExistProduct } = require("../utils");
const BookmarkProduct = {
    type: ResponseType,
    args: {
        productID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context
        const user = await VerifyAccessTokenInGraphQL(req);
        const { productID } = args;
        await checkExistProduct(productID);
        let bookmarkProduct = await ProductModel.findOne({
            _id: productID,
            bookmarks: user._id
        });
        const updateQuery = bookmarkProduct ? { $pull: { bookmarks: user._id } } : { $push: { bookmarks: user._id } };
        await ProductModel.updateOne({ _id: productID }, updateQuery);
        let message;
        if (!bookmarkProduct) {
            message = "محصول به لیست علاقه مندی های شما اضافه شد"
        } else message = "محصول از لیست علاقه مندی های شما حذف شد"
        return {
            statusCode: HttpStatus.OK,
            data: {
                message
            }
        }
    }
}

const BookmarkCourse = {
    type: ResponseType,
    args: {
        courseID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context
        const user = await VerifyAccessTokenInGraphQL(req);
        const { courseID } = args;
        await checkExistCourse(courseID);
        let bookmarkedCourse = await CourseModel.findOne({
            _id: courseID,
            bookmarks: user._id
        });
        const updateQuery = bookmarkedCourse ? { $pull: { bookmarks: user._id } } : { $push: { bookmarks: user._id } };
        await CourseModel.updateOne({ _id: courseID }, updateQuery);
        let message;
        if (!bookmarkedCourse) {
            message = "دوره به لیست علاقه مندی های شما اضافه شد"
        } else message = "دوره از لیست علاقه مندی های شما حذف شد"
        return {
            statusCode: HttpStatus.OK,
            data: {
                message
            }
        }
    }
}

const BookmarkBlog = {
    type: ResponseType,
    args: {
        blogID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context
        const user = await VerifyAccessTokenInGraphQL(req)
        const { blogID } = args;
        await checkExistBlog(blogID);
        let bookmarkedBlog = await BlogModel.findOne({
            _id: blogID,
            bookMarks: user._id
        });
        const updateQuery = bookmarkedBlog ? { $pull: { bookMarks: user._id } } : { $push: { bookMarks: user._id } };
        await BlogModel.updateOne({ _id: blogID }, updateQuery);
        let message;
        if (!bookmarkedBlog) {
            message = "مقاله به لیست علاقه مندی های شما اضافه شد"
        } else message = "مقاله از لیست علاقه مندی های شما حذف شد"
        return {
            statusCode: HttpStatus.OK,
            data: {
                message
            }
        }
    }
}

module.exports = {
    BookmarkProduct,
    BookmarkCourse,
    BookmarkBlog
}