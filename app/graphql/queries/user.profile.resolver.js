const { GraphQLList, GraphQLString } = require("graphql")
const { BlogType } = require("../typeDefs/blog.type")
const { BlogModel } = require("../../models/blogs");
const { VerifyAccessTokenInGraphQL } = require("../../http/middlewares/verifyAccessToken");
const { ProductType } = require("../typeDefs/product.type");
const { CourseType } = require("../typeDefs/course.type");
const { ProductModel } = require("../../models/products");
const { CourseModel } = require("../../models/course");
const { AnyType } = require("../typeDefs/public.types");
const { UserModel } = require("../../models/users");
const { getBasketOfUser } = require("../../utils/functions");



const GetBookmarkedBlogs = {
    type: new GraphQLList(BlogType),
    resolve: async (_, args, context) => {
        const { req } = context
        const user = await VerifyAccessTokenInGraphQL(req);
        const blogs = await BlogModel.find({ bookMarks: user._id }).populate([
            { path: "author" },
            { path: "category" },
            { path: "comments.user" },
            { path: "comments.answers.user" },
            { path: "likes" },
            { path: "disLikes" },
            { path: "bookMarks" },
        ])
        return blogs;
    }
}

const GetBookmarkedProducts = {
    type: new GraphQLList(ProductType),
    resolve: async (_, args, context) => {
        const { req } = context
        const user = await VerifyAccessTokenInGraphQL(req);
        const products = await ProductModel.find({ bookMarks: user._id }).populate([
            { path: "supplier" },
            { path: "category" },
            { path: "comments.user" },
            { path: "comments.answers.user" },
            { path: "likes" },
            { path: "dislikes" },
            { path: "bookmarks" },
        ])
        return products;
    }
}

const GetBookmarkedCourses = {
    type: new GraphQLList(CourseType),
    resolve: async (_, args, context) => {
        const { req } = context
        const user = await VerifyAccessTokenInGraphQL(req);
        const courses = await CourseModel.find({ bookMarks: user._id }).populate([
            { path: "teacher" },
            { path: "category" },
            { path: "comments.user" },
            { path: "comments.answers.user" },
            { path: "likes" },
            { path: "dislikes" },
            { path: "bookmarks" },
        ])
        return courses;
    }
}

const getUserBasket = {
    type: new GraphQLList(AnyType),
    resolve: async (_, args, context) => {
        const { req } = context
        const user = await VerifyAccessTokenInGraphQL(req);
        const userDetail = await getBasketOfUser(user._id);
        return userDetail;
    }
}



module.exports = {
    GetBookmarkedBlogs,
    GetBookmarkedProducts,
    GetBookmarkedCourses,
    getUserBasket
}