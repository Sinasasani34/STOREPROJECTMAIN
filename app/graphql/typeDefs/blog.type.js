const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { UserType, PublicCategoryType } = require("./public.types");
const { CommentType } = require("./comment.type");

const BlogType = new GraphQLObjectType({
    name: "BlogType",
    fields: {
        _id: { type: GraphQLString },
        author: { type: UserType },
        title: { type: GraphQLString },
        short_text: { type: GraphQLString },
        text: { type: GraphQLString },
        imageURL: { type: GraphQLString },
        tag: { type: new GraphQLList(GraphQLString) },
        category: { type: PublicCategoryType },
        comments: { type: new GraphQLList(CommentType) },
        likes: { type: new GraphQLList(UserType) },
        disLikes: { type: new GraphQLList(UserType) },
        bookMarks: { type: new GraphQLList(UserType) },
    }
})

module.exports = {
    BlogType
}