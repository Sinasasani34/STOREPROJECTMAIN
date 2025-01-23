const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { ProductResolver } = require("./queries/product.resolver");
const { CategoriesResolver, CategoryChiledResolver } = require("./queries/category.resolver");
const { CourseResolver } = require("./queries/course.resolver");
const { CreateCommentForBlog, CreateCommentForCourse, CreateCommentForProducts } = require("./mutations/comment.resolver");
const { CommentType } = require("./typeDefs/comment.type");

// get, get all, get by id, ... in query part
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blogs: BlogResolver,
        products: ProductResolver,
        categories: CategoriesResolver,
        chiledOfCategory: CategoryChiledResolver,
        courses: CourseResolver,
        // comments: CommentType
    }
})

// GUD = create, update, delete, ... in mutation part
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        CreateCommentForBlog,
        CreateCommentForCourse,
        CreateCommentForProducts
    }
})

const ghrapgQL_Schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})

module.exports = {
    ghrapgQL_Schema
}