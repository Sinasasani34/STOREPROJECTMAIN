const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { ProductResolver } = require("./queries/product.resolver");
const { CategoriesResolver, CategoryChiledResolver } = require("./queries/category.resolver");
const { CourseResolver } = require("./queries/course.resolver");
const { CreateCommentForBlog, CreateCommentForCourse, CreateCommentForProducts } = require("./mutations/comment.resolver");
const { LikeProduct, LikeBlog, LikeCourse } = require("./mutations/likes.resolver");
const { disLikeProduct, disLikeCourse, disLikeBlog } = require("./mutations/dislikes.resolver");
const { BookmarkBlog, BookmarkCourse, BookmarkProduct } = require("./mutations/bookmark.resolver");
const { GetBookmarkedBlogs, GetBookmarkedCourses, GetBookmarkedProducts, getUserBasket } = require("./queries/user.profile.resolver");
const { AddProductToBasket, AddCourseToBasket, RemoveProductToBasket, RemoveCourseToBasket } = require("./mutations/basket.resolver");

// get, get all, get by id, ... in query part
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blogs: BlogResolver,
        products: ProductResolver,
        categories: CategoriesResolver,
        chiledOfCategory: CategoryChiledResolver,
        courses: CourseResolver,
        getUserBookMarkedBlogs: GetBookmarkedBlogs,
        getUserBookMarkedCourses: GetBookmarkedCourses,
        getUserBookMarkedProducts: GetBookmarkedProducts,
        getUserBasket: getUserBasket
    }
})

// GUD = create, update, delete, ... in mutation part
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        CreateCommentForBlog,
        CreateCommentForCourse,
        CreateCommentForProducts,
        LikeProduct,
        LikeCourse,
        LikeBlog,
        disLikeProduct,
        disLikeCourse,
        disLikeBlog,
        BookmarkBlog,
        BookmarkCourse,
        BookmarkProduct,
        AddProductToBasket,
        AddCourseToBasket,
        RemoveProductToBasket,
        RemoveCourseToBasket
    }
})

const ghrapgQL_Schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})

module.exports = {
    ghrapgQL_Schema
}